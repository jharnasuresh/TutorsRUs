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

    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)

    if (currUser === "") {
        setCurrUser(location.state.u)
    }

    return (

        
        <div classNames = "App">
             <div style={{padding: "20px", fontFamily: "Bowlby One", color: "rgb(96, 44, 145)"}}>
                        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                        <h1>Need Help Navigating?</h1>
            </div>
            <img class="imgHelp" src = "/Images/Help1.png"/>
            <br></br>
            <img class="imgHelp" src = "/Images/Help2.png"/>
        </div>
        
       

    )
    
}