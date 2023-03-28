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
        <div style={{marginTop: '50px'}}>
        {
            Object.keys(tutors).map((tutor) => (
                <>
                <div style={{textAlign: 'left', height: '130px'}}>
                    <div style={{float: 'left', margin: '10px 10px 10px 100px' }}>
                    <img src = "/Images/Profile_Icon.png" alt = "" width="100px" height="100px" textAlign='left'/>
                    </div>
                 
                <button className="linked" onClick={() => handleSubmit(tutor)}>{tutor}</button>
                <br />
                <span style={{textAlign: 'left', fontWeight: 'bold'}}>{tutors[tutor].fname} {tutors[tutor].lname}</span>
                <span style={{float: 'right', padding: '0px 50px 0px 0px'}}>Price: ${tutors[tutor].price}/hour</span>
                <br />
                <span style={{textAlign: 'left'}}>Courses: {[...tutors[tutor].taken] + ","}</span>
                {
                }
                <span style={{float: 'right', padding: '0px 50px 0px 0px'}}>Rating: {tutors[tutor].rating != undefined ? tutors[tutor].rating : '0.0'}/5</span>
                </div>
                <br/>
                </>
            ))
        }
        </div>
    );
};
export default Table;