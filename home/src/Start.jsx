import React, {useState} from "react"
import "./Components/styles.css"
import Tabs from "./Components/Tabs";
export const Start = (props) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        
    }
    return (
        <div classNames = "auth-form-container">
        <Tabs/>
            <h2>Start</h2>

        
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Login here. </button>

    </div>
    )
    
}