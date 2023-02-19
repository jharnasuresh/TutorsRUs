import React, {useState} from "react"
export const Login = (props) => {
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/Start')
        console.log(user);
        const requestData = JSON.stringify({ "username": user, "pass": pass });
        const headers = { "content-type": "application/json" };

        async function getResponse() {
            const response = await fetch('http://localhost:3001/login', { method: 'POST', body: requestData, headers: headers });
            console.log("sup")
            await response.json();
            console.log("sup2")
        }
    
        getResponse();

        return;
    }
    return (
        <div className = "auth-form-container">
            <h2>Login</h2>
        <form classname="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username:">Username: </label>
            <input value={user} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="enter your username" id="username" name="username"/>
            <br></br>
            <label for="password:">Password: </label>
            <input value={pass} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="enter your password" id="password" name="password"/>
            <br></br>

            <button type = "submit" onClick={() => props.onFormSwitch('start')}>Log In</button>

        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here. </button>
     </div>
    )
}
