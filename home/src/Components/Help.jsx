import React, {useState} from "react"
import { useHref, useNavigate, useLocation } from "react-router-dom";

import {Login} from "../Login";
import {Register} from "../Register";
import {Verification} from "../Verification"
import Profile from "./Profile"
import "./Help.css"
import Tabs from "./Tabs";
export const Help = ({GlobalState}) => {
const location = useLocation();


  
    const handleSubmit = (e) => {
        e.preventDefault();
    
        
    }

    return (

        
        <div classNames = "">
            <img class="imgHelp" src = "/Images/Help1.png"/>
            <br></br>
            <img class="imgHelp" src = "/Images/Help2.png"/>
        </div>
        
       

    )
    
}