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

Indicies
-----------------
*by Evalotta Horn*

After the dataset was created that included the prepared orthophotos and matching lidar datas, two lists with indicies were created. ``indices = list(range(len(dataset)))``

The goal here is to have the exact same data for the training of all three models and also the same order. 

``train_indices, test_indices = train_test_split(indices, test_size=0.2, random_state=42)``

In the code it is possible to see that the split was 80% training data and 20% test data. Also the random_state function defines the starting value of the random number generator. This ensures that the division of the data into training and test sets is reproducible.

``train_loader = DataLoader(train_dataset, batch_size=40, shuffle=True, num_workers=2)
test_loader = DataLoader(test_dataset, batch_size=40, shuffle=False, num_workers=2)``

A train and data loader were created,  the data loader is used to load data efficiently in mini-batches and make it available for model training or evaluation. The batch size of 40 was choosen, so the computing power of colab L4G GPU were used efficiently to its maximum but before crashing. The shuffel function is true for the test data, meaning it reshuffles the training data with each run. This ensures variability, prevents overfitting and improves learning. The num_workers lets 2 sub-processes work in parallel. 

``np.save(google_drive_path, train_indices)`` and ``np.save(google_drive_path, test_indices)``

This function saves the indices with NumPy and with the path they can be loaded in the script for each model. At the end we used 6842 orthophotos and the matching Lidar data for the training and 1711 for the testing. 

``random.seed(42)``

``train_loader = DataLoader(dataset, batch_size=40, sampler=SubsetRandomSampler(train_indices), num_workers=2)``

``test_loader = DataLoader(dataset, batch_size=40, sampler=SubsetRandomSampler(test_indices), num_workers=2)``

``random.seed(42)``

``train_loader = DataLoader(
    dataset,
    batch_size=40,
    sampler=SubsetRandomSampler(train_indices),
    num_workers=2
)
test_loader = DataLoader(
    dataset,
    batch_size=40,
    sampler=SubsetRandomSampler(test_indices),
    num_workers=2
)``