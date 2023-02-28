import React from "react";
import {useState} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import  DrawerNew  from './DrawerNew';

import DragDrop from "./DragDrop";

export const Tabs = ({GlobalState}) => {
    const [currentForm, setCurrentForm] = useState('start');
    const location = useLocation();
    const navigate = useNavigate();
    const { currUser, setCurrUser } = GlobalState;
    console.log("tabs " + currUser)
  const backToProfile = (e) => {

    e.preventDefault();
    console.log("tabs2 " + currUser)
    const headers = { "content-type": "application/json" };
    const requestData = JSON.stringify({ "username":  currUser});

    fetch('http://localhost:3001/info', { method: 'POST', body: requestData, headers: headers })
    .then((res) => res.json())
    .then((res) => {
        console.log("aaaa? " + res["active"])
        navigate("/Profile", {
        
            state: {
                u: res.u,
                fname: res["fname"],
                lname: res["lname"], 
                email: res["email"], 
                active: res["active"]
            }
        });
    })
          
}
 
    return (
        <div>
            <nav>
                <div className="img"><img class="img" src = "/Images/TutorsRUs_nobackground.png"/></div>
                <ul className="nav-links">
                    <li>
                        {/*<a href="./Start" state={{GlobalState: {GlobalState}, u: {currUser}}} > Home </a>*/}
                        <a href="./Start" onClick={() => navigate('/Start', {state: {u: currUser}})} > Home </a>

                    </li>
                    <li>

                        <a href="./Profile" onClick={backToProfile}>Profile</a>

                    </li>
                    <li>
                        <a href="./Login">Log Out</a>
                    </li>
                    <li>
                        <a href="./Profile" onClick={() => navigate('/Profile', {state: {u: currUser}})}>Help</a>
                    </li>
                    <li>
                        <a href="./Transcript" onClick={() => navigate('/Transcript', {state: {u: currUser}})}>Transcript</a>
                    </li>
                </ul>
                {/*<DrawerNew/>*/}
                
               
            </nav>
        </div>
    )
}
export default Tabs;