
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import './Main.css'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FileUploader } from "react-drag-drop-files";

import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
export const EditPFP = ({GlobalState}) => {

    const fileTypes = ["JPG", "PNG", "GIF"];
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);

    const [newPFP, setNewPFP] = useState(false)
    const location = useLocation();
    var urlPFP = null;
    const navigate = useNavigate();
    
    const selectImage = (file) => {
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
                  setSrc(urlPFP);
                  setImage(urlPFP)
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
              /*navigate("/Profile", {
  
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
                      taken: res["taken"]
                  }
              });*/
          })
  
    }

    const cropImageNow = () => {
      const canvas = document.createElement('canvas');
      console.log(image);
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
    
      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';
    
      ctx.drawImage(
        urlPFP,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      );
        
      // Converting to base64
      const base64Image = canvas.toDataURL('image/jpeg');
      setOutput(base64Image);
    };
    
    return (
      <div className="App">
        <center>
       <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            console.log("jharna suresh")
            selectImage(e.target.files[0]);
          }}
        />

    <Avatar src={location.state.profpic} alt="Image preview" sx={{ width: 300, height: 300 }} />
    <img src={location.state.profpic} height="200" alt="Image preview" />  
          <br />
          <br />
          <div>
            {src && (
              <div>
                <ReactCrop src={src} onImageLoaded={setImage}
                  crop={crop} onChange={setCrop} />
                <br />
                <button onClick={cropImageNow}>Crop</button>
                <br />
                <br />
              </div>
            )}
          </div>
          <div>{output && <img src={output} />}</div>
        </center>
      </div>
    );
  }