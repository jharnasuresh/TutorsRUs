import Avatar from "@mui/material/Avatar";
import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FileUploader } from "react-drag-drop-files";

import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
import { PreviewRounded } from "@mui/icons-material";
export const EditPFP = ({GlobalState}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });



  const fileTypes = ["JPG", "PNG", "GIF"];
  const { currUser, setCurrUser } = GlobalState;
    const [image, setImage] = useState(null);
    //const [url, setUrl] = useState(null);
    const [newPFP, setNewPFP] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    var urlPFP = null;

  const onSelectFile = (file) => {
    console.log("EDITPFP: onSelectFile")
    const allImages = document.querySelectorAll("img");
    console.log("allImages dec")
    const reader = new FileReader();
    console.log("reader init")
    var counter = 0;
    var preview;
    console.log("before event listener")
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        console.log("before foreach");
        counter = 0;
        allImages.forEach((image) => {
          if (counter === 1) {
            console.log("in if");
            preview = image;
            console.log("set preview as image");
            preview.src = reader.result;
            console.log("set reader.result");
            //console.log(reader.result);
            urlPFP = reader.result;
            console.log("set urlPFP")
            //setImageSrc(reader.result)
            //console.log("2jharna here is the url:2 ", url)
            setNewPFP(true);
            console.log("before upload")
            uploadPFPtoDB();
          }
          else if (counter == 2) {
            preview = image;
            preview.src = reader.result;
            setImageSrc(image);
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

  const onImageLoaded = (image) => {
    setCrop({ unit: '%', width: 30, aspect: 1 / 1, height: image.naturalHeight / 3 });
  };

  const onCropComplete = useCallback((crop) => {
    makeClientCrop(crop);
  }, []);

  

  const makeClientCrop = async (crop) => {
    if (imageSrc && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imageSrc, crop);
      const img = new Image();
      img.src = croppedImageUrl;
      img.onload = () => {
        // Set the cropped image as the source of an image element
        const preview = document.getElementById('cropped-image-preview');
        preview.src = croppedImageUrl;
      };
      console.log(croppedImageUrl);
      // You can upload the cropped image here
    }
  };

  const getCroppedImg = (imageSrc, crop) => {
    return new Promise((resolve, reject) => {
      var image = document.getElementById('cropped-image-preview');
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
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
          
      })

}

  return (
    <div>
      <Avatar src={location.state.profpic} alt="Image preview" sx={{ width: 300, height: 300 }} />
    
      <FileUploader handleChange={onSelectFile} name="file" types={fileTypes} />
    {imageSrc && (
      <ReactCrop
        src={imageSrc}
        crop={crop}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        onChange={(c) => setCrop(c)}
      />
    )}
    {imageSrc && (
      console.log("JUNE ITS TRYING TO CROP"),
      <img src="" height="200" alt="Image preview" />,
      <button onClick={() => makeClientCrop(crop)}>Crop Image</button>
    )}

    {/*<img id="cropped-image-preview" alt="Cropped Image Preview" />*/}
  </div>
  );
};