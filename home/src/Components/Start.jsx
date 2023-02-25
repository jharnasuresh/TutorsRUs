import React, {useState} from "react"
import { useHref, useNavigate } from "react-router-dom";

import {Login} from "../Login";
import {Register} from "../Register";
import {Verification} from "../Verification"
import Profile from "./Profile"
import "./styles.css"
import Tabs from "./Tabs";
export const Start = (props) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        
    }

    return (
      /*
        
        <div classNames = "nav">
        {
        
        //ternary operator if currentForm = login then return login screen else display register page
        //currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> 
        : currentForm === "profile" ? <Profile onFormSwitch={toggleForm}/>
        : currentForm === "start" ? <Start onFormSwitch={toggleForm}/>
        : currentForm === "verify" ? <Verification onFormSwitch={toggleForm}/>

        : <Register onFormSwitch={toggleForm}/>
      }
      */
        <Tabs/>

        
       

        //</div>
    )
    
}