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

        async function getResponse() { //This works fine, base64 string is correct
            console.log("uplodinggg")
            //let formData = new FormData()
            var file = files[0]
            console.log(file instanceof File)
            var url = URL.createObjectURL(file)
            var str;
            //file.src = url
            console.log(files[0])
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                // Use a regex to remove data url part
                console.log(reader.result)
                const base64String = reader.result
                /*
                    .replace('data:', '')
                    .replace(/^.+,/, '');
    */
                //console.log(base64String);
                str = base64String
                //console.log("str " + str)

            const headers = { "content-type": "application/json" };
            const requestData = JSON.stringify({ user: location.state.user, board: location.state.board, link: false, text: str, anon: false, pdf: true})
            
            fetch('http://localhost:3001/addpost', { method: 'POST', body: requestData, headers: headers})
            .then((res) => res.json())
            .then((res) => {
                //console.log("verified! " + res["tutor"])
            navigate("/Login");
            })
                // Logs wL2dvYWwgbW9yZ...
            };
            
            /*
            formData.append('file', files[0])
            formData.append("user", location.state.user)
            formData.append("board", location.state.board)
            formData.append("link", true)
*/
            //console.log([...formData])

            

                    
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