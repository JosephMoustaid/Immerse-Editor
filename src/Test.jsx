import React from 'react';
import PdfViewer from './PdfViewer';
import pdf from "./assets/PDFs/rapport.pdf";

const Test = () => {
  return (
    <a-scene>
      <a-camera>
        <a-cursor color="#FF0000"></a-cursor>
      </a-camera>
      <PdfViewer pdf={pdf}/>
    </a-scene>
  );
};

export default Test;
