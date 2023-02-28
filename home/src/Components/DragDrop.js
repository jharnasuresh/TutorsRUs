import { useRef, useState } from "react";
import './dragdrop.css'

const DragDrop = () => {

    const [files, setFiles] = useState(null)
    const inputRef = useRef();

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleDrop = (event) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("Files", files);
        console.log(formData.getAll("Files"))
        const headers = { 'Content-Type': 'multipart/form-data'};

        async function getResponse() {
            const response = await fetch('http://localhost:3001/parse', {method: "POST", body: formData, headers: headers});
            var r = await response.json();
  
          }
      
          getResponse();
      
          return;

       
      };

    if (files) return (
        <div className="uploads">
            <ul>
                {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li> )}
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
                <h1>Or</h1>
                <input type="file" multiple onChange={(event) => {setFiles(event.target.files)}} hidden ref={inputRef}/>
                <button onClick={() => inputRef.current.click()}>Select Files</button>
            </div>
            
            )}
        </>
    )

}

export default DragDrop;