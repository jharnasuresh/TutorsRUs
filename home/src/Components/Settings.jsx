import React, { useState } from "react"
import './Main.css'
import { useLocation, Link, useNavigate} from "react-router-dom";
import About from './About';
import Popup from "./Popup";

export const Settings = ({GlobalState}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [Fname, setFName] = useState('');
    const [Lname, setLName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);
    const [active, setActive] = useState(location.state.active)
    var aButton = (active) ? "Deactivate" : "Activate";
    const { currUser, setCurrUser } = GlobalState;


    console.log("aesawda " + location.state.active)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hi " + Fname)

        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "oldU": location.state.user, "fname": Fname, "lname": Lname, "user": username, "email": email, "pass": password});

        fetch('http://localhost:3001/update', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
            console.log(res["fname"] + " " + res.u) 
            setCurrUser(res.u)
            navigate("/Profile", {
            
                state: {
                    u: res.u,
                    fname: res["fname"],
                    lname: res["lname"], 
                    email: res["email"],
                    active: res["active"]
                }
            });
        })

    }

    const handleDeactivate = (e) => {
        e.preventDefault();
        
    
        const requestData = JSON.stringify({ "username":  location.state.user});
        const headers = { "content-type": "application/json" };
    
        async function getResponse() {
          const response = await fetch('http://localhost:3001/deactivate', { method: 'POST', body: requestData, headers: headers });
          var r = await response.json();
          navigate("/Login");
    
        }
    
        getResponse();
    
        return;
      }

    const backToProfile = (e) => {

        e.preventDefault();
        console.log("ppp")
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "username": location.state.user });

        fetch('http://localhost:3001/info', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
            navigate("/Profile", {
            
                state: {
                    u: res.u,
                    fname: res["fname"],
                    lname: res["lname"], 
                    email: res["email"],
                    active: res["active"]
                }
            });
        })
              
    }

    return (
        <div className="App Profile">
        <h2> Edit Profile </h2>
        <form className="settings" onSubmit={handleSubmit}>
            <label htmlFor="name">First Name: </label>
            <input value={Fname} onChange={(e) => setFName(e.target.value)} type="Fname" placeholder="Enter Your First Name" id="Fname" name="Fname" />
            <br></br>
            <label htmlFor="name">Last Name: </label>
            <input value={Lname} onChange={(e) => setLName(e.target.value)} type="LName" placeholder="Enter Your Last Name" id="LName" name="LName" />
            <br></br>
            <label htmlFor="username">Username: </label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" id="username" name="username" />
            <br></br>
            <label htmlFor="password">Password: </label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
            <br></br>
            <label htmlFor="email">Email: </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" id="email" name="email" />
            <br></br>
            <button type="submit" className="setting-sub" onSubmit={handleSubmit}>Submit Changes</button>
        </form>
        
        <button type="submit" onClick={backToProfile}>Back to profile</button>

        <div>
      <button className='submit' onClick={() => setButtonPopup(true)}>Delete Account</button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} state={{user: location.state.user}}>Are you sure you want to delete your account?</Popup>
      </div>
      <button className='submit' onClick={handleDeactivate}>{aButton} Account</button>
    </div>
        /*
        <div className="App Profile">
            <h2> Edit Profile </h2>
            <form className="settings-name" onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Enter Your Full Name" id="name" name="name" />
            </form>

            <form className="settings-username" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" id="username" name="username" />
            </form>

            <form className="settings-password" onSubmit={handleSubmit}>
                <label htmlFor="password">Password: </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
            </form>

            <form className="settings-email" onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" id="email" name="email" />
            </form>
            <button type="submit" className="setting-sub">Submit Changes</button>
            <button type="submit" onClick={backToProfile}>Back to profile</button>

            <button type="submit" className="deactivate-btn">Deactivate Account</button>
        </div>
        */
    );
}

export default Settings;