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
        console.log(user);
        
        const requestData = JSON.stringify({ firstName, lastName, user, pass });
        const headers = { "Content-Type": "application/json", 'Accept': 'application/json' };

        async function getResponse() {
            const response = await fetch('http://localhost:3001/register', { method: 'POST', body: requestData, headers });
            await response.json();
            setDone(true)
          }
      
          getResponse();

          if (done) {
            return console.log("hi");
          }
        
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
            <input value={lastName} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="enter your email" id="email" name="email"/>
            <br></br>
            <label htmlFor="username:">Username: </label>
            <input value={user} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="enter your username" id="username" name="username"/>
            <br></br>
            <label htmlFor="password:">Password: </label>
            <input value={pass} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="enter your password" id="password" name="password"/>
            <br></br>
            <button type="submit" className = "verify-btn" onClick={() => props.onFormSwitch('verify')}> Register </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Login here. </button>

    </div>
    )
    
}