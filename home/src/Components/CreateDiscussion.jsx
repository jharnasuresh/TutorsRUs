import React, {useState} from "react"
import './CreateDiscussion.css'

import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";


export const CreateDiscussion = ({GlobalState}) => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    console.log("JHARNA LOOK");
    console.log(name)
    console.log(className);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("entered handle submit ~~~~~~~~")
        
        const requestData = JSON.stringify({"name": name, "course": className});
        const headers = { "content-type": "application/json" };

        async function getResponse() { 

            console.log("hello???????111111");
            const response = await fetch('http://localhost:3001/createdisc', { method: 'POST', body: requestData, headers: headers });
            var r = await response.json();
            console.log("hello???????22222");
        }

    
        getResponse();

        return;
        
    }

    return (
        <div class="App">
        <div classNames = "CreateDiscussion App">
                <form className="createDisc" /*onSubmit={handleSubmit}*/ style={{alignContent: 'center'}}>
                        <h2 div="h2">Create a New Discussion Board!</h2>
                        <label htmlFor="name">Discussion Board Name: </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Enter Your Name:" id="name" name="name" />
                 
                        <label htmlFor="className">Class Name: </label>
                        <input value={className} onChange={(e) => setClassName(e.target.value)} type="className" placeholder="Enter Your Class Name" id="className" name="className" />
                        
                        <button type="submit" onSubmit={handleSubmit}  > Submit </button>
                </form>
        </div>
        </div>
    )
    
}