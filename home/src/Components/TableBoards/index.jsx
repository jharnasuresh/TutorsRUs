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
              
                navigate("/Discussion", {
                  
                    state: {
                        
                    }
                });
            })
            
    
        
      }
    return (
        <div style={{margin: '30px'}}>
        {
            props.names.map((name) => (
                <>
                <div style={{textAlign: 'left', height: '120px', borderStyle: 'solid'}}>
                <br />
                <span style={{fontSize: '1.5em', float: 'left', marginLeft: '20px', fontWeight: 'bold', marginTop: '20px'}}>{name}</span>
                <button style={{float: 'right'}} onClick={() => handleSubmit(name)}>Join Here!</button>
                </div>
                <br/>
                </>
            ))
        }
        </div>
    );
};
export default TableBoards;