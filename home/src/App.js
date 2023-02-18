import React, { useState } from 'react';
import './App.css';
import {Login} from "./Login";
import {Register} from "./Register";
import {Verification} from "./Verification";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
 
  return (
    <div className="App">
      <img src = "/Images/TutorsRUs_nobackground.png" alt = ""/>
      {
        //ternary operator if currentForm = login then return login screen else display register page
        //currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> 
        : currentForm === "verify" ? <Verification onFormSwitch={toggleForm}/>
        : <Register onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

export default App;
