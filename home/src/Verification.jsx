import React, {useState} from "react"
export const Verification = (props) => {
    const [code, setCode] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(code);
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