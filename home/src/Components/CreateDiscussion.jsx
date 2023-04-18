import React, {useState} from "react"
import './CreateDiscussion.css'

import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";


export const CreateDiscussion = ({GlobalState}) => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [showTakenErr, setShowTakenErr] = useState(false);
    const [showErr, setShowErr] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();
    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)
    
    console.log("JHARNA LOOK");
    console.log(name)
    console.log(className);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowTakenErr(false)
        setShowErr(false)
        if (className === "" || name === "") {
            setShowErr(true)
            return;
        }
        console.log("entered handle submit ~~~~~~~~")
        
        const requestData = JSON.stringify({"name": name, "course": className, username: currUser});
        const headers = { "content-type": "application/json" };

        async function getResponse() { 

            console.log("hello???????111111");
            fetch('http://localhost:3001/createdisc', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                //console.log("verified! " + res["tutor"])
                if (res === 'error') {
                    console.log("oh no")
                    setShowTakenErr(true)
                    return;
                }
                navigate('/Discussion', {state: {u: currUser, boards: res.boards}})

                // Logs wL2dvYWwgbW9yZ...
            });
        }

    
        getResponse();

        return;
        
    }


    return (
        <div class="App">
        <div class="createDisc">
                <form >
                        <h2 div="h2">Create a New Discussion Board!</h2>
                        {
                            showTakenErr ? <h3 style={{color: 'red'}}>That name is already taken. Try another one.</h3> : <span></span>
                        }
                        {
                            showErr ? <h3 style={{color: 'red'}}>Fill out all fields before submitting.</h3> : <span></span>
                        }
                        <label htmlFor="name">Discussion Board Name: </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Enter Your Name:" id="name" name="name" />
                 
                        <label htmlFor="className">Class Name: </label>
                        <input value={className} onChange={(e) => setClassName(e.target.value)} type="className" placeholder="Enter Your Class Name" id="className" name="className" />
                        
                        
                </form>
                <button onClick={handleSubmit} > Submit </button>
        </div>
        </div>
    )
    
}