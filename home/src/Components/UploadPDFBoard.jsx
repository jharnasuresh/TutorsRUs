import { useRef, useState } from "react";
import './dragdrop.css'
import './Board.css'
import { Link, useLocation, useNavigate } from "react-router-dom";






export const UploadPDFBoard = () => {

    const [files, setFiles] = useState(null)
    const inputRef = useRef();
    const FormData = require('form-data');
    const navigate = useNavigate();
    const location = useLocation();

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleDrop = (event) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)
    };

    const handleUpload = () => {

        async function getResponse() {
            console.log("uplodinggg")
            let formData = new FormData()
            formData.append('file', files[0])
            formData.append("user", location.state.user)
            formData.append("board", location.state.board)
            formData.append("link", true)

            console.log([...formData])
            
            fetch('http://localhost:3001/uploadpdfboard', { method: 'POST', body: formData})
            .then((res) => res.json())
            .then((res) => {
                console.log("verified! " + res["tutor"])
            navigate("/Start", {
            
                state: {
                    u: res.u
                }
            });
        })

                    
            }

        

        getResponse();

        return;


    };

    if (files) return (
        <div className="uploads">
            <ul>
                {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
            </ul>
            <div className="actions">
                <button onClick={() => setFiles(null)}>Cancel</button>
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    )

    return (
        <>
        <div className="App">
            {!files && (
                <div className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <h1>Drag and drop files to upload</h1>
                    <h1>or</h1>
                    <input type="file" multiple onChange={(event) => { setFiles(event.target.files) }} hidden ref={inputRef} />
                    <button onClick={() => inputRef.current.click()}>Select Files</button>
                </div>

            )}
            </div>
        </>
    )

}

export default UploadPDFBoard;