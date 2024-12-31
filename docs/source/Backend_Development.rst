Backend Development
====================
*by Jasmin Fabijanov*

The backend was envisioned as a RESTful API service that integrates various geospatial processing functionalities, including depth map prediction, 3D mesh generation, and volumetric analysis. To ensure modularity, the backend was organized into components known as Flask blueprints, each responsible for a specific feature. This modular structure facilitated code reusability, simplified debugging, and allowed independent development of components such as mesh generation, depth prediction, and geospatial computations.

Blueprints and Their Roles
--------------------
A media directory was established to manage generated files, such as satellite images, depth maps, and 3D mesh files. This directory would be used for storing both intermediate and final results, ensuring traceability and reproducibility of outputs. Furthermore, external APIs, such as the Google Maps API for geocoding and satellite imagery, and OpenStreetMap (OSM) for geospatial data, were integrated to enrich the backend's functionality.

1. **Image Blueprint**

This module is responsible for fetching and processing satellite imagery. Its primary functionality includes:

- **Fetching Satellite Images:** It uses Google Maps Static API to retrieve high-resolution satellite images for a given address. The fetched images are cropped to remove watermarks, resized, and saved in JPEG format.
- **Bounding Box Calculations:** Based on latitude, longitude, and image dimensions, it calculates bounding boxes to extract geospatial data, ensuring precise mapping of imagery to real-world coordinates.
- **Volume and Area Computations:** It integrates building footprint data from OpenStreetMap to compute the total volume and building area using rasterized depth maps. This is critical for urban planning and infrastructure analysis.
- **Depth Prediction Pipelines:** It supports multiple models for depth estimation (e.g., Depth Anything V2, Unet Baseline, Zoe Depth). Each model processes satellite images into depth maps with distinct configurations, using tools like PyTorch and segmentation models.

2. **Mesh Blueprint**

This module bridges the gap between 2D depth maps and 3D visualization by:

- **Depth Map to Mesh Conversion:** It generates 3D point clouds and triangle meshes from depth maps and RGB images. These meshes are saved as PLY files and used for 3D rendering.
- **Depth and Mesh File Serving:** It serves depth maps and meshes to clients. If a depth map or mesh does not exist for a given address, it triggers the corresponding model pipeline to generate them dynamically.
- **Utility Functions for Mesh Generation:** It supports advanced geometry processing techniques, such as estimating normals and creating meshes using Poisson surface reconstruction. This ensures high fidelity in 3D representations.

3. **Model Blueprint**

This module encapsulates the machine learning models used for depth prediction:

- **Model Loading and Initialization:** It initializes and loads pre-trained weights for Depth Anything V2, Unet Baseline and Zoe Depth. These models leverage state-of-the-art architectures like ResNet and transformer-based approaches.
- **Depth Prediction Methods:** For each supported model, there is a dedicated method that preprocesses satellite images, performs inference to generate depth maps, and ensures compatibility with downstream modules by sizing the image according to the models requirements.


Interactions and Workflow
-------------------------

1. **Input: Address from User**
   - A user provides an address through the frontend interface.
   - This address is processed to fetch satellite images via the Image Blueprint.

2. **Depth Estimation**
   - The Model Blueprint processes the fetched satellite images through the selected depth prediction pipeline.
   - Depth maps are stored locally for reuse and further analysis.

3. **Mesh Generation**
   - Using the Mesh Blueprint, the depth maps are transformed into 3D triangle meshes or point clouds.
   - These meshes are saved as PLY files, enabling 3D visualization.

4. **Visualization and Analytics**
   - The backend serves depth maps and meshes as files or data streams, which the frontend integrates into interactive visualization tools.


API Endpoints
-------------

`/mesh/image/<string:address>`
- **Method**: GET
- **Description**: Fetches and processes the satellite image for a given address.

`/mesh/depth/<string:address>/<string:model>`
- **Method**: GET
- **Description**: Generates a depth map for the given address and model.

`/mesh/ply/<string:address>/<string:model>`
- **Method**: GET
- **Description**: Creates a 3D mesh from the depth map for the specified address and model.

`/image/volume/<string:address>/<string:model>`
DISCLAIMER: This function is deactivated in the application due to unprecise depth estimations resulting in misscalculated volumes.
- **Method**: GET
- **Description**: Calculates total building volume and footprint area in a bounding box around the given address.
 
