import React, {useState} from "react"
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
import './App.css'

export const Verification = ({GlobalState}) => {
    const [userUniqueString, setUserUniqueString] = useState('');
    const [user, setUsername] = useState('');
    const [showErr, setShowErr] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const { currUser, setCurrUser } = GlobalState;

    if (currUser === "") {
        setCurrUser(location.state.oldU)
      }


    const handleSubmit = (e) => {
        e.preventDefault();
        setShowErr(false)
        const requestData = JSON.stringify({ "oldU": location.state.oldU, "userUniqueString": location.state.userUniqueString});
        const headers = { "content-type": "application/json" };

        async function getResponse() {
            const response = await fetch('http://localhost:3001/verify', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();


            console.log(location.state.oldU);
            var userUniqueString = r["userUniqueString"]
            console.log("useruniquecode " + userUniqueString)
            console.log(userUniqueString)
            console.log(r)
            if (r === "invalid code") {
                console.log("in invalid code")
            }
            else if (r === "error") {
                console.log("error");
                setShowErr(true)

            }
            else {
                //navigate("/Login")
                backToProfile();
            }

        }


        getResponse();


        return;
    }

    const backToProfile = () => {

        console.log("tabs2 " + currUser)
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "username":  currUser});
    
        fetch('http://localhost:3001/info', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
            console.log("aaaa? " + res["active"])
            navigate("/Profile", {
            
                state: {
                    u: res.u,
                    fname: res["fname"],
                    lname: res["lname"], 
                    email: res["email"], 
                    active: res["active"],
                    lang: res["lang"],
                    courses: res["courses"],
                    followers: res["followers"],
                    following: res["following"],
                    tutor: res["tutor"]
                }
            });
        })
              
    }

    return (
        <div className = "App verify">
            <h2>Verify Your Email</h2>
            <form className = "verify-page" onSubmit={handleSubmit}>
                <br></br>
                <label htmlFor="checkEmail"> Check your Email </label>
                <br></br>
                <label htmlFor="code:"> Enter Your Verification Code: </label>
                <input value={userUniqueString} onChange={(e) => setUserUniqueString(e.target.value)}type="userUniqueString" placeholder="enter your code" id="userUniqueString" name="userUniqueString"/>
                <br></br>
            <button type="submit" onSubmit={handleSubmit}  > Submit </button>
            </form>
        </div>
    )
}