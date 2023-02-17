import React, {useState} from "react"
export const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }
    return (
        <div className = "auth-form-container">
        <form classname="register-form" onSubmit={handleSubmit}>
            <label htmlFor="firstName:">First Name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)}type="firstName" placeholder="enter your first name" id="firstName" name="firstName"/>
            <br></br>
            <label htmlFor="lastName:">Last Name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)}type="lastName" placeholder="enter your last name" id="lastName" name="lastName"/>
            <br></br>
            <label htmlFor="username:">user</label>
            <input value={user} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="enter your username" id="username" name="username"/>
            <br></br>
            <label htmlFor="password:">password</label>
            <input value={pass} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="enter your password" id="password" name="password"/>
            <br></br>
            <button type="submit"> Register </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Login here. </button>
    </div>
    )
    
}