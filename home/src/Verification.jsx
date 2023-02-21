import React, {useState} from "react"
export const Verification = (props) => {
    const [code, setCode] = useState('');
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
            const response = await fetch('http://localhost:3001/verify', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();
            console.log(r)
            if (r === "error") {
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
        <div className = "verify">
            <h2>Verify Your Email</h2>
            <form className = "verify-page" onSubmit={handleSubmit}>
                <label htmlFor="code:">Enter Your 4-digit Verification Code: </label>
                <input value={code} onChange={(e) => setCode(e.target.value)}type="code" placeholder="enter your code" id="code" name="code"/>
                <button type = "submit" className = "verSub">Submit</button>
            </form>
            <button type = "submit" className="verify-btn" onClick={() => props.onFormSwitch('register')}>Back </button>
        </div>
    )
}