Welcome to TerraVision's documentation!
======================================

Problem statement and motivation 
--------

Aim of the project 
--------

Relevance and areas of application
--------

.. toctree::
   :maxdepth: 3
   :hidden:

   System Overview
   Quickstart
   Data Preprocessing
   Implemented Models
   3D Visualisation
   Backend Development
   Frontend Development
   Deployment
   Notebooks
   Conclusion

**TerraVision** is an advanced geospatial visualization and analysis platform that integrates satellite imagery, depth mapping, and 3D rendering capabilities. Designed to harness modern machine learning models and APIs, TerraVision enables users to analyze geospatial data in visually rich and interactive formats, catering to applications in urban planning, topographical analysis, and infrastructure development.

Features
--------

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

Technology Stack
----------------

### Backend
- **Flask**: RESTful API development.
- **Open3D**: 3D mesh and point cloud processing.
- **PyTorch**: Depth prediction using advanced ML models.
- **Segmentation Models PyTorch (SMP)**: Used for Unet Baseline depth prediction.
- **OpenStreetMap (OSM)**: Fetches building footprints and other geospatial data.
- **Google Maps API**: Retrieves satellite imagery and geocoding data.

### Frontend
- **React**: Interactive and responsive UI.
- **React Router**: Handles navigation between views.
- **@react-three/fiber** and **three.js**: 3D rendering and visualization.
- **TypeScript**: Provides type safety and robust development experience.

### Other Tools and Libraries
- **NumPy**: Numerical data manipulation.
- **Pandas**: Dataframe processing for geospatial data.
- **Matplotlib**: Depth map visualization.

System Architecture
--------------------

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

Backend API Endpoints
----------------------

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

Frontend Views
--------------

### `AddressInput.tsx`
- A single input field for the address with a submit button styled in Apple UI fashion.
- Background image fills the entire screen.

### `ShowAerialImage.tsx`
- Displays the satellite image in a centered, translucent frame.
- Includes a dropdown menu to select the depth prediction model.
- Download button for the satellite image is incorporated.

### `PredictionDisplay.tsx`
- Displays both the satellite image and the depth map in Apple UI-style translucent frames.
- "Show 3D Model" button to navigate to the 3D visualization page.

### `View3.tsx`
- Interactive 3D visualization of the mesh generated from the depth map.
- Includes volume and area calculations displayed in the sidebar.

Development Setup
------------------

### Prerequisites
- Python 3.10 or later
- Node.js and npm
- Google Maps API key

### Backend Setup
1. Clone the repository.
2. Create a virtual environment:
   ```bash
   python3 -m venv env
   source env/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables in `.env` file:
   ```env
   FLASK_APP=run.py
   SQLALCHEMY_DATABASE_URI=postgresql://<user>:<password>@localhost/<dbname>
   GOOGLE_MAPS_API_KEY=<your_api_key>
   ```
5. Run the backend:
   ```bash
   flask run
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

Deployment
----------

### Docker
- Dockerfiles are included for both the backend and frontend.
- Use `docker-compose` to build and deploy the entire application.

### Hosting
- Backend: AWS EC2, Heroku, or any Flask-compatible platform.
- Frontend: Netlify, Vercel, or similar static site hosting services.

Future Enhancements
--------------------

- Support for additional geospatial models.
- Enhanced interactivity for 3D visualizations.
- Integration with LiDAR data for precise elevation modeling.

License
-------

**TerraVision** is licensed under the MIT License.

For detailed documentation, visit: [https://terravision.readthedocs.io](https://terravision.readthedocs.io)


