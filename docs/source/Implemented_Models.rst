Implemented Models
===================
Depth Anything V2
------------------
*by Jasmin Fabijanov and Evalotta Horn*

The Depth Anything V2 model is a perfect fit for this project as it is a powerful tool for performing monocular depth estimation. [#]_ There are five key reasons that support our choice of this model:

- **High accuracy and robustness:** Depth Anything V2 delivers robust results for complex scenes. In our project, the focus is primarily on buildings, but we utilized diverse landscapes across North Rhine-Westphalia (NRW) to train and test the model. This includes cluttered layouts, which the model handles effectively. It also produces finer details compared to other models, which is particularly advantageous when analyzing the intricate structures of rooftops.
- **Efficiency and scalability:** The model is characterized by high efficiency, as it is faster than comparable models. At the same time, it offers versions in different sizes (25M to 1.3B parameters), making it flexible for various applications and hardware requirements. This was a significant advantage for us, as we relied on the computing resources of Google Colab rather than high-performance computers.
- **Low memory requirements with high performance:**  Depth Anything V2 requires less memory while still achieving superior accuracy in many benchmarks. Even the smallest version of the model often outperforms heavyweight competitors. This was also an advantage for us, as we used Google Colab during this project.
- **Training with high quality data:** The model is pretrained on synthetic images with precise depth information, which avoids issues such as label noise and missing details often found in real-world images. For our project, we fine-tuned the model using high-quality LiDAR data, which provided accurate and reliable depth information. Therefore we were able to maintain the high quality.
- **Comparison with other methods:** Depth Anything V2 outperforms other popular models, such as Depth Anything V1 and MiDaS, in both benchmarks and visual quality. It successfully combines the strengths of generative and discriminative approaches to produce accurate, realistic depth maps.

Zoe Depth 
----------
*by Matthäus Surafial*

Baseline Model 
---------------
*by Evalotta Horn*

The baseline model serves as a reference for evaluating the performance and improvement of other models. It enables an objective assessment of the work. We selected a segmentation model from the PyTorch open-source machine learning library. The model follows a U-Net architecture and was implemented using the Segmentation Models PyTorch (smp) library, which specializes in image segmentation tasks. [#]_

.. code-block:: python

    model = smp.Unet(
        encoder_name="resnet34",  
        encoder_weights="imagenet",
        in_channels=3,  
        classes=1  
    )

In this architecture, the encoder extracts features from the input image, while the decoder restores these features to their original resolution. U-Net uses skip connections to combine low-resolution features from the encoder with high-resolution features from the decoder, enhancing the segmentation accuracy. For this project, we used ResNet34 as the backbone. ResNet34 is a convolutional neural network (CNN) originally developed for classification tasks. It is both efficient and versatile, providing strong results across various applications.

The encoder was initialized with pre-trained weights from the ImageNet dataset. This pre-training allows the encoder to effectively extract general features from images, such as edges and shapes. The model accepts RGB images (three input channels for red, green, and blue) and outputs a single segmentation class, enabling binary segmentation.

This model aligns well with the objectives of this project seminar, as typical applications include autonomous driving and satellite imagery. These use cases involve segmenting roads, buildings, forests, or bodies of water, making the model well-suited for tasks like identifying structures from aerial views.

During development, we also considered the FastAI library. [#]_ However, its implementation was significantly more complex than the smp library and did not yield successful results. In contrast, smp.Unet offers more precise image segmentation, greater flexibility in choosing encoders and architectures, and seamless GPU support. Additionally, it allows users to leverage pre-trained models, further simplifying development.

For optimization, we used the Huber Loss function and the Adam optimization algorithm. Adam, short for Adaptive Moment Estimation, combines the advantages of AdaGrad (adaptive learning rates) and RMSprop (scaling learning rates based on gradient variance). It provides fast convergence, adaptive learning rates per parameter, and robustness to noisy gradients.

The Huber Loss function merges the properties of the mean absolute error (MAE) and mean squared error (MSE). Its key advantages include flexibility through the delta parameter, which defines the threshold for transitioning between quadratic and linear behavior. This makes the Huber Loss robust to outliers due to its linear behavior beyond delta. Additionally, the smooth derivative of the Huber Loss for small errors enables more stable gradients and efficient training.

.. code-block:: python
    
    huber_loss_fn = HuberLoss(reduction='mean', delta=1.0)
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)


.. code-block:: python
    
        # Forward pass
        outputs = model(images)

        # Calculate loss
        loss = huber_loss_fn(outputs, depths)

        # Backward pass and optimization
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        running_loss += loss.item()

The baseline model was trained using a standard supervised learning approach. During each training iteration, the model performed a forward pass to generate predictions (outputs) based on the input images. The Huber Loss function was then used to compute the loss between the predicted outputs and the ground truth depth values (depths). A backward pass calculated the gradients of the loss with respect to the model parameters, which were subsequently updated using the Adam optimizer. The training loop also accumulated the loss values to monitor the model's performance across iterations. This process ensured the model was progressively optimized for accurate depth prediction. Ten epochs were choosen for the training loop. 

.. code-block:: python

    train_model(model, train_loader, optimizer, huber_loss_fn, epochs=epochs)

Comparison of the Models
--------------------------
*by Evalotta Horn*

To analyse and compare the models, we will use two approaches. Firstly, we will look at the test and training losses and secondly, we will compare the depth maps with the true depth map consisting of lidar data in different categories. 

**Trainings and Test losses**

All three models were trained for ten epochs and as already mentioned before on the same data, from NRW consisting out of orthophotos and lidar data, and also in the same order.

For the basic modell the training loss starts at 3.4906 and decreases continuously to 1.1148. This shows that the model learns to reduce the errors in the prediction during training. The loss decreases more slowly in the later epochs, which indicates that the model is approaching convergence. The average test loss is 1,870. The difference between training and test loss is significant (0.7556). This indicates that the basic model suffers from overfitting: It has overfitted to the training data, but generalises poorly to new data.
The low training loss explains why it was able to model the training data well, but the quality of the test data is poorer (visible in the poor depth map). The basic model may be too simple to capture the complexity of the depth relationships in the data. While it can minimise the training loss, it cannot reconstruct the finer details of the depth maps. The lack of generalisation is shown through the architecture of the model which is not sufficient to fully capture the complexity of the data.
The basic model is hardly suitable for practical applications, as it shows the worst generalisation and depth map quality despite the low training loss.

For the Depth Anything V2 modell the training loss starts at 2.1238 and decreases down to 1.7315, while the average test loss is 1.8317. The difference between training and test loss is approximately 0.6247, which indicates better generalisation than with the basic model.
The model is able to better capture the structures of the test data. The higher model complexity is reflected by the more robust encoder and the pre-trained weights and could contribute to the improved generalisation capability. The ResNet34 encoder allows the model to extract more complex features, resulting in better depth maps. The initial weights from ImageNet help the model to recognise general structures. It combines good architecture (U-Net + ResNet34) with efficient processing.
Although the test loss at the end of the tenth epoch is slightly higher than with the Basic Model, the visual quality of the generated depth maps is much better (clearer building edges, fewer artefacts). The good balance between training and test loss shows that the Depth Anything V2 is robust and suitable for use in real-world applications.

For the ZoeDepth modell the training loss starts at 4.513 and decreases down to 1.7311, while the average test loss is 1,5679. Interestingly, ZoeDepth has the lowest test loss, although the training loss at the end is higher than for the other models.
This suggests that ZoeDepth generalises best. It could be because the model was less overfitted during training and is therefore less specialised, but performs better on the test data.  ZoeDepth uses a possibly optimised U-Net architecture that promotes generalisation (e.g. special regularisation). It shows that the architecture and training strategy have a major influence on the generalisation capability.

To summarise, the comparison shows that a low training loss does not automatically mean the best performance. Models such as Depth Anything and ZoeDepth, which are designed for better generalisation, deliver the more convincing results both quantitatively (test loss) and qualitatively (depth maps). In this comparison, the Depth Anything V2 shows the best balance between test loss, generalisation capability and visual quality. Whilst ZoeDepth has the lowest test loss, Depth Anything V2 shows clearer and more detailed depth maps overall, which are very close to the true depth map. This makes it particularly suitable for applications where both precision and robustness are important.

.. image:: ../static/images/Trainingloss.png
    :alt: Training loss of the models
    :align: center

Above we talked about the average test loss of all three models. This graphic shows the test losses of every batch from all three models compared to each other. It is interessting to see that the test losses have large shifts. The reason could be that the test data also includes various areas of NRW, like fields, forests, water and houses. It shows us that the models have different strengths. Unfortunatelly we did not look into the single batches to see what exact orthophotos were included, this would have not fitted in to our timetable. 

.. image:: ../static/images/TestLoss.png
    :alt: Test loss of the models
    :align: center

The Basic model has relatively high fluctuations in test loss and largely remains above the values of the other models. The values are less stable and occasionally reach peaks of almost 2.5.
Meanwhile, the Depth Anything V2 mode is more stable overall than the Basic model, but shows some fluctuations. The loss usually remains between 1.5 and 2.0 and is comparable to ZoeDepth.
The ZoeDepth model has the lowest average loss and shows the smallest fluctuations in comparison. The test loss often remains close to or below 1.5.

The Depth Anything V2 and ZoeDepth Model often have similar test losses, especially in the area between batch 10 and 30 where their curves overlap. However, the Depth Anything Model has a slight tendency towards higher fluctuations compared to ZoeDepth. The differences are particularly visible in batches 15-25, where ZoeDepth remains more stable. Nevertheless, both models remain close to each other. The Basic Model deviates significantly due to its high losses and instability.

**Depth Maps**

In the next step, we will look at the visualisation of the results. To have the best comparison, we chose various orthophotos from the test data set and are going to compare the depth maps of the three different models but also to the true depth map. The orthophots are meant to cover the biggest variety of areas in NRW.

.. image:: ../static/images/predicted_depth_map2_516000.0_5759000.0_part_2_1.png
    :alt: Depth Maps of residential area
    :align: center


.. [#] Yang, L. et al. (2024) “Depth Anything V2.” Available at: http://arxiv.org/abs/2406.09414.
.. [#] Lakubovskii, P. (2014) Segmentation Models’s . Available at: https://smp.readthedocs.io/en/latest/ (Accessed: December 11, 2024).
.. [#] Howard, J. and Thomas, R. (no date) Welcome to fastai. Available at: https://docs.fast.ai (Accessed: December 18, 2024).