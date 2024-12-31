Deployment 
===========
*by Jasmin Fabijanov*

Dockerization of TerraVision
----------------------------

**Backend Dockerization**
The backend is encapsulated in a Docker container built using a custom Dockerfile. Key steps include:

1. **Base Image:** A Python 3.10 image ensures compatibility with TerraVision’s dependencies.
2. **Dependency Installation:** All Python libraries (e.g., Flask, Open3D, PyTorch) are installed using a requirements.txt file.
3. **Environment Setup:** Environment variables for API keys, database configurations, and Flask settings are loaded from a .env file.
4. **Startup Command:** The Flask application is launched as the container’s main process.

**Frontend Dockerization**
The frontend is packaged into a Docker container to standardize the development and deployment environment.

1. **Base Image**: A Node.js image is used as the base, ensuring compatibility with React and TypeScript.
2. **Dependency Installation**: `package.json` is used to install all required npm packages.
3. **Build Process**: The application is built using Vite, producing a lightweight static build.
4. **Static File Serving**: The built files are served using a lightweight HTTP server, such as `serve`, within the container.


**Docker Compose for Multi-Service Orchestration**
Docker Compose was utilized to orchestrate the backend and frontend. The Compose configuration ensured seamless interaction between all components.

**Compose File Structure**
- **Backend Service**:
  - Exposes Flask on port 4000.
  - Maps the `media/` directory as a volume to retain generated files.
- **Frontend Service**:
  - Runs the React application on port 3000.
  - Links to the backend for API communication.
- **Database Service**:
  - Sets up a PostgreSQL database for storing computed volumetric and geospatial data.
  - Configures environment variables for credentials.


Network Configuration
----------------------
A shared Docker network allows all services to communicate efficiently, with service names acting as DNS aliases.

**Workflow and Interaction**

User Journey:
1. **Input**: Users input an address on the frontend.
2. **Backend Processing**:
   - The backend retrieves satellite imagery and computes depth maps using the selected model.
   - Volumetric analysis and 3D mesh generation are performed as needed.
3. **Frontend Visualization**:
   - The processed data is sent to the frontend for visualization, including satellite images, depth maps, and 3D models.
4. **Downloadable Outputs**:
   - Users can download images, depth maps, and 3D mesh files directly from the UI.

Developer Workflow:
1. Developers run `docker-compose up` to spin up the entire stack.
2. The backend and frontend are accessible at their respective ports (e.g., 4000 and 3000).
3. Changes to code automatically trigger updates within the containers, enabling real-time development.


Deployment
-------------

The Dockerized TerraVision application can be deployed on any platform supporting container orchestration, such as AWS ECS, Google Kubernetes Engine, or Azure Container Instances. Deployment involves:
1. **Building and Pushing Images**: Docker images for the backend and frontend are pushed to a container registry.
2. **Orchestrating Services**: A container orchestrator, like Kubernetes, ensures scaling and fault tolerance.
3. **Load Balancing**: Traffic is distributed across multiple instances of the backend and frontend for high availability.

Summary
------------

The Dockerized architecture of TerraVision unifies the backend and frontend into a cohesive system, ensuring reliability, portability, and ease of scaling. By employing modern containerization techniques and aligning development workflows with scientific best practices, TerraVision achieves a robust environment for geospatial visualization and analysis.