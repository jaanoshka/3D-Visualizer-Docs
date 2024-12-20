Conclusion 
===========
Summary of the results
-----------------------

Overall it can be said, that a modell specified on monocular depth map makes a good/ big difference. The models have different strength. The ZoeDepth Modell is better with structures in trees and small objects. This could be because it always has the overall height to high and shows the narrow details dadurch. While the Depth Anythin V2 is better at houses but struggles with smaller/narrow objects. The roofes are still patchy and also the highest points of trees are a little too high.  

Outlook for possible further developments
------------------------------------------
- Support for additional geospatial models.
- Enhanced interactivity for 3D visualizations.
- Integration with LiDAR data for precise elevation modeling.
- Started a segmentation model, to choose more balanced what the training and test data is, NRW does have a lot of fields and forest but the models don't need to be good at predicting those. 