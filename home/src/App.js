import React, { useState } from 'react';
import './App.css';
import {Login} from "./Login";
import {Register} from "./Register";
import {Verification} from "./Verification"
import {Start} from "./Components/Start"
import {PassSecQ} from "./Components/PassSecQ"
import {ResetPass} from "./Components/ResetPass"
import { Routes, Route, Link, Router } from "react-router-dom";
import {RouterProvider, createBrowserRouter, useNavigate} from "react-router-dom";
import {Settings} from "./Components/Settings"
import Tabs from "./Components/Tabs";
import Profile from './Components/Profile';
import SecurePassReset  from './Components/SecurePassReset';
import  DrawerNew  from './Components/DrawerNew';
import { EditPFP } from './Components/EditPFP';
import { Transcript } from './Components/Transcript';
import { UploadProfile} from './Components/UploadProfile';
import DragDrop from './Components/DragDrop';
import {Help} from './Components/Help';
import EditCourse from './Components/EditCourse';
import NotYourProfile from './Components/NotYourProfile';
import EditCourseTutor from './Components/EditCourseTutor';
import TutorEdit  from './Components/tutorEdit';
import Search from './Components/Search';
import Table from './Components/Table'
import { Rating } from './Components/Rating';

import Discussion from './Components/Discussion'
function App() {

  const [currUser, setCurrUser] = useState("");

  if (currUser === undefined) {
    setCurrUser('');
  }
     
  console.log("setting??" + currUser)

  const GlobalState = { currUser, setCurrUser}
  const [buttonPopup, setButtonPopup] = useState(false);
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
return (
    <div>  
    <Tabs GlobalState={GlobalState}/>
    
                 
    <Routes>

        <Route exact path="/Login" element={< Login GlobalState={GlobalState}/>} /> 
        <Route exact path="/Start" element={< Start GlobalState={GlobalState}/>} /> 
        <Route exact path="/Register" element={< Register GlobalState={GlobalState}/>} /> 
        <Route exact path="/Verification" element={< Verification GlobalState={GlobalState}/>} /> 
        <Route exact path="/Profile" element={< Profile GlobalState={GlobalState}/>} /> 
        <Route exact path="/PassSecQ" element={< PassSecQ />} /> 
        <Route exact path="/Settings" element={< Settings GlobalState={GlobalState}/>} />
        <Route exact path="/Transcript" element={< Transcript GlobalState={GlobalState}/>} />
        <Route exact path="/ResetPass" element={< ResetPass />} />
        <Route exact path="/SecurePassReset" element={< SecurePassReset />} />
        <Route exact path="/Help" element={< Help GlobalState={GlobalState}/>} /> 
        <Route exact path="/EditCourse" element={< EditCourse GlobalState={GlobalState}/>} /> 
        <Route exact path="/EditCourseTutor" element={< EditCourseTutor GlobalState={GlobalState}/>} /> 
        <Route exact path="/tutorEdit" element={< TutorEdit GlobalState={GlobalState}/>} /> 
        <Route exact path="/NotYourProfile" element={< NotYourProfile GlobalState={GlobalState}/>} /> 
        <Route exact path="/UploadProfile" element={< UploadProfile GlobalState={GlobalState}/>} /> 
        <Route exact path="/Search" element={< Search GlobalState={GlobalState}/>} /> 
        <Route exact path="/EditPFP" element={< EditPFP GlobalState={GlobalState}/>} /> 
        <Route exact path="/Rating" element={< Rating GlobalState={GlobalState}/>} /> 
        <Route exact path="/Discussion" element={<Discussion GlobalState={GlobalState}/>}/>
        <Route path="*" element={<Login />} />
        
    </Routes>
    </div>
   

  );
     
}

export default App;