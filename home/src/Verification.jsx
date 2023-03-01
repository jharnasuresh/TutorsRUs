import React, {useState} from "react"
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";

export const Verification = (props) => {
    const [userUniqueCode, setUserUniqueCode] = useState('');
    const [user, setUsername] = useState('');
    const [showErr, setShowErr] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowErr(false)
        const requestData = JSON.stringify({ "oldU": location.state.oldU});
        const headers = { "content-type": "application/json" };

        async function getResponse() {
            const response = await fetch('http://localhost:3001/verify', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();


            console.log(location.state.oldU);
            var userUniqueString = r["userUniqueString"]
            console.log(userUniqueString)
            console.log(r)
            if (r === "error") {
                console.log("error");
                setShowErr(true)

            }
            else {
                navigate("/Login")
            }

        }


        getResponse();


        return;
    }

    return (
        <div className = "verify">
            <h2>Verify Your Email</h2>
            <form className = "verify-page" onSubmit={handleSubmit}>
                <br></br>
                <label htmlFor="checkEmail"> Check your Email </label>
                <br></br>
                <label htmlFor="code:"> Enter Your 4-digit Verification Code: </label>
                <input value={userUniqueCode} onChange={(e) => setUserUniqueCode(e.target.value)}type="userUniqueCode" placeholder="enter your code" id="userUniqueCode" name="userUniqueCode"/>
                <br></br>
            <button type="submit" onSubmit={handleSubmit}  > Submit </button>
            </form>
        </div>
    )
}