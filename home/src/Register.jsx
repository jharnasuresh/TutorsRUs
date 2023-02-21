import React, {useState} from "react"
export const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const [done, setDone] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onFormSwitch('verify')
        console.log(user + " " + firstName + " " + lastName + " " + pass + " " + email);
        
        const requestData = JSON.stringify({ "firstName": firstName, "lastName": lastName, "user": user, "pass": pass, "email": email });
        const headers = { "content-type": "application/json" };

        async function getResponse() {
            setDone(false)
            const response = await fetch('http://localhost:3001/signup', { method: 'POST', body: requestData, headers: headers });
            console.log("sup")
            await response.json();
            console.log("sup2")
            setDone(true)
        }
    
        getResponse();

        if (done) {
            console.log("hi");
        }
        return;
        
    }
    return (
        <div className = "auth-form-container">
            <h2>Register</h2>

        <form className="register-form" method = "POST" onSubmit={handleSubmit}>
            <label htmlFor="firstName:">First Name: </label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)}type="firstName" placeholder="enter your first name" id="firstName" name="firstName"/>
            <br></br>
            <label htmlFor="lastName:">Last Name: </label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)}type="lastName" placeholder="enter your last name" id="lastName" name="lastName"/>
            <br></br>
            <label htmlFor="email:">Email: </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="enter your email" id="email" name="email"/>
            <br></br>
            <label htmlFor="username:">Username: </label>
            <input value={user} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="enter your username" id="username" name="username"/>
            <br></br>
            <label htmlFor="password:">Password: </label>
            <input value={pass} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="enter your password" id="password" name="password"/>
            <br></br>
            <button type="submit" onSubmit={handleSubmit} > Register </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Login here. </button>

    </div>
    )
    
}