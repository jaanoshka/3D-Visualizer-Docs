Frontend Development

This chapter explains how our frontend looks like and how we use it. Further, this chapter will describe how we started to develop the user interface and explains every single function.

## The Beginnings: Conceptualization and Design of the Frontend

Before the actual implementation began, it was essential to have a clear vision of how the frontend of the software tool should look and function. To achieve this, **Figma** was used, a tool for designing and prototyping user interfaces. 

Figma allowed for rapid visualization of ideas and experimentation with different design options. Its collaborative features made it possible to gather early feedback from team members and ensure the design aligned with the project's requirements.

### Getting Started with Figma

The initial step involved creating basic layouts that reflected the key components and functionalities of the frontend. The following aspects were taken into account:

- **Usability**: The interface should be intuitive and easy to use.
- **Aesthetics**: A modern and appealing design that reflects the purpose of the tool.


*by Jan Schittenhelm*

Technology Stack
-----------------
- **React**: Interactive and responsive UI.
- **React Router**: Handles navigation between views.
- **@react-three/fiber** and **three.js**: 3D rendering and visualization.
- **TypeScript**: Provides type safety and robust development experience.

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

