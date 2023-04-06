import React, { useState } from "react"
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
import './Main.css'

export const Rating = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [account, setAccount] = useState("");
    const [rating1, setRating1] = useState(1);
    const [rating2, setRating2] = useState(1);
    const [rating3, setRating3] = useState(1);

    console.log(account)

    var q1 = "";
    if (account === "student") {
        q1 = "How well was the student engaged in the lesson?"
    }
    else if (account === "tutor") {
        q1 = "How well did the tutor teach?"
    }

    var q2 = "";
    if (account === "student") {
        q2 = "How prompt was the payment from the student?"
    }
    else if (account === "tutor") {
        q2 = "How well priced was the tutor?"
    }

    var q3 = "";
    if (account === "student") {
        q3 = "How likely are you to tutor this student again?"
    }
    else if (account === "tutor") {
        q3 = "How likely are you to scehdule with this tutor again?"
    }



    const handleSubmit = (e) => {

        console.log("r1 = " + rating1 + " r2 = " + rating2 + " r3 = " + rating3)
        console.log(location.state.otherU)


        async function getResponse() {

            const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "username":  location.state.otherU, "account": account, "rating1": rating1, "rating2": rating2, "rating3": rating3});

            fetch('http://localhost:3001/rating', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {

            const rData = JSON.stringify({ "username":  location.state.otherU});
    
        fetch('http://localhost:3001/info', { method: 'POST', body: rData, headers: headers })
        .then((res) => res.json())
        .then((res) => {

            console.log(location.state.currU + " " + location.state.otherU)
          
            navigate("/NotYourProfile", {
              
                state: {
                    oldU: location.state.currU,
                    u: location.state.otherU,
                    fname: res["fname"],
                    lname: res["lname"], 
                    email: res["email"], 
                    active: res["active"],
                    lang: res["lang"],
                    followers: res["followers"],
                    following: res["following"],
                    follows: true, //FIX
                    taking: res["taking"],
                    profpic: res["profpic"],
                    tutor: res["tutor"],
                    price: res["price"],
                    studentRating: res["studentRating"],
                    tutorRating: res["tutorRating"]
                }
            });
        })
/*
            console.log(res["studentRating"])

            navigate("/NotYourProfile", {
              
                state: {
                    oldU: location.state.oldU,
                    u: location.state.currU,
                    fname: res["fname"],
                    lname: res["lname"], 
                    email: res["email"], 
                    active: res["active"],
                    lang: res["lang"],
                    followers: res["followers"],
                    following: res["following"],
                    follows: true, //FIX
                    taking: res["taking"],
                    profpic: res["profpic"],
                    tutor: res["tutor"],
                    price: res["price"],
                    studentRating: res["studentRating"],
                    tutorRating: res["tutorRating"]
                }
            });*/
        })

        }


        getResponse();

        return;

    }
    return (
        <div style={{ justifyContent: 'start' }} className="App">
            <div style={{ padding: '50px' }}>


                <h2 >Are you rating this user as a student or tutor?</h2>
                <div style={{ display: 'inline-block' }}>
                    <button onClick={(e) => setAccount("student") && navigate('/Rating')}>Student</button>
                    <button onClick={(e) => setAccount("tutor") && navigate('/Rating')}>Tutor</button>
                </div>
            </div>


            {account != "" &&
                <><div>
                    
                    <form> 
                        <h3>{q1}</h3>
                        <select id="rating1" name="rating1" onChange={(e) => setRating1(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <h3>{q2}</h3>
                        <select id="rating2" name="rating2" onChange={(e) => setRating2(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <h3>{q3}</h3>
                        <select id="rating3" name="rating3" onChange={(e) => setRating3(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </form>

                    <button onClick={handleSubmit}>Submit</button>
                    
                </div></>
            }


        </div>
    )



}