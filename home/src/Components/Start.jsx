import React, { useState, useEffect } from "react"
import { useHref, useNavigate, useLocation } from "react-router-dom";
import { Login } from "../Login";
import { Register } from "../Register";
import { Verification } from "../Verification"
import Profile from "./Profile"
import "./styles.css"
import Tabs from "./Tabs";
import Calendar from "./Calendar";
import Scheduling from "./Scheduling";
import GoogleEventComponent from "./GoogleComponent";
import { signInToGoogle, initClient,getSignedInUserEmail, signOutFromGoogle , publishTheCalenderEvent } from './Scheduling';
export const Start = ({GlobalState}) => {
  const location = useLocation();
  
  const { currUser, setCurrUser } = GlobalState;
  setCurrUser(location.state.u)
  console.log(currUser)

  if (currUser === "") {
    setCurrUser(location.state.u)
  }


  console.log("lll " + location.state.u)


  
    const handleSubmit = (e) => {
        e.preventDefault();
    
        
    }

  

    return (
      <div>
      <>
      <a href='https://calendar.google.com/calendar/u/0/r'><button>Link To your Calendar!</button>
      </a>
      <GoogleEventComponent/>
      </>
      <Calendar />
      </div>
    )

}