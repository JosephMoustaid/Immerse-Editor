import React, { useState, useEffect } from "react";
import "aframe";

const AnnotationsMaker = ({
  asset,
  position = "0 0 0",
  rotation = "0 0 0",
  scale = "1 1 1",
}) => {
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    const handleModelClick = (event) => {
      // Get the intersection point from the click event
      const intersection = event.detail.intersection;
      if (!intersection) return;

      const { x, y, z } = intersection.point;
      const newAnnotation = {
        position: `${x} ${y} ${z}`,
        text: `Annotation ${annotations.length + 1}`, // Example: Automatically label annotations
      };

      setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
    };

    // Get reference to the 3D model
    const modelEntity = document.querySelector("#clickable-model");

    // Add event listener for clicks on the model
    modelEntity.addEventListener("click", handleModelClick);

    // Cleanup event listener on unmount
    return () => {
      modelEntity.removeEventListener("click", handleModelClick);
    };
  }, [annotations]); // Dependency on annotations to update on every new annotation

  return (
    <>
      {/* Sky and Light for better visualization */}
      <a-sky color="#ECECEC"></a-sky>
      <a-light type="directional" color="#FFF" position="1 1 1"></a-light>

      {/* 3D Model */}
      <a-entity
        id="clickable-model"
        gltf-model={`url(${asset})`}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={() => {}}
      ></a-entity>

      {/* Render Annotations */}
      {annotations.map((annotation, index) => (
        <a-entity key={index} position={annotation.position}>
          <a-text
            value={annotation.text}
            align="center"
            color="#000"
            width="2"
            position="0 0.1 0"
            look-at="[camera]"
          ></a-text>
          {/* Optionally add a marker or icon */}
          <a-sphere color="#FF0000" radius="0.05" position="0 0 0"></a-sphere>
        </a-entity>
      ))}
      </>
  );
};

export default AnnotationsMaker;
