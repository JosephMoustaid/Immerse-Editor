import React, { useState, useEffect, useRef } from "react";

const AnnotationsMaker = ({ modelUrl }) => {
  const [annotations, setAnnotations] = useState([]);
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const sceneEl = sceneRef.current;
    const cursorEl = sceneEl.querySelector("a-cursor");
    const cameraEl = sceneEl.querySelector("a-camera");

    // Function to handle annotation placement
    const handleAnnotationPlacement = (evt) => {
      if (!isAddingAnnotation) return; // Exit if not in annotation mode

      const intersectedEl = evt.detail.intersectedEl;
      if (intersectedEl) {
        const intersectedPoint = evt.detail.intersection.point;

        const annotationName = prompt("Enter annotation name:");
        const annotationDescription = prompt("Enter annotation description:");
        if (annotationName && annotationDescription) {
          const { x, y, z } = intersectedPoint;

          const newAnnotation = {
            id: annotations.length + 1,
            name: annotationName,
            description: annotationDescription,
            position: { x, y, z },
            rotation: calculateRotation({ x, y, z }, cameraEl.object3D.position)
          };

          setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
        }
        setIsAddingAnnotation(false); // Exit annotation mode
      }
    };

    // Attach event listener
    cursorEl.addEventListener("click", handleAnnotationPlacement);

    // Clean up event listener on unmount
    return () => {
      cursorEl.removeEventListener("click", handleAnnotationPlacement);
    };
  }, [isAddingAnnotation, annotations]);

  // Function to calculate the rotation to face the camera
  const calculateRotation = (annotationPosition, cameraPosition) => {
    const dx = cameraPosition.x - annotationPosition.x;
    const dz = cameraPosition.z - annotationPosition.z;
    const rotationY = Math.atan2(dx, dz) * (180 / Math.PI);
    return `0 ${rotationY} 0`; // Return rotation as a string in A-Frame format
  };

  const handleStartAddingAnnotation = () => {
    setIsAddingAnnotation(true);
    console.log("Annotation mode activated. Click on the model to add an annotation.");
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <a-scene ref={sceneRef} embedded>
        {/* Camera with built-in controls */}
        <a-camera position="0 1.6 4">
          {/* Add cursor for interaction */}
          <a-cursor fuse="false" color="#FF0000" raycaster="objects: .clickable"></a-cursor>
        </a-camera>

        {/* Lighting for the scene */}
        <a-light type="ambient" color="#888"></a-light>
        <a-light
          type="directional"
          color="#fff"
          intensity="1"
          position="0 4 -4"
        ></a-light>

        {/* Load 3D model dynamically */}
        {modelUrl && (
          <a-gltf-model
            src={modelUrl}
            scale="1 1 1"
            position="0 0 0"
            rotation="0 45 0"
            class="clickable"  // Make model clickable
          ></a-gltf-model>
        )}

        {/* Annotations as A-Frame entities */}
        {annotations.map((annotation) => (
          <a-entity
            key={annotation.id}
            geometry="primitive: plane; width: 0.5; height: 0.2"
            material="color: red"
            position={`${annotation.position.x} ${annotation.position.y} ${annotation.position.z}`}
            rotation={annotation.rotation}
            text={`value: ${annotation.name}: ${annotation.description}; color: white; align: center; width: 2`}
            class="annotation"
            events={{ click: () => alert(`Annotation ${annotation.id} clicked!`) }}
          ></a-entity>
        ))}
      </a-scene>

      {/* Button to start annotation process */}
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          padding: "8px 16px",
        }}
        onClick={handleStartAddingAnnotation}
      >
        Add Annotation
      </button>
    </div>
  );
};

export default AnnotationsMaker;
