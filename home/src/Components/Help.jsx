import React, {useState} from "react"
import { useHref, useNavigate, useLocation } from "react-router-dom";

import {Login} from "../Login";
import {Register} from "../Register";
import {Verification} from "../Verification"
import Profile from "./Profile"
import "./styles.css"
import Tabs from "./Tabs";
export const Help = (props) => {
const location = useLocation();
  console.log("here?? " + location.state.u)

  
    const handleSubmit = (e) => {
        e.preventDefault();
    
        
    }

    return (

        
        <div classNames = "">
            <Tabs/>
         <a> HEKFHlsj </a>
        </div>
        
       

    )
    
}