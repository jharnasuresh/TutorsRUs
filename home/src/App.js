import React, { useState } from 'react';
import './App.css';
import {Login} from "./Login";
import {Register} from "./Register";
import {Verification} from "./Verification"
import {Start} from "./Components/Start"
import { Routes, Route, Link, Router } from "react-router-dom";
import {RouterProvider, createBrowserRouter, useNavigate} from "react-router-dom";
import {Settings} from "./Components/Settings"
import Tabs from "./Components/Tabs";


function App() {


  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
return (
    <div>  
    <Routes>

        <Route exact path="/Login" element={< Login />} /> 
        <Route exact path="/Start" element={< Start />} /> 
        <Route exact path="/Register" element={< Register />} /> 
        <Route exact path="/Verification" element={< Verification />} /> 
        <Route exact path="/Profile" element={< Profile />} /> 
        <Route path="*" element={<Login />} />
    </Routes>
    </div>
   

  );
      {/*
        
        //ternary operator if currentForm = login then return login screen else display register page
        //currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> 
        : currentForm === "profile" ? <Profile onFormSwitch={toggleForm}/>
        : currentForm === "start" ? <Start onFormSwitch={toggleForm}/>
        : currentForm === "verify" ? <Verification onFormSwitch={toggleForm}/>
        : currentForm === "settings" ? <Settings onFormSwitch={toggleForm}/>

        : <Register onFormSwitch={toggleForm}/>
  }*/
}
}

export default App;