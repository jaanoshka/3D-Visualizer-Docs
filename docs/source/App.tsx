import img1 from "./assets/img1.png"; // Import the first image
import "./App.css"; // Import the CSS file
import img2 from "./assets/img2.png"; // Import the second image
import img3 from "./assets/img3.png"; // Import the third image
import { useState } from "react";
import React, { ChangeEvent } from "react";

import NavBar from "./components/NAV"; // Import the navigation bar component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router modules
import Nav1 from "./components/NAV"; // Import the first navigation bar
import OpenModel from "./pages/OpenModel"; // Import the "OpenModel" page
import CreateNew from "./pages/CreateNew"; // Import the "CreateNew" page
import CreateUser from "./pages/User"; // Import the "CreateUser" page
import HOME from "./pages/Home"; // Import the "Home" page
import View from "./pages/View"; // Import the "View" page
import View2 from "./pages/View2"; // Import the "View2" page
import ErrorBoundary from "./components/ErrorBoundary"; // Import the ErrorBoundary component
import View3 from "./pages/View3"; // Import the "View3" page

function App() {
  let Component; // Declare a variable to hold the component based on the current path

  // Switch case to dynamically load the component based on the current path
  switch (window.location.pathname) {
    case "/":
      Component = <HOME />; // Load the "Home" page component
      break;
    case "/CreateNew":
      Component = <CreateNew />; // Load the "CreateNew" page component
      break;
    case "/OpenModel":
      Component = <OpenModel />; // Load the "OpenModel" page component
      break;
    case "/CreateUser":
      Component = <CreateUser />; // Load the "CreateUser" page component
      break;
    case "/View":
      Component = <View />; // Load the "View" page component
      break;
    case "/View2":
      Component = (
        <ErrorBoundary>
          {/* Wrap "View2" component with an error boundary */}
          <View2 />
        </ErrorBoundary>
      );
      break;
    case "/View3":
      Component = (
        <ErrorBoundary>
          {/* Wrap "View3" component with an error boundary */}
          <View3 />
        </ErrorBoundary>
      );
      break;
    default:
      Component = <HOME />; // Default fallback component if no route matches
  }

  return (
    <>
      <Nav1 /> {/* Render the navigation bar */}
      {Component} {/* Render the dynamically selected component */}
    </>
  );
}

export default App; // Export the App component as default
