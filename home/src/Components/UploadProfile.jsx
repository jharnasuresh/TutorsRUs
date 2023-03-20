
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import './Main.css'

import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
/*import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
*/
export const UploadProfile = ({GlobalState}) => {

const { currUser, setCurrUser } = GlobalState;
  const [image, setImage] = useState(null);
  //const [url, setUrl] = useState(null);
  const location = useLocation();
  var url = null;

  const previewFile = () => {
    console.log("in previewFile");
    const allImages = document.querySelectorAll("img");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();
    var counter = 0;
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        allImages.forEach((image) => {
          if (counter == 1) {

            const preview = image;
            preview.src = reader.result;
            console.log("in the second image");
            console.log(reader.result);
            url = reader.result;
            console.log("jharna here is the url: ", url)
            uploadPFPtoDB();
          }
          counter++;
        });
        
      },
      false
    );
  
    if (file) {
      console.log("in the if file")
      reader.readAsDataURL(file);
    }
    else {
      console.log("Please upload an image")
    }

  }

  function uploadPFPtoDB() {
      
    
      console.log("june here's pfp url", url);
      const requestData = JSON.stringify({ "username": location.state.u, "pfpurl": url});
      console.log("june here's your username: " + location.state.u)
      const headers = { "content-type": "application/json" };
      async function getResponse() {
        const response = await fetch('http://localhost:3001/pfpupload', { method: 'POST', body: requestData, headers: headers });
        var r = await response.json();
      }
      console.log("going to upload profile")
      getResponse(); 
      console.log("look prof pick uploaded")
  }

  return (
    <div className="App">
      {/*<Avatar src={url} sx={{ width: 150, height: 150 }} />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit</button>
      <button className='submit'>
        <Link to="/Settings" state={{ user: location.state.u, active: location.state.active, taking: location.state.taking, taken: location.state.taken, tutor: location.state.tutor }}>Back</Link>
    </button>
  */}
    <input type="file" onChange={previewFile} /><br />
    <img src="" height="200" alt="Image preview" /> 
    </div>
  );
}


