import React, { useState } from "react"
import { useHref, useNavigate, useLocation } from "react-router-dom";
import { Login } from "../Login";
import { Register } from "../Register";
import { Verification } from "../Verification"
import Profile from "./Profile"
import "./styles.css"
import Tabs from "./Tabs";
export const Start = ({GlobalState}) => {
  const location = useLocation();
  

  const { currUser, setCurrUser } = GlobalState;
  console.log(currUser)


  console.log("lll " + location.state.u)


  
    const handleSubmit = (e) => {
        e.preventDefault();
    
        
    }

    return (

        
        <div classNames = "nav">

        </div>
        
       

    )

}