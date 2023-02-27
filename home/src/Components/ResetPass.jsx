import React, {useState} from "react"
import  './Main.css'
import About from './About';
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";

export const ResetPass = (props) => {
    const [email, setEmail] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
   
    const options = [

        { label: 'Q1', value: 'q1' },
     
        { label: 'Q2', value: 'q2' },
     
        { label: 'Q3', value: 'q3' },
     
      ];
    const [quest1, setQ1] = React.useState('q1');
    const [quest2, setQ2] = React.useState('q2');
    const [quest3, setQ3] = React.useState('q3');
    const [emptyFieldsErr, setEmptyFieldsErr] = React.useState(false);

    const handleQ1Change = (event) => {
        setQ1(event.target.value);
    };
    const handleQ2Change = (event) => {
        setQ2(event.target.value);
    };
    const handleQ3Change = (event) => {
        setQ3(event.target.value);
    };

    const handleSubmit = (e) => {
        var oldU;
        e.preventDefault();
        //setEmptyFieldsErr(false)
        const requestData = JSON.stringify({ "email": email});
        const headers = { "content-type": "application/json" };
        console.log("jharna this is for reset password " + email)
        /*const requestData = JSON.stringify({"oldU": location.state.oldU, "question1": question1, "question2": question2, "question3": question3});
        const headers = { "content-type": "application/json" };*/

        async function getResponse() {
            /*const response = await fetch('http://localhost:3001/resetpass', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();
            if (question1 === '' || question2 === '' || question3 === '') {
                console.log("empty field err")
                setEmptyFieldsErr(true)
            }
            else {
                console.log("jharna hellooooooooo");
                console.log("u " + oldU +", fname " + r["fname"])
                navigate("/Login");
                
            }*/
        }

    
        getResponse();

        return;


    }

    return (
      <div className="App Profile">
        <About />
        <h1> Reset Password </h1>
        <form className = "resetpass-email" onSubmit={handleSubmit}>
            <label htmlFor="name">Verification Email </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Enter Your Verification Email" id="email" name="email"/>
            <button type="submit" onSubmit={handleSubmit}  > Submit </button>
       
        </form>

        <Dropdown 
        label= "Security Questions"  options={[

{ label: 'Question 1', value: 'q1' },

{ label: 'Question 2', value: 'q2' },

{ label: 'Question 3', value: 'q3' },

]} value = "quest1"
onChange={handleQ1Change}/>

<form className = "resetpass-q1" onSubmit={handleSubmit}>
            <label htmlFor="answer1">Answer: </label>
            <input value={answer1} onChange={(e) => setAnswer1(e.target.value)}type="answer1" placeholder="Enter Your Answer" id="answer1" name="answer1"/>
        </form>

<Dropdown 
label= "Security Questions"  options={[

{ label: 'Question 1', value: 'q1' },

{ label: 'Question 2', value: 'q2' },

{ label: 'Question 3', value: 'q3' },

]} value = "quest2"
onChange={handleQ2Change}/>

<form className = "resetpass-q2" onSubmit={handleSubmit}>
            <label htmlFor="answer2">Answer: </label>
            <input value={answer2} onChange={(e) => setAnswer2(e.target.value)}type="answer2" placeholder="Enter Your Answer" id="answer2" name="answer2"/>
        </form>

<Dropdown 

label= "Security Questions"  options={[

{ label: 'Question 1', value: 'q1' },

{ label: 'Question 2', value: 'q2' },

{ label: 'Question 3', value: 'q3' },

]} value = "quest3"
onChange={handleQ3Change}/>

<form className = "resetpass-q3" onSubmit={handleSubmit}>
            <label htmlFor="answer3">Answer: </label>
            <input value={answer3} onChange={(e) => setAnswer3(e.target.value)}type="answer3" placeholder="Enter Your Answer" id="answer3" name="answer3"/>
        </form>
    </div>
    );
}

const Dropdown = ({ label, value, options, onChange }) => {

    return (
   
      <label>
   
        {label}
   
        <select value={value} onChange={onChange}>
   
          {options.map((option) => (
   
            <option value={option.value}>{option.label}</option>
   
          ))}
   
        </select>
   
      </label>
   
    );
   
   };

export default ResetPass;