import React from 'react'
import './Main.css'
import { useNavigate, useLocation } from "react-router-dom";


function Popup(props) {
    const navigate = useNavigate();
    const location = useLocation();

    console.log("pop up user " + props.user)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const requestData = JSON.stringify({ "username":  props.user});
        const headers = { "content-type": "application/json" };
        console.log("uuu " + location.state.user)
    
        async function getResponse() {
                const response = await fetch('http://localhost:3001/delete', { method: 'POST', body: requestData, headers: headers });
                var r = await response.json();
                props.setTrigger(false)
                navigate("/Login");
           
        }
    
        getResponse();
    
        return;
      }
    return (props.trigger) ? (
        <div className='popup2'>
            <div className='popup-inner2'>
            {props.children}
                <br/>
                <button onClick={handleSubmit}>Yes</button>
                <button onClick={() => props.setTrigger(false)}>No</button>
                
            </div >
        </div >
    ) : "";
}

export default Popup