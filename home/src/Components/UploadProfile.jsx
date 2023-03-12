import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './DragDrop'
import DragDrop from "./DragDrop";
import App from '../App';
export const UploadProfile = ({GlobalState}) => {
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
        <DragDrop user={currUser}/>
        {}
    </div>


)

}

