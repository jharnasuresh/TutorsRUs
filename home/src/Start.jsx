import React, {useState} from "react"
export const Start = (props) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        
    }
    return (
        <div className = "auth-form-container">
            <h2>Start</h2>

        
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Login here. </button>

    </div>
    )
    
}