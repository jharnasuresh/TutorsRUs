import React, {useState} from "react"
export const PassSecQ = (props) => {
    //const [pass, setPassword] = useState('');
    const [question1, setQuestion1] = React.useState('');
    const [question2, setQuestion2] = React.useState('');
    const [question3, setQuestion3] = React.useState('');
    const [showErr, setShowErr] = useState(false);
    const [emptyFieldsErr, setEmptyFieldsErr] = useState(false);

      
    const handleSubmit = (e) => {
        e.preventDefault();
        setEmptyFieldsErr(false)
       console.log(question1 + " " + question2 + " " + question3);
        
        const requestData = JSON.stringify({ "question1": question1, "question2": question2, "question3": question3});
        const headers = { "content-type": "application/json" };

        async function getResponse() {
            const response = await fetch('http://localhost:3001/passsecurity', { method: 'POST', headers: headers });
            var r = await response.json();
            if (question1 === '' || question2 === '' || question3 === '') {
                console.log("empty field err")
                setEmptyFieldsErr(true)
            }
        }

    
        getResponse();

        return;
        
    }
    return (
        <div className = "App auth-form-container">
        <form className="passsecurity-form" method = "POST" onSubmit={handleSubmit}>
            <img class="img" src = "/Images/TutorsRUs_nobackground.png"/>
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