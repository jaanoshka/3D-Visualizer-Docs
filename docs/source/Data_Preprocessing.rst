Data Preprocessing
===================
Data Source 
------------
OpenNRW 
Data from the website (Google Maps API, OpenStreetMap)

Trimming and pre-processing
----------------------------

Matching of orthophoto and LiDAR data
--------------------------------------

Indices
---------

.. raw:: html

   <span style="font-size: 0.8em; font-style: italic; display: inline;">by Evalotta Horn</span>


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