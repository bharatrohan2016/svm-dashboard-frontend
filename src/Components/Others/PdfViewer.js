import React from 'react';
import { Document, Page } from 'react-pdf';

function PdfViewer({ pdfUrl }) {
  return (
    <Document file={pdfUrl}>
      <Page pageNumber={1} />
    </Document>
  );
}

export default PdfViewer;