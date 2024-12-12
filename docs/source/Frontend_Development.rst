Technology Stack
=================
- **React**: Interactive and responsive UI.
- **React Router**: Handles navigation between views.
- **@react-three/fiber** and **three.js**: 3D rendering and visualization.
- **TypeScript**: Provides type safety and robust development experience.

Frontend Views
===============

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

Test 123