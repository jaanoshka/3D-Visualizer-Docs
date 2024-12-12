Features
=========

- **Address-Based Data Retrieval**
  - Users can input an address to retrieve satellite imagery and depth maps.
  - Data is processed and visualized in 3D models for in-depth spatial analysis.

- **Model Predictions**
  - Supports multiple depth prediction models, including:
    - Depth Anything V2
    - Zoe Depth
    - Unet Baseline

- **3D Visualization**
  - Generates 3D models from depth maps using Poisson reconstruction.
  - Interactive rendering of 3D models and point clouds with real-time rotation and zoom.

- **Volume and Area Estimation**
  - Calculates total building volume and footprint within a bounding box using depth maps and OpenStreetMap data.

- **Downloadable Assets**
  - Provides satellite images, depth maps, and 3D mesh files for download in user-friendly formats.

System Architecture
===================

### Workflow
1. **Input**:
   - User enters an address in the frontend.
   - The backend geocodes the address using Google Maps API.

2. **Data Retrieval**:
   - Satellite images are fetched using Google Static Maps API.
   - Depth maps are generated using selected models (Depth Anything V2, Zoe Depth, Unet Baseline).

3. **Processing**:
   - Depth maps are converted into 3D meshes using Open3D’s Poisson reconstruction.
   - Volume and area of buildings are calculated using OpenStreetMap data.

4. **Visualization**:
   - Processed data is sent to the frontend.
   - Satellite images, depth maps, and 3D models are rendered in an interactive UI.

5. **Downloadable Outputs**:
   - Users can download depth maps and 3D meshes in standard formats.