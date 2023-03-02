import React, { useState } from "react"
import './Main.css'
import '../App.css'
import About from './About';
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";

export const ResetPass = (props) => {
    const [email, setEmail] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [showErr, setShowErr] = useState(false);

    const options = [

        { label: 'Q1', value: 'q1' },

        { label: 'Q2', value: 'q2' },

        { label: 'Q3', value: 'q3' },

    ];
    const [emptyFieldsErr, setEmptyFieldsErr] = React.useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    

    const handleSubmit = (e) => {
        var oldU;
        e.preventDefault();
        //setEmptyFieldsErr(false)
        const requestData = JSON.stringify({ "email": email, "answer1": answer1,  "answer2": answer2, "answer3": answer3});
        const headers = { "content-type": "application/json" };
        console.log("jharna this is for reset password " + email)

        async function getResponse() {
            const response = await fetch('http://localhost:3001/resetpass', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();
                console.log("jharna hellooooooooo");
                console.log("u " + oldU +", fname " + r["fname"])
                console.log("answer1: " + answer1)
                console.log("answer2: " + answer2)
                console.log("answer3: " + answer3)
            if (r === "error") {
                console.log("error");
                setShowErr(false)
            }
            else {
                setShowErr(true)
            }
        }


        getResponse(); 

        return;


    }

    return (
        <div className="App auth-form-container pass-form ">
            <h1> Reset Password </h1>
            {
                showErr ? (<p style={{color:'red'}}>Check your email to reset your password!</p>): <span></span>
            }
            <form className="pass-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Verification Email </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Verification Email" id="email" name="email" />

            
            <label htmlFor="name"> Choose a Security Question to Answer </label>

            <label htmlFor="name"> Question 1 </label>
                    <label htmlFor="answer1"> What was the name of your first stufffed animal? </label>
                    <input value={answer1} onChange={(e) => setAnswer1(e.target.value)} type="answer1" placeholder="Enter Your Answer" id="answer1" name="answer1" />


                <label htmlFor="name"> Question 2 </label>
                    <label htmlFor="answer2"> What was the first concert you attended? </label>
                    <input value={answer2} onChange={(e) => setAnswer2(e.target.value)} type="answer2" placeholder="Enter Your Answer" id="answer2" name="answer2" />


                <label htmlFor="name"> Question 3 </label>
                <label htmlFor="answer3"> What was the make and model of your first car? </label>
                <input value={answer3} onChange={(e) => setAnswer3(e.target.value)} type="answer3" placeholder="Enter Your Answer" id="answer3" name="answer3" />
            
                <button type="submit" onSubmit={handleSubmit}  > Submit </button>
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