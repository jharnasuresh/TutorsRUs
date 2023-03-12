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
        console.log("june? " + res["followers"])
        navigate("/Profile", {
        
            state: {
                u: res.u,
                fname: res["fname"],
                lname: res["lname"], 
                email: res["email"], 
                followers: res["followers"],
                following: res["following"],
                active: res["active"],
                lang: res["lang"],
                taking: res["taking"],
                followers: res["followers"],
                following: res["following"],
                tutor: res["tutor"]
            }
        });
    })
          
}
    var tut = (location.state.tutor) ? "tut"  : "kjd";
    return (
        <div>
            <nav>
                <div className="img"><img class="img" src = "/Images/IMG_4596.png"/></div>
                {tut === 'tut' &&
                    <div className="img2"><img class="img" src = "/Images/verifiedtut.png"/></div>
                }
                <ul className="nav-links">
                    <li>
                        {/*<a href="./Start" state={{GlobalState: {GlobalState}, u: {currUser}}} > Home </a>*/}
                        <a href="./Start" onClick={() => navigate('/Start', {state: {u: currUser}})} > Home </a>

                    </li>
                    <li>

                        <a href="./Profile" onClick={backToProfile}>Profile</a>

                    </li>
                    <li>
                        <a href="./Login" onClick={() => navigate('/Login', {tutor: location.state.tutor})}>Log Out</a>
                    </li>
                    <li>
                        <a href="./Help" onClick={() => navigate('/Help', {state: {u: currUser}})}>Help</a>

                    </li>

                </ul>
                <DrawerNew/>
                
               
            </nav>
        </div>
    )
}
export default Tabs;