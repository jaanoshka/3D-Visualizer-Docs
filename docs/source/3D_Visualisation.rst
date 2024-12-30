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

For the surface reconstruction, we decided to use Poisson Reconstruction. [#]_  This method is characterized by its ability to produce smooth results and its robustness against noise. As mentioned earlier, the point clouds must include normals as directional information for this approach to work.

During our evaluation, Ball Pivoting [#]_ was also considered as an alternative. Ball Pivoting works by rolling a virtual ball with a defined radius from point to point to form triangles. However, for this method to succeed, the point cloud must be evenly distributed and have sufficient density.

The following four points led us to favor Poisson Reconstruction over Ball Pivoting:

- **Noise Robustness and Surface Smoothness:** Poisson Reconstruction is robust against noise, generates smooth surfaces, and effectively eliminates minor irregularities.
- **Closed Surfaces:** Poisson Reconstruction creates closed surfaces, whereas Ball Pivoting can result in open meshes with gaps if the point cloud density is non-uniform. This was particularly relevant to our project because our point clouds contain only one point per pixel, unlike LiDAR data, which offers higher density. Open and see-through meshes (e.g., with houses having missing walls) are harder to interpret visually.
- **Automatic Adaptation to Geometry:** Poisson Reconstruction automatically adapts to the geometry of the point cloud, while Ball Pivoting relies on a single fixed radius.
- **Scalability for Large Datasets:** Poisson Reconstruction is more memory-efficient when processing large datasets. During development, we observed that while we could successfully create numerous meshes using Poisson Reconstruction on Google Colab’s computing resources, Ball Pivoting consistently caused system crashes due to its high memory consumption.
After loading the saved PLY file the function possion meshing was beeing defined. The depth of 11, determines the depth of the octree composition, and was the highest we were able to go without crashing colab. 

**Implementation of Poisson Reconstruction**

After saving the point cloud as a PLY file, we defined a function for Poisson Meshing. The parameter depth=11 controls the depth of the octree decomposition. This value represents the highest depth we could use without exceeding Colab’s resource limits.

.. code-block:: python

    def create_poisson_mesh(pcd, depth=11)

In this script:

- pcd refers to the point cloud containing all the information generated earlier.
- width=0 is a standard value controlling the bounding box width.
- scale=1.1 determines how much the bounding cube of the input point cloud is expanded.

.. code-block:: python

    poisson_mesh = o3d.geometry.TriangleMesh.create_from_point_cloud_poisson(
         pcd, depth=depth, width=0, scale=1.1, linear_fit=False)[0]

    
    return poisson_mesh

The function generates a polygon mesh consisting of triangles from the point cloud. Before establishing this workflow, we initially used CloudCompare to visualize and analyze the saved point clouds and meshes.

Interactive visualisation
--------------------------
*by Jan Schittenhelm*
To visualise our 3D models we decided to use "React Three Fiber" and Three.js.


React Three Fiber
-----------------

React Three Fiber (R3F) is a React-based library that acts as a bridge to Three.js, allowing developers to create 3D scenes and visualizations using React's component-based architecture. It integrates Three.js into React applications seamlessly, enabling the use of familiar React patterns for managing complex 3D content.

Key Features of React Three Fiber:

- **Declarative Approach**:  
  React Three Fiber uses React's declarative style to describe 3D scenes, making it easier to build and manage complex hierarchies of objects.

- **Reactivity**:  
  State and props in React can be used to dynamically update 3D scenes, creating interactive and responsive visualizations.

- **Integration with React Ecosystem**:  
  React Three Fiber supports React's lifecycle methods, hooks, and context, allowing seamless integration with other React libraries and tools.

- **Rich Ecosystem**:  
  It includes additional utilities, such as `@react-three/drei`, which provides prebuilt components like `OrbitControls`, `GLTFLoader`, and more to simplify common 3D tasks.

React Three Fiber simplifies the process of developing 3D applications for web-based platforms by enabling developers to focus on the creative and functional aspects of their scenes without dealing with the lower-level complexities of Three.js.

Three.js
--------

Three.js is a low-level JavaScript library for creating and rendering 3D graphics in web applications. It provides a powerful abstraction over WebGL, the browser's graphics API, making 3D development more accessible for developers.

Key Features of Three.js:

- **Scene Graph**:  
  Three.js uses a scene graph to organize and manage 3D objects, lights, cameras, and other elements within a virtual environment.

- **Wide Range of 3D Primitives**:  
  It offers prebuilt 3D objects such as cubes, spheres, planes, and more, which can be combined to build complex scenes.

- **Materials and Textures**:  
  Three.js supports a variety of materials and textures for realistic rendering, including `MeshStandardMaterial`, `MeshPhongMaterial`, and PBR (Physically Based Rendering) materials.

- **Lighting and Shadows**:  
  With Three.js, developers can implement various lighting models (ambient, directional, spotlights) and realistic shadows.

- **Animation System**:  
  It includes an animation system for keyframe animations, skeletal animations, and morph targets.

- **Advanced Features**:  
  Three.js supports complex effects such as particle systems, postprocessing, environment mapping, and more.

- **File Format Support**:  
  It can parse and render various 3D file formats, such as `.obj`, `.gltf`, `.ply`, and more, allowing seamless integration of models created in external 3D software.

Comparison and Use Cases
------------------------

React Three Fiber and Three.js together provide a robust framework for creating dynamic, interactive, and visually stunning 3D content for the web. React Three Fiber leverages the power of Three.js while bringing the benefits of React's declarative and component-based architecture to 3D development.





Tools: React, Three.js, @react-three/fibre


.. [#] Kazhdan, M., Bolitho, M. and Hoppe, H. (2006) Poisson Surface Reconstruction, Eurographics Symposium on Geometry Processing.
.. [#] Bernardini, F. et al. (1999) The Ball-Pivoting Algorithm for Surface Reconstruction, IEEE TRANSACTiONS ON ViSUALiZATiON AND COMPUTER GRAPHiCS.
