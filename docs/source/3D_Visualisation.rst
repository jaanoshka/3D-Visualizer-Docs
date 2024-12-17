3D Visualisation
==================
Visualisation here refers to the step from the predicted z coordinate over the DepthMap to a 3D model. 

Creation of depth maps
-----------------------
*by Jasmin Fabijanov*


Generation of point clouds
---------------------------
*by Evalotta Horn*

This step can vary, depending in which form the predicted z coordinate and its associated x- and y- coordinate as well as the RGB colour information are.

During the development phase we had the case that the output of a model was a CSV file containg the six data points mentioned above. Here the first step was to convert the CSV file into a NumPy-Array. The advantages here are that all elements in a NumPy array have the same data type. Furthermore a Multidimensionality is possible. Also efficiency is an important factor due to that NumPy arrays are faster and more memory-efficient than Python lists because they are implemented in C.

.. code-block:: python
    points = df[['x-Koordinate', 'y-Koordinate', 'z-Koordinate']].to_numpy()

The next step is uniform because if the models output was not a CSV file it was for sure a NumPy-Array. The next step is that a pointcloud is created and the points added. 

.. code-block:: python
    point_cloud = o3d.geometry.PointCloud()
    point_cloud.points = o3d.utility.Vector3dVector(points)

Furthermore to have a more realistic result at the end, the natural color of each pixel are added to the pointcloud. The colour points are also reshaped into a NumPy array in three columns in order to perform the calculations more efficiently. In addition, they are divided by 255.0 in order to scale the values by normalisation in the range from 0 to 1. This ensures that the colour values are in the correct format for Open3D.

.. code-block:: python
    if 'r-Wert' in df.columns and 'g-Wert' in df.columns and 'b-Wert' in df.columns:
    colors = df[['r-Wert', 'g-Wert', 'b-Wert']].to_numpy() / 255.0  # Normalisierung auf [0, 1]
    point_cloud.colors = o3d.utility.Vector3dVector(colors)

For the pointcloud, which is a ply file, normals are needed. These are estimate based on the nearest neighbours. The calculation is performed in a small radius. This has the advantage that local structures are captured more precisely. We also have a maximum number of nearest neighbours that are taken into account when calculating the normals. This limit prevents excessive calculation times for dense point clouds.

.. code-block:: python
    point_cloud.estimate_normals(search_param=o3d.geometry.KDTreeSearchParamHybrid(radius=0.1, max_nn=30))

Normals are important because they indicate the orientation of the surface elements at each point. They are therefore essential for understanding the structure of a 3D surface. They also help to recognise edges, planes or other features in the point cloud. Furthermore, they are useful for identifying outliers or smoothing points. In the following step of 3D mesh creation, normals are required as input to correctly reconstruct the surface structure.

At the end the is a ply file which includes y-, x- and z coordonates, the normalised RGB values and norms for every pixel from an orthophoto. This file is being saved so it can be used as an input for the surface reconstruction. 

.. code-block:: python
    output_path = '/content/drive/MyDrive/output_with_normals.ply'
    o3d.io.write_point_cloud(output_path, point_cloud)
    
Mesh reconstruction (Poisson reconstruction)
----------------------------------------------
*by Evalotta Horn*

Interactive visualisation
--------------------------
**JAN**

Tools: React, Three.js, @react-three/fibre