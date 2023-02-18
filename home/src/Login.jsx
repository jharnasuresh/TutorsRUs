import React, {useState} from "react"
export const Login = (props) => {
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
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
            <button type = "submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here. </button>
     </div>
    )
}