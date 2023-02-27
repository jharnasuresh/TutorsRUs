import React from "react";
import {useState} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
export const Tabs = (props) => {
    const [currentForm, setCurrentForm] = useState('start');
    const location = useLocation();
    const navigate = useNavigate();
    console.log(props.u)

  const backToProfile = (e) => {

    e.preventDefault();
    console.log("ppp")
    const headers = { "content-type": "application/json" };
    const requestData = JSON.stringify({ "username": props.u });

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
                <div className="logo">TutorsRUs</div>
                <ul className="nav-links">
                    <li>
                    <button className="link-btn" onClick={() => props.onFormSwitch('profile')}>Profile. </button>
                    {/*<a> Home </a>*/}

                    </li>
                    <li>
                        <button type="link-btn" onClick={backToProfile}>Profile</button>
                        {/*<Link to="/Profile" state={{u: props.u}}>Profile</Link>*/}
                        {/*<a href="/Profile">Profile</a>*/}
                    </li>
                    <li>
                        <a href="/Login">Log Out</a>
                    </li>
                    <li>
                        <a href="/Profile">Help</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Tabs;