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
import { DrawerNew } from './Components/DrawerNew';
import { Transcript } from './Components/Transcript';
import 'bootstrap/dist/css/bootstrap.css'
import DragDrop from './Components/DragDrop';


function App() {

  const [currUser, setCurrUser] = useState("");

  if (currUser === undefined) {
    setCurrUser('');
  }
     
  console.log("setting??" + currUser)

  const GlobalState = { currUser, setCurrUser}

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
        <Route path="*" element={<Login />} />
    </Routes>
    </div>
   

  );
     
}

export default App;