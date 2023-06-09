import React, {useState} from "react"
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";

export const Register = ({GlobalState}) => {
    const location = useLocation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const [userErr, setUserErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [lengthErr, setLengthErr] = useState(false);
    const [reqErr, setReqErr] = useState(false);
    const [emptyFieldsErr, setEmptyFieldsErr] = useState(false);
    const navigate = useNavigate();
    /*const isFormValid = (e) => {
        const {firstName, lastName, email, user, pass} = this.state
      
        return firstName && lastName && email && user && pass
      }
    const handleClick = (e) => {
        e.currentTarget.disabled = true;
        console.log('button clicked');
      };*/

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailErr(false)
        setUserErr(false)
        setLengthErr(false)
        setReqErr(false)
        setEmptyFieldsErr(false)
        
        
        const requestData = JSON.stringify({ "firstName": firstName, "lastName": lastName, "user": user, "pass": pass, "email": email});
        const headers = { "content-type": "application/json" };

        async function getResponse() { 
            const response = await fetch('http://localhost:3001/signup', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();
            if (firstName === '' || lastName === '' || email === '' || user === '' || pass === '') {
                console.log("empty field err")
                setEmptyFieldsErr(true)
            }
            else if (r === "email is taken") {
                console.log("email err")
                setEmailErr(true)


            } else if (r === "username is taken") {
                console.log("user error")
                setUserErr(true)
                
            }
            else if (r === "not long enough") {
                console.log("not long enough")
                setLengthErr(true)
            }
            else if (r === "requirements") {
                console.log("requirements")
                setReqErr(true)
            }
            else {
                console.log("success yay")
                console.log("jharna look it should go to password security")
                console.log("u " + user)
                navigate("/PassSecQ", {
                    state: {
                        oldU: user,
                        userUniqueString: r["userUniqueString"]
                    }
                });

            }
        }

    
        getResponse();

        return;
        
    }
    return (
        <div className = "App auth-form-container img">
            <br></br>
            <h2><br></br>Register</h2>
            {
                userErr ? (<p style={{color:'red'}}>That username is already taken. Try Again.</p>): <span></span>
            }
            {
                emailErr ? (<p style={{color:'red'}}>That email is already taken. Either log in with that email or try another email.</p>): <span></span>
            }
            {
                lengthErr ? (<p style={{color:'red'}}>Your password is not long enough. It must be at least 8 characters.</p>): <span></span>
            }
            {
                reqErr ? (<><p style={{ color: 'red' }}>Your password must include at least:</p>
                <ul style={{ color: 'red' }}>
                    <li>One capital letter</li>
                    <li>One number</li>
                    <li>And one special character (#$+%@!)</li>
                </ul></>
                ): <span></span>
            }
             {
                emptyFieldsErr ? (<p style={{color:'red'}}>Please fill out all fields before submitting.</p>): <span></span>
            }

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
            <button type="submit" onSubmit={handleSubmit}  > Register </button>
            

        </form>
        <a href="/Login">
            <button className="link-btn" > Already have an account? Login here. </button>
            </a>

    </div>
    )
    
}