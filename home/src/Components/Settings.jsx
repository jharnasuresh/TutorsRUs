import React, { useState, useEffect } from "react"
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
    const [active, setActive] = useState(location.state.active);
    const [price, setPrice] = useState('');
    const [venmo, setVenmo] = useState('');
    var aButton = (active) ? "Deactivate" : "Activate";
    var hasPFP = true;
    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)

    console.log("user " + location.state.u  + " " + currUser)
    
  
    console.log("ttt " + location.state.tutor)


    console.log("aesawda " + location.state.active)

    if (location.state.profpic === "") {
        hasPFP = false;
        console.log("---------- doesn't have pfp --------")
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hi " + Fname)

        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "oldU": location.state.u, "fname": Fname, "lname": Lname, "user": username, "email": email, "pass": password, "lang": lang, "price": price, "venmo": venmo });

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
                        profpic: res["profpic"],
                        followers: res["followers"],
                        following: res["following"],
                        tutor: location.state.tutor,
                        price: res["price"],
                        taken: res["taken"],
                        studentRating: res["stuestudentRatingntRating"],
                        tutorRating: res["tutorRating"],
                        venmo: res["venmo"]
                    }
                });
            })

    }

    const handleDeactivate = (e) => {
        e.preventDefault();


        const requestData = JSON.stringify({ "username": location.state.u });
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
        const requestData = JSON.stringify({ "username": location.state.u });
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
                        tutor: res["tutor"],
                        price: res["price"],
                        taken: res["taken"],
                        studentRating: res["studentRating"],
                        tutorRating: res["tutorRating"],
                        venmo: res["venmo"]
                    }
                });
            })
}

    const backToProfile = (e) => {

        e.preventDefault();
        console.log("ppp")
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "username": location.state.u });

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
                        tutor: res["tutor"],
                        price: res["price"],
                        taken: res["taken"],
                        studentRating: res["studentRating"],
                        tutorRating: res["tutorRating"],
                        venmo: res["venmo"]
                    }
                });
            })

    }

    return (
        <div className="App">
            <div style={{padding: "20px", fontFamily: "Bowlby One", color: "rgb(96, 44, 145)"}}>
                        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                        <h1>Edit Profile</h1>
            </div>
            <form className="settings" onSubmit={handleSubmit} style={{alignContent: 'center'}}>
                <span style={{ flexDirection: "column", display: "flex", width: "300px", marginLeft: "-300px"}}>
                    <label htmlFor="Fname">First Name: </label>
                    <input value={Fname} onChange={(e) => setFName(e.target.value)} type="Fname" placeholder="Enter Your First Name" id="Fname" name="Fname" />
                </span>
                <span style={{flexDirection: "column", display: "flex", width: "300px", marginLeft: "-300px"}}>
                <label htmlFor="Lname">Last Name: </label>
                <input value={Lname} onChange={(e) => setLName(e.target.value)} type="LName" placeholder="Enter Your Last Name" id="LName" name="LName" />
                </span>
                <span style={{flexDirection: "column", display: "flex", width: "300px", marginLeft: "-300px"}}>
                <label htmlFor="username">Username: </label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" id="username" name="username" />
                </span>
                <span style={{flexDirection: "column", display: "flex", width: "300px", marginLeft: "-300px"}}>
                <label htmlFor="password">Password: </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
                </span>
                <span style={{flexDirection: "column", display: "flex", width: "300px", marginLeft: "-300px"}}>
                <label htmlFor="lang">Language: </label>
                <input value={lang} onChange={(e) => setLang(e.target.value)} type="lang" placeholder="Enter Your Primary Language" id="lang" name="lang" />
                </span>
                {
                    location.state.tutor ? <><span style={{flexDirection: "column", display: "flex", width: "300px", marginLeft: "-300px"}}><label htmlFor="price">Price: </label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="price" placeholder="Enter Your Hourly Price" id="price" name="price" />
                    
                    </span><br></br></>: <span></span>
                }
                {
                    location.state.tutor ? <><span style={{flexDirection: "column", display: "flex", width: "300px", marginLeft: "-300px"}}><label htmlFor="venmo">Venmo: </label>
                    <input value={venmo} onChange={(e) => setVenmo(e.target.value)} type="venmo" placeholder="Enter Your Venmo" id="venmo" name="venmo" />
                    
                    </span></>: <span></span>
                }

                <span style={{flexDirection: "column", display: "flex", width: "300px", marginLeft: "-300px"}}>
                <button type="submit" className="setting-sub" onSubmit={handleSubmit}>Submit Changes</button>
                </span>
            </form>
            <span style={{flexDirection: "column", display: "flex", marginLeft: "300px", marginTop: "-560px", paddingLeft: "100px"}}>
            <button type="submit" onClick={() => navigate('/EditCourse', {state: {u: currUser, taking: location.state.taking, tutor: location.state.tutor}})}>Edit Current Courses</button>
            </span>
                {
        
                    location.state.tutor ? <><span style={{flexDirection: "column", display: "flex", marginLeft: "300px", paddingLeft: "100px"}}><button type="submit" onClick={() => navigate('/EditCourseTutor', {state: {u: currUser, taken: location.state.taken, tutor: location.state.tutor}})}>Edit Past Courses</button>
                    </span></>: <span></span>
                }
        
            {
                location.state.tutor ? 
                <span style={{flexDirection: "column", display: "flex", marginLeft: "300px", paddingLeft: "100px"}}><button type="submit" onClick={handleDelTranscript}>Delete Transcript</button> </span>
                :  <span style={{flexDirection: "column", display: "flex", marginLeft: "300px", paddingLeft: "100px"}}><button type="submit" onClick={() => navigate('/Transcript', {state: {u: currUser}})}>Get Verified</button> </span>
            }
            <span style={{flexDirection: "column", display: "flex", marginLeft: "300px", paddingLeft: "100px"}}>
             <button type="submit" onClick={() => navigate('/UploadProfile', {state: {u: currUser, profpic: location.state.profpic}})}>Upload Profile Picture</button> 
             </span>
            {
                hasPFP ? 
                <><span style={{flexDirection: "column", display: "flex", marginLeft: "300px", paddingLeft: "100px"}}><button type="submit" onClick={() => navigate('/EditPFP', {state: {u: currUser, profpic: location.state.profpic}})}>Edit Profile Picture</button>  
                </span></>: <span></span>
        } 
             
            <div>
            <span style={{flexDirection: "column", display: "flex", marginLeft: "300px", paddingLeft: "100px"}}>
            <button type="submit" onClick={backToProfile}>Back to profile</button>
            </span>
            <span style={{flexDirection: "column", display: "flex", width: "250px", marginLeft: "50px", marginTop: "80px"}}>
                <button className='submit' onClick={() => setButtonPopup(true)}>Delete Account</button>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup} user={location.state.u} del="acct">Are you sure you want to delete your account?</Popup>
            </span>
            </div>
            <span style={{flexDirection: "column", display: "flex", marginLeft: "300px", marginTop: "-81px"}}>
            <button className='submit' onClick={handleDeactivate}>{aButton} Account</button>
            </span>
            
        </div>
    );
}

export default Settings;