import React, { useState } from "react"
import { useHref, useNavigate, useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf'




import "./Help.css"
import Tabs from "./Tabs";
const ViewPDF = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const location = useLocation();
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


    const pdfContentType = 'application/pdf';

    const base64toBlob = (data) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data.substr(`data:${pdfContentType};base64,`.length);

        const bytes = window.atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);

        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }

        return new Blob([out], { type: pdfContentType });
    };

    const url = URL.createObjectURL(base64toBlob(location.state.pdf));

    console.log(url)
    console.log(new String(location.state.pdf) instanceof String)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Document file={location.state.pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} renderTextLayer={false}/>
            </Document>
           



        </div>
    );

};

export default ViewPDF;