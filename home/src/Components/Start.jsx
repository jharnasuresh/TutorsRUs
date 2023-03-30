import React, { useState, useEffect } from "react"

import { useHref, useNavigate, useLocation } from "react-router-dom";
import { Login } from "../Login";
import { Register } from "../Register";
import { Verification } from "../Verification"
import Profile from "./Profile"
import "./styles.css"

import AutologoutWarning from './AutologoutWarning'
import Tabs from "./Tabs";
import Calendar from "./Calendar";
import Scheduling from "./Scheduling";
import GoogleEventComponent from "./GoogleComponent";
import { signInToGoogle, initClient,getSignedInUserEmail, signOutFromGoogle , publishTheCalenderEvent } from './Scheduling';
import Calendly from './Calendly';
export const Start = ({GlobalState}) => {
  const location = useLocation();
  const navigate = useNavigate();
  var warningPOP = false;
  const { currUser, setCurrUser } = GlobalState;
  setCurrUser(location.state.u)
  console.log(currUser)
  var counter = 0;
  if (currUser === "") {
    setCurrUser(location.state.u)
  }


  console.log("lll " + location.state.u)

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");
    const warningTime = localStorage.getItem("warningTime");

    if (expireTime < Date.now()) {
        console.log("Log out!")


      navigate("/Login", {
         tutor: location.state.tutor
      });
    }

    if (warningTime < Date.now() && counter == 0) {
      console.log("Warning!")
      warningPOP = true;
      alert("10 seconds before you logout!");
      counter++;
      
      
  }
  }

  const updateExpireTime = () => {
    const expireTime = Date.now() + 12000;
    const warningTime = Date.now() + 2000;
    localStorage.setItem("expireTime", expireTime);
    localStorage.setItem("warningTime", warningTime);
  }

  useEffect(() => {
    const interval = setInterval(() => {
        checkForInactivity();
    }, 12000)

    return () => clearInterval(interval);
  },[]);


  useEffect(() => {
    const interval = setInterval(() => {
        checkForInactivity();
    }, 2000)

  },[]);

  useEffect(() => {
    updateExpireTime();

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);


    return () => {
        window.addEventListener("click", updateExpireTime);
        window.addEventListener("keypress", updateExpireTime);
        window.addEventListener("scroll", updateExpireTime);
        window.addEventListener("mousemove", updateExpireTime); 
    }
  }, []);

  
    const handleSubmit = (e) => {
        e.preventDefault();
    
        
    }

  

    return (

    <div>
      <Calendly/>
      <a href='https://calendar.google.com/calendar/u/0/r'><button>Link To your Calendar!</button>
      </a>
      
      <Calendar />

         
      </div>

      
    )

}