import React from "react";
import {useState} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";

export const DrawerNew = (props) => {
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
                <ul className="nav-links .side">
                    
                </ul>
                <i className="fa-solid fa-ellipsis-vertical Menu"></i>
                
               
            </nav>
        </div>
    )
}
export default DrawerNew;