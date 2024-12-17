3D Visualisation
==================
Visualisation here refers to the step from the predicted z coordinate over the DepthMap to a 3D model. 

Creation of depth maps
-----------------------
*by Jasmin Fabijanov*


Generating pointclouds
---------------------------
*by Evalotta Horn*

This step can vary depending on the format in which the predicted z-coordinate, its associated x- and y-coordinates, and the RGB color information are provided.

During the development phase, we encountered cases where the model's output was a CSV file containing the six aforementioned data points. In such instances, the first step was to convert the CSV file into a NumPy array. This conversion offers several advantages:

- All elements in a NumPy array share the same data type.
- Multidimensional data structures are supported.
- NumPy arrays are both faster and more memory-efficient than Python lists because they are implemented in C.

.. code-block:: python

    points = df[['x-Koordinate', 'y-Koordinate', 'z-Koordinate']].to_numpy()

If the model's output was not a CSV file, it was already provided as a NumPy array, making the next step uniform. At this point, a point cloud is created, and the points are added:

.. code-block:: python

    point_cloud = o3d.geometry.PointCloud()
    point_cloud.points = o3d.utility.Vector3dVector(points)

To achieve a more realistic final result, the natural colors of each pixel are added to the point cloud. The RGB color points are reshaped into a NumPy array with three columns to facilitate efficient calculations. The values are then normalized to a range between 0 and 1 by dividing them by 255.0, ensuring compatibility with Open3D.

.. code-block:: python

    if 'r-Wert' in df.columns and 'g-Wert' in df.columns and 'b-Wert' in df.columns:
    colors = df[['r-Wert', 'g-Wert', 'b-Wert']].to_numpy() / 255.0  # Normalisierung auf [0, 1]
    point_cloud.colors = o3d.utility.Vector3dVector(colors)

For the point cloud, which is ultimately saved as a PLY file, normals must be estimated. This estimation is based on the nearest neighbors within a small radius. Using a limited radius ensures that local structures are captured accurately. Additionally, a maximum number of nearest neighbors is specified to prevent excessive computation times for dense point clouds.

.. code-block:: python

    point_cloud.estimate_normals(search_param=o3d.geometry.KDTreeSearchParamHybrid(radius=0.1, max_nn=30))

Normals are crucial as they represent the orientation of surface elements at each point, which helps to understand the structure of a 3D surface. Normals also assist in detecting edges, planes, and other features within the point cloud. They are further valuable for identifying outliers and smoothing points. In subsequent steps, such as 3D mesh creation, normals are required as input to accurately reconstruct the surface structure.

At the end of this process, the result is a PLY file that includes the x-, y-, and z-coordinates, normalized RGB values, and normals for every pixel derived from the orthophoto. This file is saved for use as input in surface reconstruction:

.. code-block:: python
    
    output_path = '/content/drive/MyDrive/output_with_normals.ply'
    o3d.io.write_point_cloud(output_path, point_cloud)
    
Mesh reconstruction (Poisson reconstruction)
----------------------------------------------
*by Evalotta Horn*

For the mesh reconstruction we decided to use the possion reconstruction. Its characteristics are that it produces non-smooth results and is robust against noises. As mentioned above the poinclouds need to have normals as direction information.

When looking at the surface reconstruction the Ball pivoting was also been considered. This works as a virtual ball with a certain radius rolls from point to point and creates triangles. For this to work the pointcloud needs to be even and have a sufficiente density. 

The following four points made us decide to use the poissoin recunstruction and not the ball pivoting:
- The poisson reconstruction is robust agains noises, creates smooth surfaces and polishes off little irrgegulations. 
- It creates a closed surface while the ball pivoting creates open meshes, which may contain gaps when the poincloud density is non-uniform. This can be the reason here as we olnly have point for ecery pixel and not the density like Lidar data. Also it is harder to understand a mesh, when the houses are open and see through. 
- Automatic adaption to geometry while the ball pivoting only has one radius. 
- Applicability of large data sets, while ball pivoting is very memory intensive. This we saw during the development. While we were able to creat a high number of meshes through the poisson resconstruction with the computing units of colab, the ball pivoting always crushed the system. 

After loading the saved PLY file the function possion meshing was beeing defined. The depth of 11, determines the depth of the octree composition, and was the highest we were able to go without crashing colab. 

.. code-block:: python

    def create_poisson_mesh(pcd, depth=11)

With the following skript the surface reconstruction is executed.The pcd is the poincloud with all information that we created further above here. The width of 0 is a standard value and controls the width of the bounding box. The scale factor, here 1.1, determines how much the bounding cube of the input point cloud is expanded. This creates a polygon mesh (consisting of triangles) from the point cloud. Before having the build system, we used CloudCompare to visualize the saved pointclouds and meshes. 

.. code-block:: python

    poisson_mesh = o3d.geometry.TriangleMesh.create_from_point_cloud_poisson(
         pcd, depth=depth, width=0, scale=1.1, linear_fit=False)[0]

    
    return poisson_mesh


Interactive visualisation
--------------------------
**JAN**

Tools: React, Three.js, @react-three/fibre