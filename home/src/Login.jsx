import React, { useState } from "react"
import { useHref, useNavigate, useLocation } from "react-router-dom";
import { Start } from "./Components/Start";



export const Login = ({GlobalState}) => {
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const [showErr, setShowErr] = useState(false);
    const [errCount, setErrCount] = useState(0);
    const [resetPassword, setResetPassword] = useState(false)

    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        setShowErr(false)
        const requestData = JSON.stringify({ "username": user, "pass": pass });
        const headers = { "content-type": "application/json" };

        async function getResponse() {
            const response = await fetch('http://localhost:3001/login', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();
            if (r === "error") {
                console.log("error");
                setErrCount(errCount + 1)
                console.log("err count = " + errCount)
                setShowErr(true)
                if (errCount === 2) {
                    setResetPassword(true)
                }
            }
            else {
                console.log("u " + user +", fname " + r["fname"])
                navigate("/Start", {state: {u: user}});
            }

        }

        getResponse();

        return;
    }
    return (

        <div className="App auth-form-container img">
            <h2>Login</h2>
            {
                showErr ? (<p style={{color:'red'}}>Incorrect username or password. Try Again.</p>): <span></span>
            }
            {
                resetPassword ? (<p style={{color:'red'}}>Click below to reset your username or password or create an account.</p>): <span></span>
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
            <a href="/Profile">
            <button className="link-btn"> Profile </button>
            </a>
            <a href="./Register">
            <button className="link-btn" > Don't have an account? Register here. </button>
            </a>
            <a href="./ResetPass">
            <button className="link-btn" > Forgot Username/Password? </button>
            </a>
        </div>
    )
}