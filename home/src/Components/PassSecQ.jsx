import React, {useState} from "react"
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";

export const PassSecQ = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
    //const [pass, setPassword] = useState('');
    const [question1, setQuestion1] = React.useState('');
    const [question2, setQuestion2] = React.useState('');
    const [question3, setQuestion3] = React.useState('');
    const [showErr, setShowErr] = useState(false);
    const [emptyFieldsErr, setEmptyFieldsErr] = useState(false);

    console.log("aesawda " + location.state.oldU)
      
    const handleSubmit = (e) => {
        var oldU;
        e.preventDefault();
        setEmptyFieldsErr(false)
       console.log(question1 + " " + question2 + " " + question3);
        const requestData = JSON.stringify({"oldU": location.state.oldU, "question1": question1, "question2": question2, "question3": question3});
        const headers = { "content-type": "application/json" };

        async function getResponse() {
            const response = await fetch('http://localhost:3001/passsecurity', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();
            if (question1 === '' || question2 === '' || question3 === '') {
                console.log("empty field err")
                setEmptyFieldsErr(true)
            }
            else {
                console.log("jharna hellooooooooo");
                console.log("u " + r["u"] + ", fname " + r["fname"] + ", string" + r["userUniqueString"])
                navigate("/Verification", {
                    state: {
                        oldU: r["u"],
                        userUniqueString: r["userUniqueString"]
                    }
                });
            }
        }

    
        getResponse();

        return;
        
    }
    return (
        <div className = "App auth-form-container">
        <form className="passsecurity-form" method = "POST" onSubmit={handleSubmit}>
            <img class="img-sec" src = "/Images/TutorsRUs_nobackground.png"/>
            <label htmlFor="question1"> What was the name of your first stufffed animal? </label>
            <input value={question1} onChange={(e) => setQuestion1(e.target.value)}type="question1" placeholder="enter your answer" id="question1" name="question1"/>
            <br></br>
            <label htmlFor="question2"> What was the first concert you attended? </label>
            <input value={question2} onChange={(e) => setQuestion2(e.target.value)}type="question2" placeholder="enter your answer" id="question2" name="question2"/>
            <br></br>
            <label htmlFor="question3"> What was the make and model of your first car? </label>
            <input value={question3} onChange={(e) => setQuestion3(e.target.value)}type="question3" placeholder="enter your answer" id="question3" name="question3"/>
            <br></br>
            <button type="submit" onSubmit={handleSubmit}  > Submit </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Login here. </button>

    </div>
    )
    


}