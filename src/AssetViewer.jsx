import React, { useRef, useState, useCallback } from 'react';
import arrow from "./assets/icons/next.png";
import finished from "./assets/icons/finished.png";

function AssetViewer({ asset, position = "0 0 0", rotation = "0 0 0", scale = "1 1 1" }) {
  const assetRef = useRef(null);
  const [pos, setPos] = useState(position.split(' ').map(Number));
  const [rot, setRot] = useState(rotation.split(' ').map(Number));
  const [scl, setScl] = useState(scale.split(' ').map(Number));
  const intervalRef = useRef(null); // Reference to store interval ID

  const startContinuousChange = useCallback((changeFunction, axis, delta) => {
    changeFunction(axis, delta); // Initial change

    // Clear any previous interval to avoid multiple intervals running
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => changeFunction(axis, delta), 100);
  }, []);

  const stopContinuousChange = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null; // Reset the interval reference
  }, []);

  const handlePositionChange = (axis, delta) => {
    const newPos = [...pos];
    newPos[axis] += delta;
    setPos(newPos);
    if (assetRef.current) {
      assetRef.current.setAttribute('position', newPos.join(' '));
    }
  };

  const handleRotationChange = (axis, delta) => {
    const newRot = [...rot];
    newRot[axis] += delta;
    setRot(newRot);
    if (assetRef.current) {
      assetRef.current.setAttribute('rotation', newRot.join(' '));
    }
  };

  const handleScaleChange = (axis, delta) => {
    const newScl = [...scl];
    newScl[axis] = Math.max(newScl[axis] + delta, 0.5); // Prevents scale from going below 0.5
    setScl(newScl);
    if (assetRef.current) {
      assetRef.current.setAttribute('scale', newScl.join(' '));
    }
  };

  const handleFinish = () => {
    // Action to perform when the "Finish" button is clicked
    console.log('Finish button clicked');
    // Add your desired logic here
  };

  return (
    <>
      {/* 3D Model */}
      <a-entity
        ref={assetRef}
        gltf-model={`url(${asset})`}
        position="30 5 -9"
        rotation={rot.join(' ')}
        scale={scl.join(' ')}
      ></a-entity>



      {/* Controls for adjusting position */}
      <a-entity position="38 14 4.5" scale="1.4 1.4 1.4" rotation="0 -90 0">
        <a-text value="Here you can controll the placement and scale of the asset :"  align="center" color="#FFF"></a-text>
      </a-entity>

      {/* Controls for adjusting position */}
      <a-entity position="38 10 0" scale="1.4 1.4 1.4" rotation="0 -90 0">
        <a-text value="Position Controls" position="1 2 0" align="center" color="#FFF"></a-text>
        {['X', 'Y', 'Z'].map((axis, index) => (
          <a-entity key={axis} position={`0 ${1.5 - index * 0.5} 0`}>
            <a-text value={`${axis}: ${pos[index].toFixed(2)}`} align="center" position="1 0 0" color="#FFF"></a-text>
            <a-image
              src={arrow}
              width="0.5"
              height="0.5"
              position="0.5 0 0"
              class="clickable"
              rotation="0 0 180"
              onMouseDown={() => startContinuousChange(handlePositionChange, index, -0.5)}
              onMouseUp={stopContinuousChange}
              onMouseLeave={stopContinuousChange}
            ></a-image>
            <a-image
              src={arrow}
              width="0.5"
              height="0.5"
              position="1.5 0 0"
              class="clickable"
              onMouseDown={() => startContinuousChange(handlePositionChange, index, 0.5)}
              onMouseUp={stopContinuousChange}
              onMouseLeave={stopContinuousChange}
            ></a-image>
          </a-entity>
        ))}
      </a-entity>

      {/* Controls for adjusting rotation */}
      <a-entity position="38 10 3" scale="1.4 1.4 1.4"  rotation="0 -90 0">
        <a-text value="Rotation Controls" position="1 2 0" align="center" color="#FFF"></a-text>
        {['X', 'Y', 'Z'].map((axis, index) => (
          <a-entity key={axis} position={`0 ${1.5 - index * 0.5} 0`}>
            <a-text value={`${axis}: ${rot[index].toFixed(1)}`} align="center" position="1 0 0" color="#FFF"></a-text>
            <a-image
              src={arrow}
              width="0.5"
              height="0.5"
              position="0.5 0 0"
              class="clickable"
              rotation="0 0 180"
              onMouseDown={() => startContinuousChange(handleRotationChange, index, -10)}
              onMouseUp={stopContinuousChange}
              onMouseLeave={stopContinuousChange}
            ></a-image>
            <a-image
              src={arrow}
              width="0.5"
              height="0.5"
              position="1.5 0 0"
              class="clickable"
              onMouseDown={() => startContinuousChange(handleRotationChange, index, 10)}
              onMouseUp={stopContinuousChange}
              onMouseLeave={stopContinuousChange}
            ></a-image>
          </a-entity>
        ))}
      </a-entity>

      {/* Controls for adjusting scale */}
      <a-entity position="38 10 6" scale="1.4 1.4 1.4"  rotation="0 -90 0">
        <a-text value="Scale Controls" position="1 2 0" align="center" color="#FFF"></a-text>
        {['X', 'Y', 'Z'].map((axis, index) => (
          <a-entity key={axis} position={`0 ${1.5 - index * 0.5} 0`}>
            <a-text value={`${axis}: ${scl[index].toFixed(2)}`} align="center" position="1 0 0" color="#FFF"></a-text>
            <a-image
              src={arrow}
              width="0.5"
              height="0.5"
              position="0.5 0 0"
              class="clickable"
              rotation="0 0 180"
              onMouseDown={() => startContinuousChange(handleScaleChange, index, -0.1)}
              onMouseUp={stopContinuousChange}
              onMouseLeave={stopContinuousChange}
            ></a-image>
            <a-image
              src={arrow}
              width="0.5"
              height="0.5"
              position="1.5 0 0"
              class="clickable"
              onMouseDown={() => startContinuousChange(handleScaleChange, index, 0.1)}
              onMouseUp={stopContinuousChange}
              onMouseLeave={stopContinuousChange}
            ></a-image>
          </a-entity>
        ))}
      </a-entity>

      {/* Finish Button */}
      <a-entity position="38 9.5 4" scale="1.4 1.4 1.4"  rotation="0 -90 0">
        <a-image
          src={finished}
          width="0.5"
          height="0.5"
          position="0 0 0"
          class="clickable"
          onClick={handleFinish}
        ></a-image>
        <a-text
          value="Finish"
          align="center"
          position="0.5 0 0"
          color="#FFF"
          class="clickable"
          onClick={handleFinish}
        ></a-text>
      </a-entity>
    </>
  );
}

export default AssetViewer;
