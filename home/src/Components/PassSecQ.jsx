import React, {useState} from "react"


export const PassSecQ = (props) => {
    const [pass, setPassword] = useState('');
    const [question1, setQuestion1] = React.useState('fruit');
    const [question2, setQuestion2] = React.useState('water');
    const [question3, setQuestion3] = React.useState('water');

      
    const handleSubmit = (e) => {
        e.preventDefault();
        
       /* console.log(user + " " + firstName + " " + lastName + " " + pass + " " + email);
        
        const requestData = JSON.stringify({ "firstName": firstName, "lastName": lastName, "user": user, "pass": pass, "email": email });*/
        const headers = { "content-type": "application/json" };

        async function getResponse() {
            const response = await fetch('http://localhost:3001/passsecurity', { method: 'POST', headers: headers });
            var r = await response.json();
            
        }

    
        getResponse();

        return;
        
    }
    return (
        <div className = "App auth-form-container">
        <form className="passsecurity-form" method = "POST" onSubmit={handleSubmit}>
            <img class="img" src = "/Images/TutorsRUs_nobackground.png"/>
            <label htmlFor="password:">Password: </label>
            <input value={pass} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="enter your password" id="password" name="password"/>
            <br></br>
            
            
            <button type="submit" onSubmit={handleSubmit}  > Register </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Login here. </button>

    </div>
    )
    
}