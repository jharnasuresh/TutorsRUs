import React from "react";
import {useEffect, useState} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import  DrawerNew  from './DrawerNew';
import './styles.css'
import DragDrop from "./DragDrop";

export const Tabs = ({GlobalState}) => {
    const [currentForm, setCurrentForm] = useState('start');
    const location = useLocation();
    const navigate = useNavigate();
    const { currUser, setCurrUser } = GlobalState;
    const [buttonPopup, setButtonPopup] = useState(false);
    const[loggedIn, setLoggedIn] = useState(true);
    console.log("tabs " + currUser)



  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    if (expireTime < Date.now()) {
        console.log("Lig out!")
        setLoggedIn(false);
    }
  }

  const updateExpireTime = () => {
    const expireTime = Date.now() + 5000;

    localStorage.setItem("expireTime", expireTime);
  }

  useEffect(() => {
    const interval = setInterval(() => {
        checkForInactivity();
    }, 5000)

    return () => clearInterval(interval);
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
                profpic: res["profpic"],
                taking: res["taking"],
                taken: res["taken"],
                followers: res["followers"],
                following: res["following"],
                tutor: res["tutor"],
                price: res["price"]
            }
        });
    })
          
}

const toSettings = (e) => {

    e.preventDefault();
    console.log("tabs2settings " + currUser)
    const headers = { "content-type": "application/json" };
    const requestData = JSON.stringify({ "username":  currUser});

    fetch('http://localhost:3001/info', { method: 'POST', body: requestData, headers: headers })
    .then((res) => res.json())
    .then((res) => {
        console.log("aaaa? " + res["active"])
        console.log("june? " + res["tutor"])
        navigate("/Settings", {
        
            state: {
                u: res.u,
                fname: res["fname"],
                lname: res["lname"], 
                email: res["email"], 
                followers: res["followers"],
                following: res["following"],
                active: res["active"],
                lang: res["lang"],
                profpic: res["profpic"],
                taking: res["taking"],
                taken: res["taken"],
                followers: res["followers"],
                following: res["following"],
                tutor: res["tutor"],
                price: res["price"]
            }
        });
    })
          
}

    function options() {
        <select>
                   
                            <option value="fruit">Fruit</option>
                   
                            <option value="vegetable">Vegetable</option>
                   
                            <option value="meat">Meat</option>
                   
                          </select>
    }
    return (
        <div>
            <nav>
                        
                
                <div className="img"><img class="img" src = "/Images/IMG_4596.png"/></div>
                
                <ul className="nav-links">
                    
                    <li>
                        {/*<a href="./Start" state={{GlobalState: {GlobalState}, u: {currUser}}} > Home </a>*/}
                        <a href="./Start" onClick={() => navigate('/Start', {state: {u: currUser}})} > <i class="fa-solid fa-home"></i> </a>

                    </li>
                    <li>

                        <a href="./Profile" onClick={backToProfile}><i class="fa-solid fa-user"></i></a>

                    </li>
                    <li>
                        <a href="./Help" onClick={() => navigate('/Help', {state: {u: currUser}})}><i class="fa-solid fa-question-circle"></i></a>

                    </li>
                    <li>
                        <a href="./Search" onClick={() => navigate('/Search', {state: {u: currUser, none: false}})}><i class="fa-solid fa-magnifying-glass"></i></a>
                    </li>

                    
                    <li>
                        <a href="./Settings" onClick={toSettings}><i class="fa-solid fa-cogs"></i></a>
                   
                    </li>

                    <li>
                        <a href="./Login" onClick={() => navigate('/Login', {tutor: location.state.tutor})}><i class="fa-solid fa-sign-out"></i></a>
                    </li>
                </ul>
                {/*<button onClick={() => setButtonPopup(true)}><i className="fa-solid fa-ellipsis-vertical" > </i> 
                </button> */}
            
                
            </nav>
            {/*<div className="">
                <DrawerNew trigger={buttonPopup} setTrigger={setButtonPopup}>
                <a> Edit Profile</a>
                <a> Edit Courses </a>
                <a> Edit Courses Offered</a>
                
            </DrawerNew> 
            </div>
            */}
           {/* <DrawerNew trigger={buttonPopup} setTrigger={setButtonPopup}>
                <a> Edit Profile</a>
                <a> Edit Courses </a>
                <a> Edit Courses Offered</a>
                
    </DrawerNew>   */}

        </div>
    )
}
export default Tabs;