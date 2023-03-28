import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";

import { useLocation, Link, useNavigate } from "react-router-dom";


const Table = ({tutors}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [selectedU, setSelectedU] = useState('')
    
    const handleSubmit = (props) => {
        console.log("clicked " + props)
    
        
        const headers = { "content-type": "application/json" };
            const requestData = JSON.stringify({ "username":  props});
        
            fetch('http://localhost:3001/info', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
              
                navigate("/NotYourProfile", {
                  
                    state: {
                        oldU: selectedU,
                        u: res.u,
                        fname: res["fname"],
                        lname: res["lname"], 
                        email: res["email"], 
                        active: res["active"],
                        lang: res["lang"],
                        followers: res["followers"],
                        following: res["following"],
                        follows: false, // need to fix this
                        taking: res["taking"],
                        profpic: res["profpic"],
                        tutor: res["tutor"],
                        price: res["price"]
                    }
                });
            })
            
    
        
      }
    return (
        <div>
        {
            Object.keys(tutors).map((tutor) => (
                <>
                <div style={{textAlign: 'left', alignItems: 'left'}}>
                    <div style={{float: 'left', margin: '0px 0px 0px 100px' }}>
                    <img src = "/Images/Profile_Icon.png" alt = "" width="100px" height="100px" textAlign='left'/>
                    </div>
                 
                <p>Username: {tutor}</p>
                <button  onClick={() => handleSubmit(tutor)}>{tutor}</button>
                <p>First Name: {tutors[tutor].fname}</p>
                </div>
                <br/>
                </>
            ))
        }
        </div>
    );
};
export default Table;