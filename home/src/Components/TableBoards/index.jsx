import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";

import { useLocation, Link, useNavigate } from "react-router-dom";


const TableBoards = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [selectedU, setSelectedU] = useState('')
    const currU = props.currU

    console.log(props.names instanceof Array)
    
    const handleSubmit = (props) => {
        setSelectedU(props)
        console.log("clicked " + props)
    
        
        const headers = { "content-type": "application/json" };
            const requestData = JSON.stringify({ "username":  props, "currU": currU});
        
            fetch('http://localhost:3001/info', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
              
                navigate("/NotYourProfile", {
                  
                    state: {
                        oldU: currU,
                        u: res.u,
                        fname: res["fname"],
                        lname: res["lname"], 
                        email: res["email"], 
                        active: res["active"],
                        lang: res["lang"],
                        followers: res["followers"],
                        following: res["following"],
                        follows: res["follows"], // need to fix this
                        taking: res["taking"],
                        profpic: res["profpic"],
                        tutor: res["tutor"],
                        price: res["price"],
                        tutor: res["tutor"],
                        studentRating: res["studentRating"],
                        tutorRating: res["tutorRating"]
                    }
                });
            })
            
    
        
      }
    return (
        <div style={{marginTop: '50px'}}>
        {
            props.names.map((name) => (
                <>
                <div style={{textAlign: 'left', height: '120px', borderStyle: 'solid'}}>
                 
                <br />
                <span></span>
                <h2 style={{float: 'left', marginLeft: '10px'}}>{name}</h2>
                <button style={{float: 'right'}} onClick={() => handleSubmit(name)}>Join</button>
                </div>
                <br/>
                </>
            ))
        }
        </div>
    );
};
export default TableBoards;