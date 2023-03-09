import React, { useState } from "react"
import './Main.css'
import { useLocation, Link, useNavigate } from "react-router-dom";
import About from './About';
import Popup from "./Popup";

export const Settings = ({ GlobalState }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [Fname, setFName] = useState('');
    const [Lname, setLName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [lang, setLang] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);
    const [active, setActive] = useState(location.state.active)
    var aButton = (active) ? "Deactivate" : "Activate";
    const { currUser, setCurrUser } = GlobalState;

    console.log("ttt " + location.state.tutor)


    console.log("aesawda " + location.state.active)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hi " + Fname)

        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "oldU": location.state.user, "fname": Fname, "lname": Lname, "user": username, "email": email, "pass": password, "lang": lang });

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
                        active: res["active"],
                        lang: res["lang"],
                        taking: res["taking"],
                        followers: res["followers"],
                        following: res["following"],
                        tutor: res["tutor"]
                    }
                });
            })

    }

    const handleDeactivate = (e) => {
        e.preventDefault();


        const requestData = JSON.stringify({ "username": location.state.user });
        const headers = { "content-type": "application/json" };

        async function getResponse() {
            const response = await fetch('http://localhost:3001/deactivate', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();
            navigate("/Login");

        }

        getResponse();

        return;
    }

    const handleDelTranscript = (e) => {
        e.preventDefault();
        const requestData = JSON.stringify({ "username": location.state.user });
        const headers = { "content-type": "application/json" };
        fetch('http://localhost:3001/deltranscript', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                console.log("TT " + res["tutor"])
                setCurrUser(res.u)
                console.log(" no more tutor " + res["tutor"])
                navigate("/Profile", {

                    state: {
                        u: res.u,
                        fname: res["fname"],
                        lname: res["lname"],
                        email: res["email"],
                        active: res["active"],
                        lang: res["lang"],
                        taking: res["taking"],
                        followers: res["followers"],
                        following: res["following"],
                        tutor: res["tutor"]
                    }
                });
            })
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
                        active: res["active"],
                        lang: res["lang"],
                        taking: res["taking"],
                        followers: res["followers"],
                        following: res["following"],
                        tutor: res["tutor"]
                    }
                });
            })

    }

    return (
        <div className="App Profile">
            <h2> Edit Profile </h2>
            <form className="settings" onSubmit={handleSubmit}>
                <span style={{ padding: '40px' }}>
                    <label htmlFor="Fname">First Name: </label>
                    <input value={Fname} onChange={(e) => setFName(e.target.value)} type="Fname" placeholder="Enter Your First Name" id="Fname" name="Fname" />
                </span>
                <label htmlFor="Lname">Last Name: </label>
                <input value={Lname} onChange={(e) => setLName(e.target.value)} type="LName" placeholder="Enter Your Last Name" id="LName" name="LName" />
                <br></br>
                <span style={{ padding: '40px' }}>
                    <label htmlFor="username">Username: </label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" id="username" name="username" />
                </span>
                <label htmlFor="password">Password: </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
                <br></br>
                <span style={{ padding: '40px' }}>
                <label htmlFor="email">Email: </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" id="email" name="email" />
                </span>
                <label htmlFor="lang">Language: </label>
                <input value={lang} onChange={(e) => setLang(e.target.value)} type="lang" placeholder="Enter Your Primary Language" id="lang" name="lang" />
                <br></br>
                <button type="submit" onClick={() => navigate('/EditCourse', {state: {u: currUser, taking: location.state.taking}})}>Edit Courses</button>
                <br></br>
                <button type="submit" className="setting-sub" onSubmit={handleSubmit}>Submit Changes</button>
            </form>

            <button type="submit" onClick={backToProfile}>Back to profile</button>
            {
                location.state.tutor ? 
                <button type="submit" onClick={handleDelTranscript}>Delete Transcript</button>
                : <button type="submit" onClick={() => navigate('/Transcript', {state: {u: currUser}})}>Get Verified</button>
            }
            

            <div>
                <button className='submit' onClick={() => setButtonPopup(true)}>Delete Account</button>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup} state={{ user: location.state.user, del: "acct" }}>Are you sure you want to delete your account?</Popup>
            </div>
            <button className='submit' onClick={handleDeactivate}>{aButton} Account</button>
        </div>
    );
}

export default Settings;