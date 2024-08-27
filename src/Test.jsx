import React from 'react';
import PdfViewer from './PdfViewer';
import pdf from "./assets/PDFs/rapport.pdf";
import AnnotationsMaker from './Annotations/AnnotationsMaker.jsx';
import arduino from "./assets/3D_Components/arduino_uno.glb";

const Test = () => {
  return (
    <>
      <AnnotationsMaker modelUrl={arduino}/>
    </>
  );
};

export default Test;
