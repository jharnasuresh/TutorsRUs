import React, { useState } from "react"
import './Main.css'
import '../App.css'
import About from './About';
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";

export const SecurePassReset = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [dontMatchErr, setdontMatchErr] = useState(false);
    const [completed, setCompleted] = useState(false);

    const [emptyFieldsErr, setEmptyFieldsErr] = React.useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    

    const handleSubmit = (e) => {
        var oldU;
        e.preventDefault();
        //setEmptyFieldsErr(false)
        const requestData = JSON.stringify({ "username": username, "password": password, "confirmPassword": confirmPassword});
        const headers = { "content-type": "application/json" };
        console.log("jharna this is for reset password " + username)

        async function getResponse() {
            const response = await fetch('http://localhost:3001/securepassreset', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();
                console.log("jharna hellooooooooo");
                console.log("u " + oldU +", fname " + r["fname"])
            if (r === "passwords don't match") {
                setdontMatchErr(true)
            }
            else {
                setCompleted(true)
            }
        }


        getResponse(); 

        return;


    }

    return (
        <div className="App auth-form-container pass-form ">
            <h1> Secure Reset </h1>
            {
                completed ? (<p style={{color:'red'}}>Your Password has been reset!</p>): <span></span>
            }
            <form className="pass-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Username </label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="email" placeholder="Enter Username" id="username" name="username" />

                    <label htmlFor="password"> New Password </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your New Password" id="password" name="password" />


                <label htmlFor="name"> Confirm Password </label>
                    <label htmlFor="confirmPassword"> Confirm Password </label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="confirmPassword" placeholder="Confirm Your Password" id="confirmPassword" name="confirmPassword" />

                <button type="submit" onSubmit={handleSubmit}  > Submit </button>
            </form>

            <a href="/Login">
            <button className="link-btn" > Login here. </button>
            </a>
        </div>
        
    );
}


export default SecurePassReset;