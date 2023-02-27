import React, { useState } from "react";
import './DragDrop'
import DragDrop from "./DragDrop";

export const Transcript = () => {

    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState("");
    const [viewPdf, setViewPdf] = useState(null);

    const fileType = ['application/pdf'];
    const handlePdfFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                    setPdfFileError('');
                }
            }
            else {
                setPdfFile(null);
                setPdfFileError('Please select valid pdf file');
            }
        } else {
            console.log("Please select your file")
        }
    }

    const handlePdfFileSubmit=(e)=>{
        e.preventDefault();
        // TODO
        console.log("here!!!")
      }


return (
    <>
        <DragDrop />
        <div className="container">
        <form className="form-group" onSubmit={handlePdfFileSubmit}>
            <input type='file' className='form-control'
                required onChange={handlePdfFileChange} />
            {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
            <br></br>
            <button type="submit" className="btn btn-success btn-lg" onSubmit={handlePdfFileSubmit}>
                UPLOAD
            </button>
        </form>
    </div>
    </>

)

}

