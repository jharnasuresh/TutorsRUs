import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './DragDrop'
import DragDrop from "./DragDrop";
import App from '../App';
export const Transcript = ({GlobalState}) => {
    const { currUser, setCurrUser } = GlobalState;

    const location = useLocation();
    if (currUser === "") {
        setCurrUser(location.state.u)
      }

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
    <div className="App">
        <h1 style={{width: '1000px'}}>*After uploading your transcript and becoming a tutor, you must create a Calendly account using the same username as your TutorsRUs account!</h1>
        <h2> In order to receive payment you must go to the settings page to update your preferences</h2>


        <br/>
        <DragDrop user={currUser}/>
    
        {/*
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
*/}
    </div>


)

}

