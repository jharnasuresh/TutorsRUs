import { useRef, useState } from "react";
import './dragdrop.css'
import { Link, useLocation, useNavigate } from "react-router-dom";






const DragDrop = (props) => {

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
            let formData = new FormData()
            formData.append('file', files[0])
            formData.append("user", props.user)
            console.log([...formData])
            
            fetch('http://localhost:3001/parse', { method: 'POST', body: formData})
            .then((res) => res.json())
            .then((res) => {
                console.log("verified! " + res["tutor"])
            navigate("/Profile", {
            
                state: {
                    u: res.u,
                    fname: res["fname"],
                    lname: res["lname"], 
                    email: res["email"], 
                    active: res["active"],
                    lang: res["lang"],
                    taking: res["taking"],
                    profpic: res["profpic"],
                    followers: res["followers"],
                    following: res["following"],
                    tutor: res["tutor"],
                    price: res["price"],
                    taken: res["taken"],
                    studentRating: res["studentRating"],
                    tutorRating: res["tutorRating"]
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
            {!files && (
                <div className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <h1>Drag and drop files to upload</h1>
                    <h1>or</h1>
                    <input type="file" multiple onChange={(event) => { setFiles(event.target.files) }} hidden ref={inputRef} />
                    <button onClick={() => inputRef.current.click()}>Select Files</button>
                </div>

            )}
        </>
    )

}

export default DragDrop;