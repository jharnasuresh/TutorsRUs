import React, { useState } from "react"
import { useHref, useNavigate, useLocation } from "react-router-dom";
import { Login } from "../Login";
import { Register } from "../Register";
import { Verification } from "../Verification"
import Profile from "./Profile"
import "./styles.css"
import Tabs from "./Tabs";
import Calendar from "./Calendar";
export const Start = ({GlobalState}) => {
  const location = useLocation();
  
  const { currUser, setCurrUser } = GlobalState;
  console.log(currUser)

  if (currUser === "") {
    setCurrUser(location.state.u)
  }


  console.log("lll " + location.state.u)


  
    const handleSubmit = (e) => {
        e.preventDefault();
    
        
    }

    return (

      <a href='https://calendar.google.com/calendar/u/0/r'><button>Link To your Calendar!</button>
        <Calendar />
      </a>

    )

}