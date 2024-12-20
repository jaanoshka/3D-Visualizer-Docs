Conclusion 
===========
*by Evalotta Horn*

Summary of the results
-----------------------
This project represents a significant contribution to the energy transition by providing a cost-efficient and scalable workflow for generating global elevation data. By converting 2D orthophotos into 3D models without relying on costly and regionally limited LiDAR data, we offer decision-makers in the energy sector a powerful tool to optimize infrastructure and energy planning. We hope this project will serve as a foundation for further research and development in this critical area.

Overcoming the technical challenges of Monocular Depth Estimation, we successfully reconstructed height information from a single perspective. This achievement demonstrates the feasibility of deriving accurate elevation data without binocular vision, paving the way for more accessible and scalable solutions.

The outcome of this project seminar is a fully functioning system that enables users to input any address in Germany and obtain three downloadable outputs: the orthophoto of the area (512 meters by 512 meters), the depth map, and a 3D mesh visualization. Users can also select between three different models: the Baseline Model, Depth Anything V2, and ZoeDepth, each with distinct strengths and weaknesses.

The Baseline Model highlights the importance of using models specifically tailored for monocular depth estimation. Its blurry and imprecise results contrast sharply with the more refined outputs of the other two models. ZoeDepth excels at capturing tree structures and smaller objects but tends to overestimate overall height, often emphasizing narrow details. In contrast, Depth Anything V2 performs better in representing buildings, though it struggles with smaller or narrower objects. Issues such as patchy roofs and slightly overestimated tree heights remain areas for improvement.

In conclusion, this project delivers a practical, innovative, and scalable solution for generating 3D elevation data from 2D imagery. By addressing a critical gap in global elevation data, the workflow developed here not only advances computational methods in geospatial visualization but also directly supports sustainable energy infrastructure planning. TerraVision, the resulting platform, stands as a testament to the potential of machine learning and computer vision to drive meaningful advancements in energy management and urban development.

Outlook for possible further developments
------------------------------------------
The results of this project demonstrate the potential of leveraging machine learning and computer vision to address the challenges of monocular depth estimation, but there remains room for further refinement and enhancement. Naturally, there are always ideas and opportunities for improvement. During this project seminar, our time and expertise were limited, which imposed certain boundaries on what we could achieve. Nevertheless, we have identified several proposals for future work that could build on the foundation established here.

- To show more diversity, the system could support additional geospatial models.
- An enhanced interactivity for 3D visualizations like easier control or a street view with dropping a figure like in google maps. 
- During development, we started programming a segmentation model. The goal was to ensure balanced training and test data across all categories while specifically focusing on orthophotos with buildings. This emphasis aligned with the objectives of the project seminar, supported by the company Greenventory. North Rhine-Westphalia (NRW) features extensive fields and forests, which were not the intended focus of the models. Unfortunately, there were insufficient resources to fully implement this idea. However, we are convinced that by more precisely curating the training data, the models can achieve improved performance.
- Integration with LiDAR data for precise elevation modeling. (JASMIN, den Punkt verstehe ich nicht. Kannst du den noch ausführen bitte.)