import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import * as THREE from "three";

// Component for the rotating mesh model
const RotatingMesh = ({ geometry }: { geometry: THREE.BufferGeometry }) => {
  const meshRef = useRef<THREE.Mesh>(null); // Reference to the mesh object
  const [rotationSpeed, setRotationSpeed] = useState(0); // State to control rotation speed

  // Rotates the mesh in every frame based on the rotation speed
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += rotationSpeed; // Rotate around the Z-axis
    }
  });

  // Handle keyboard inputs to control rotation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setRotationSpeed(0.01); // Rotate left (Z-axis)
      } else if (event.key === "ArrowRight") {
        setRotationSpeed(-0.01); // Rotate right (Z-axis)
      }
    };

    const handleKeyUp = () => {
      setRotationSpeed(0); // Stop rotation when the key is released
    };

    // Add event listeners for key press and release
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      // Cleanup event listeners on unmount
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      {/* Apply a standard material with vertex colors if the geometry contains color information */}
      <meshStandardMaterial vertexColors={true} />
    </mesh>
  );
};

// Component to load and display a 3D mesh
const MeshViewer = () => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null); // State for the loaded geometry

  useEffect(() => {
    const loader = new PLYLoader(); // Loader for PLY files
    loader.load(
      "/poisson_mesh-14.ply", // Path to the PLY file
      (geometry) => {
        geometry.scale(0.1, 0.1, 0.1); // Scale down the mesh
        geometry.computeVertexNormals(); // Compute normals for proper lighting
        setGeometry(geometry); // Store the loaded geometry in state
      },
      undefined,
      (error) => {
        console.error("Error loading the mesh:", error); // Log errors during loading
      }
    );
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 50 }} // Position the camera farther away
      gl={{ antialias: true }} // Enable antialiasing for smoother rendering
      style={{ backgroundColor: "#1a1a1a", height: "100%", width: "100%" }} // Fullscreen canvas
    >
      {/* Add ambient light and a directional light source */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      {/* Render the rotating mesh when geometry is loaded */}
      <Suspense fallback={null}>
        {geometry && <RotatingMesh geometry={geometry} />}
      </Suspense>
      
      {/* Add axes for reference */}
      <axesHelper args={[5]} /> {/* Axes length is 5 */}
      
      {/* Add orbit controls for rotating the camera */}
      <OrbitControls />
    </Canvas>
  );
};

// Main view component wrapping the canvas and title
const View = () => {
  return (
    <div
      style={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        display: "flex", // Flexbox for alignment
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#add8e6", // Light blue background
      }}
    >
      <h1 style={{ margin: "20px 0" }}>Display Mesh</h1> {/* Title of the view */}
      <div
        style={{
          width: "80%", // Canvas occupies 80% of the width
          height: "80%", // Canvas occupies 80% of the height
          border: "2px solid red", // Red border for the canvas container
        }}
      >
        <MeshViewer /> {/* Render the MeshViewer inside the container */}
      </div>
    </div>
  );
};

export default View;

