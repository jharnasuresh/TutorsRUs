import React, { useState } from "react"
import { useHref, useNavigate, useLocation } from "react-router-dom";
import { Login } from "../Login";
import { Register } from "../Register";
import { Verification } from "../Verification"
import Profile from "./Profile"
import "./styles.css"
import Tabs from "./Tabs";
export const Start = (props) => {
  const location = useLocation();
  console.log("here?? " + location.state.u)


  const handleSubmit = (e) => {
    e.preventDefault();


  }

  return (


    <div classNames="nav">


    </div>



  )


}