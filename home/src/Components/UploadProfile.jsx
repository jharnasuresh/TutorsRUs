
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import './Main.css'
import { FileUploader } from "react-drag-drop-files";

import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
/*import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
*/
export const UploadProfile = ({GlobalState}) => {

  const fileTypes = ["JPG", "PNG", "GIF"];
const { currUser, setCurrUser } = GlobalState;
  const [image, setImage] = useState(null);
  //const [url, setUrl] = useState(null);
  const [newPFP, setNewPFP] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  var urlPFP = null;

  const handleChange = (file) => {
    console.log("helllloooooo in handle change");
    //console.log(file);
    const allImages = document.querySelectorAll("img");
    const reader = new FileReader();
    var counter = 0;
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        allImages.forEach((image) => {
          if (counter === 1) {

            const preview = image;
            preview.src = reader.result;
            console.log("2in the second image2");
            //console.log(reader.result);
            urlPFP = reader.result;
            //console.log("2jharna here is the url:2 ", url)
            setNewPFP(true);
            uploadPFPtoDB();
          }
          counter++;
        });
        
      },
      false
    );
  
    if (file) {
      console.log("in the if file")
      console.log(file);
      reader.readAsDataURL(file);
    }
    else {
      console.log("Please upload an image")
    }

  };
  

  function uploadPFPtoDB() {
      
    
      //console.log("june here's pfp url", url);
      const requestData = JSON.stringify({ "username": location.state.u, "pfpurl": urlPFP});
      console.log("june here's your username: " + location.state.u)
      const headers = { "content-type": "application/json" };
 
      console.log("going to upload profile")
      console.log("look prof pick uploaded")
        fetch('http://localhost:3001/pfpupload', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
            console.log("resfname", res["fname"])
            navigate("/Profile", {

                state: {
                    u: res.u,
                    fname: res["fname"],
                    lname: res["lname"],
                    email: res["email"],
                    active: res["active"],
                    lang: res["lang"],
                    taking: res["taking"],
                    followers: res["followers"],
                    following: res["following"],
                    tutor: res["tutor"],
                    profpic: res["profpic"],
                    price: res["price"],
                    taken: res["taken"],
                    studentRating: res["studentRating"],
                    tutorRating: res["tutorRating"]
                }
            });
        })

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
   {/* <input type="file" onChange={previewFile} /><br />
     <img src="" height="200" alt="Image preview" />   
    <Avatar src={location.state.profpic} alt="Image preview" sx={{ width: 300, height: 300 }} />*/}
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    <img src="" height="200" alt="Image preview" />  
   {/*<div className="container">
          <div className="drop-container" 
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
          >
          

            <div className="drop-message">
              <div className="upload-icon"></div>
              Drag & Drop files here or click to upload
            </div>
          </div>
        </div>*/}
    </div>

    
  );
  }
