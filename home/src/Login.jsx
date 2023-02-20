import React, { useState } from "react"
import Popup from 'reactjs-popup';



export const Login = (props) => {
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const [showErr, setShowErr] = useState(false);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        setShowErr(false)
        const requestData = JSON.stringify({ "username": user, "pass": pass });
        const headers = { "content-type": "application/json" };


        async function getResponse() {
            const response = await fetch('http://localhost:3001/login', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();
            console.log(r)
            if (r === "hi") {
                console.log("error");
                setShowErr(true)

            }
            else {
                props.onFormSwitch('start')
            }

        }


        getResponse();


        return;
    }
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            {
                showErr ? (<p style={{color:'red'}}>Incorrect username or password. Try Again.</p>): <p></p>
            }
            
            <form classname="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username:">Username: </label>
                <input value={user} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="enter your username" id="username" name="username" />
                <br></br>
                <label for="password:">Password: </label>
                <input value={pass} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="enter your password" id="password" name="password" />
                <br></br>

                <button type="submit" onSubmit={handleSubmit}>Log In</button>

            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here. </button>
        </div>
    )
}
