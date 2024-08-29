import React, { useState, useEffect, useRef } from "react";
import Modal from "../Components/Modal/Modal.jsx";
const AnnotationsMaker = ({ modelUrl }) => {

  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
    <div>
      {showModal && (
        <Modal
          modalTitle="How to Add Annotations"
          modalContent={["Click on Add annotation button.","Point the cursor on Where you want to add the annotation.","Left Click","Enter the Annotation Name and Description.","Annotation Created👌 "]}
          modalButtonText="Understood"
          onClose={handleCloseModal}
        />
      )}
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
          {annotations.map((annotation, index) => {
            // 3D model's center position (assuming it's centered at origin, adjust as necessary)
            const modelCenter = { x: 0, y: 0, z: 0 };

            // Calculate direction vector from model center to annotation
            const directionVector = {
              x: annotation.position.x - modelCenter.x,
              y: annotation.position.y - modelCenter.y,
              z: annotation.position.z - modelCenter.z,
            };

            // Normalize the direction vector to get the unit direction
            const magnitude = Math.sqrt(
              directionVector.x ** 2 + directionVector.y ** 2 + directionVector.z ** 2
            );
            const unitVector = {
              x: directionVector.x / magnitude,
              y: directionVector.y / magnitude,
              z: directionVector.z / magnitude,
            };

            // Determine the end point of the annotation line
            const lineEnd = {
              x: annotation.position.x + unitVector.x * 0.4, // Adjust scale as needed
              y: annotation.position.y + unitVector.y * 0.4,
              z: annotation.position.z + unitVector.z * 0.4,
            };

            return (
              <a-entity key={annotation.id}>
                {/* Thicker line from model to annotation text */}
                <a-entity
                  line={`start: ${annotation.position.x} ${annotation.position.y} ${annotation.position.z}; 
                        end: ${lineEnd.x} ${lineEnd.y} ${lineEnd.z}; color: grey; opacity: 0.7`}
                  material="color: grey; opacity: 0.7"
                  lineWidth="5" // Make the line thicker
                ></a-entity>

                {/* Annotation text box container */}
                <a-entity
                  geometry="primitive: plane; width: 0.6; height: 0.3" // Adjusted width and height for better fit
                  material="color: grey; transparent: true; opacity: 0.8"
                  position={`${lineEnd.x} ${lineEnd.y} ${lineEnd.z}`}
                  rotation={annotation.rotation}
                  class="annotation"
                  events={{ click: () => alert(`Annotation ${annotation.id} clicked!`) }}
                >
                  {/* Annotation Name with Number (smaller size) */}
                  <a-text
                    value={`${index + 1}. ${annotation.name} :`} // Display the annotation number and name
                    color="white"
                    align="center"
                    width="1.1" // Smaller width for the name
                    position="-0.2 0.1 0" // Position at the top of the text box
                    anchor="center"
                  ></a-text>

                  {/* Annotation Description (even smaller size) */}
                  <a-text
                    value={annotation.description}
                    color="white"
                    align="center"
                    width="0.6" // Smaller width for the description
                    position="-0.2 0.05 0" // Position below the name
                    anchor="center"
                  ></a-text>
                </a-entity>
              </a-entity>
            );
          })}



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
    </div>
  );
};

export default AnnotationsMaker;
