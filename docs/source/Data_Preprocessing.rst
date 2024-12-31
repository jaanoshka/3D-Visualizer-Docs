Data Collection and Preprocessing for Depth Prediction
==================

1. Data Collection
---------------------
*by Jasmin Fabijanov*

**1.1. Data Sources**

The datasets utilized was sourced from Open Data NRW, which provides extensive geospatial data, including high-resolution satellite imagery and corresponding LiDAR-derived depth information. These datasets were chosen for their coverage and precision, suitable for depth estimation tasks.

**1.2. Data Types**
The collected data includes a random sample of 1,000 entries of:
- **Satellite Images**: High-resolution normalized RGB imagery with georeferenced metadata.
- **LiDAR Data**: Point cloud files in `.tif` format containing precise altitude measurements, already preprocessed by providing the height of a pixel from ground to object height instead of from LiDAR sensor to object height.

**1.3. Data Collection**

Satellite images and LiDAR files were scraped using scripts that automate the retrieval process:
First, the file names are saved in a dataframe with the date and the cooresponding northing and easting coordinates are extracted from the file names and saved in two separate dataframes, one for the LiDAR files and one for the images.
Finally, the two separate dataframes are merged on the date column. 


2.  Data Preprocessing
---------------------
*by Jasmin Fabijanov*

**2.1. Rescaling Images**
High-resolution satellite images are resized from 10 centimeters per pixel to 50 centimeters per pixel to match the resolution of the LiDAR files. 
This step is performed using a custom function, downsample_image, which calculates the new dimensions of each image based on the scale of the LiDAR files. 

**2.2. Resizing Images**
All satellite images and depth maps were resized to a fixed dimension of 518x518 pixels. This resolution was chosen on the one hand to balance computational efficiency with sufficient detail for depth estimation. 
On the other hand, the size of 518x518 was chosen because that's the required input size of the Depth anything V2 model, which was the first model to be implemented

**2.3. Handling Missing Values in LiDAR Files**
Cubic interpolation was performed to estimate missing values within the LiDAR data. A custom method identifies valid (non-NaN) points and missing (NaN) points using boolean masks.
Using the valid points as references, it applies cubic interpolation (scipy.interpolate.griddata) to fill the gaps in the grid.
The interpolated grid is then returned, ensuring that it is complete and ready for further processing. This step is essential for ensuring that depth maps derived from LiDAR data are accurate and free of artifacts.

**2.4. Data Downloading**
To acquire the necessary data, satellite images and LiDAR grids are downloaded from specified URLs:
- **Satellite Images:** Images are downloaded using the requests.get method and opened with Image.open. This ensures compatibility with downstream operations.
- **LiDAR Data:** LiDAR grids, stored as TIFF files, are downloaded and read using the rasterio library. The elevation data is extracted from the first band and converted to a NumPy array for further manipulation.


3. Processing Loop for Data Preparation
---------------------
*by Jasmin Fabijanov*

The main processing loop iterates through each sampled data entry and performs the following steps:

**3.1. Image Processing:**
The satellite image is downloaded, resized using the downsample_image function, and converted to RGB format (if not already in RGB). These steps standardize the image data and ensure compatibility with the model.

**3.2. LiDAR Processing:**
The LiDAR grid is downloaded, missing values are interpolated using the fill_nan_with_interpolation function, and the grid is rescaled to match the image resolution.

**3.3. Validation:**
The dimensions of the processed image and the LiDAR grid are compared to ensure alignment. This validation step ensures spatial consistency across the dataset.

**3.4. Data Partitioning:**
The image and the LiDAR grid are divided into smaller parts for efficient processing. For instance, each is partitioned into a 4×4 grid, resulting in 16 smaller sections per image and grid. The partitioning dimensions are calculated based on the overall size of the data.

**3.5. Saving Outputs**
The processed image parts are saved as high-quality JPEG files using img.save, while the corresponding LiDAR grid parts are saved as .npy files using np.save. The filenames incorporate metadata (easting & northing coordinates) and partition indices to uniquely identify each segment. This naming convention facilitates easy retrieval and organization of the data.


4. Indices for Consistent Training Dataset for all Models
---------------------
*by Evalotta Horn*

After the dataset was created, which included the prepared orthophotos and corresponding LiDAR data, two lists of indices were generated to manage the data split.

.. code-block:: python

    indices = list(range(len(dataset)))

The goal here is to ensure that all three models use the exact same training and testing data, as well as maintain a consistent order of the data points.

To split the indices into training and test sets, the following code was used:

.. code-block:: python

    train_indices, test_indices = train_test_split(indices, test_size=0.2, random_state=42)

In this code, the data is split into 80% training and 20% test data. The parameter random_state=42 ensures that the random number generator produces the same split each time the code is executed. This makes the division of data reproducible.

To efficiently load the data for training and testing, two data loaders were created using the PyTorch DataLoader class:

.. code-block:: python

    train_loader = DataLoader(train_dataset, batch_size=40, shuffle=True, num_workers=2)
    test_loader = DataLoader(test_dataset, batch_size=40, shuffle=False, num_workers=2)

The DataLoader is responsible for loading the data in mini-batches and making it available for model training or evaluation. A batch size of 40 was chosen to fully utilize the computational power of the Colab L4G GPU while avoiding crashes due to memory limits.

- shuffle=True (for training data): This reshuffles the training data at every epoch to ensure variability in the batches. This helps prevent overfitting and improves the learning process.
- shuffle=False (for test data): The test data remains in a fixed order to guarantee reproducible evaluation results.
- num_workers=2: This allows two sub-processes to work in parallel when loading the data, which improves efficiency.

The indices for the training and test sets were saved using NumPy:

.. code-block:: python
   
    np.save(google_drive_path, train_indices)
    np.save(google_drive_path, test_indices)

This ensures that the indices can be reloaded in other scripts or runs, maintaining the same data split across all models.

At the end of the preprocessing step, a total of 6,842 orthophotos and their corresponding LiDAR data were used for training, while 1,711 were reserved for testing.
To further ensure reproducibility when sampling data, the random.seed(42) function was used alongside a SubsetRandomSampler:

.. code-block:: python

   random.seed(42)
   train_loader = DataLoader(dataset, batch_size=40,
                             sampler=SubsetRandomSampler(train_indices),
                             num_workers=2)
   test_loader = DataLoader(dataset, batch_size=40,
                            sampler=SubsetRandomSampler(test_indices),
                            num_workers=2)

The SubsetRandomSampler ensures that the data points are sampled strictly according to the predefined train_indices and test_indices.