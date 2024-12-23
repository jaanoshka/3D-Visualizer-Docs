Backend_Development
====================
*by Jasmin Fabijanov*

Technology Stack
-----------------
- **Flask**: RESTful API development.
- **Open3D**: 3D mesh and point cloud processing.
- **PyTorch**: Depth prediction using advanced ML models.
- **Segmentation Models PyTorch (SMP)**: Used for Unet Baseline depth prediction.
- **OpenStreetMap (OSM)**: Fetches building footprints and other geospatial data.
- **Google Maps API**: Retrieves satellite imagery and geocoding data.

API Endpoints
-------------

### `/mesh/image/<address>`
- **Method**: GET
- **Description**: Fetches and processes the satellite image for a given address.

### `/mesh/depth/<address>/<model>`
- **Method**: GET
- **Description**: Generates a depth map for the given address and model.

### `/mesh/ply/<address>/<model>`
- **Method**: GET
- **Description**: Creates a 3D mesh from the depth map for the specified address and model.

### `/image/volume/<address>/<model>`
- **Method**: GET
- **Description**: Calculates total building volume and footprint area in a bounding box around the given address.

### Other Tools and Libraries
- **NumPy**: Numerical data manipulation.
- **Pandas**: Dataframe processing for geospatial data.
- **Matplotlib**: Depth map visualization.
