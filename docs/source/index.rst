Introduction to TerraVision
============================
Problem statement and motivation 
---------------------------------
Heating accounts for 64% of the total energy consumption in private households, underscoring the urgent need for precise energy planning and optimization. Accurate elevation data is a critical factor for estimating energy requirements and supporting urban development. However, there is a significant data gap: while satellite imagery provides 2D information (latitude and longitude), it does not include globally available altitude data.

Alternative technologies such as LiDAR can generate 3D elevation data, but they are often cost-prohibitive, time-consuming, and limited to specific regions. This limitation poses a major technical challenge: the reconstruction of elevation data from a single viewpoint, known as Monocular Depth Estimation. Unlike human binocular vision, where two eyes perceive the same object from slightly different angles to calculate depth, satellite images offer only one perspective. Therefore, reconstructing the third dimension (height) from a single 2D image represents the core challenge of this project. This approach mimics how one might attempt to perceive depth with only a single eye, demanding innovative computational solutions.

Aim of the project 
-------------------
The aim of this project is to develop an innovative, cost-efficient, and scalable workflow for converting 2D orthophotos into precise 3D models. By leveraging advanced computer vision and deep learning methods, the project focuses on accurately predicting building heights and creating global elevation datasets.

This solution addresses the current gap in elevation data and provides the foundation for sustainable energy infrastructure planning. Accurate 3D models enable better estimation of heating demand in winter and heat retention in summer, both of which are influenced by the physical characteristics of buildings.

As part of this effort, the project introduces TerraVision, a sophisticated geospatial visualization and analysis platform. TerraVision integrates satellite imagery, depth mapping, and 3D rendering capabilities into a unified tool. By utilizing modern machine learning models and APIs, TerraVision allows users to interactively analyze geospatial data in visually rich formats. This makes it applicable to a wide range of areas, such as urban planning, topographical analysis, and infrastructure development, while offering a cost-effective alternative to technologies like LiDAR.

Relevance and areas of application
-----------------------------------
The Greenventory GmbH (https://greenventory.de/) is a company committed to advancing the energy transition through data-driven decision support systems. By utilizing publicly available geospatial data, Greenventory derives critical insights into building energy consumption, including electricity and heating requirements. These insights are then used to design and optimize sustainable energy infrastructures, such as power grids, photovoltaic systems, energy storage solutions, and heating concepts.

Integrating precise elevation data into Greenventory's existing models significantly enhances their ability to estimate energy-relevant building parameters. This includes the assessment of heating demand, the identification of building heights, and the potential for decentralized energy production (e.g., photovoltaic systems).

The workflow developed in this project directly contributes to these goals by providing a scalable and accurate method for generating global elevation data from 2D images. This capability supports urban planning, improves energy efficiency predictions, and provides the foundation for developing smart, sustainable cities. Through this project, the integration of reliable 3D data becomes a powerful tool for both energy management and future-oriented urban development.

.. toctree::
   :maxdepth: 12
   :hidden:

   System_Overview.rst
   Quickstart.rst
   Data_Preprocessing.rst
   Implemented_Models.rst
   3D_Visualisation.rst
   Backend_Development.rst
   Frontend_Development.rst
   Deployment.rst
   Notebooks.rst
   Conclusion.rst


License
-------

**TerraVision** is licensed under the MIT License.

For detailed documentation, visit: [https://terravision.readthedocs.io](https://terravision.readthedocs.io)


