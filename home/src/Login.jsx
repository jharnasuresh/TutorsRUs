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
            console.log("hereeeee")
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
                navigate("/Start", {state: {u: user, isLoggedIn: true}});
            }

        }

        getResponse();

        return;
    }
    return (

        <div className="App auth-form-container img">
             <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
             <div style={{fontFamily: "Bowlby One", marginTop: '-400px', color: "rgb(96, 44, 145)", padding: '20px'}}>
                <h2>Welcome!</h2>
            </div>
            {
                showErr ? (<p style={{color:'red'}}>Incorrect username or password. Try Again.</p>): <span></span>
            }
            {
                resetPassword ? (<p style={{color:'red'}}>Click below to reset your username or password or create an account.</p>): <span></span>
            }


            <form style={{backgroundColor: 'rgba(255, 255, 255, 0.365)', padding: '50px', border: '1px solid gray', paddingTop: '10px', borderRadius: '10px'}} classname="login-form" onSubmit={handleSubmit}>
            <h3 style={{color: 'gray', padding: '20px'}}>Login to Continue</h3>
               {/* <label style={{fontFamily: "Bowlby One", paddingRight: '5px', color: 'gray'}}htmlFor="username:">Username: </label>*/}
                <input value={user} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter your Username" id="username" name="username" />
                <br></br>
                <br></br>
                {/*<label style={{fontFamily: "Bowlby One", paddingRight: '5px', color: 'gray'}}for="password:">Password: </label>*/}
                <input value={pass} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your Password" id="password" name="password" />
                <br></br>

                <button type="submit" onSubmit={handleSubmit}>Log In</button>

            </form>
            <a href="./Register">
            <button className="link-btn" > Don't have an account? Register here. </button>
            </a>
            <a href="./ResetPass">
            <button className="link-btn" > Forgot Username/Password? </button>
            </a>
        </div>
    )
}