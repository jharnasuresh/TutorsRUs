import React, { useState } from 'react';
import './App.css';
import {Login} from "./Login";
import {Register} from "./Register";
import {Verification} from "./Verification"
import {Start} from "./Components/Start"
import {Settings} from "./Components/Settings"
import {Profile} from "./Components/Profile"

import Tabs from "./Components/Tabs";



function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
 
  return (
    <div>
      

      {
        
        //ternary operator if currentForm = login then return login screen else display register page
        //currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> 
        : currentForm === "profile" ? <Profile onFormSwitch={toggleForm}/>
        : currentForm === "start" ? <Start onFormSwitch={toggleForm}/>
        : currentForm === "verify" ? <Verification onFormSwitch={toggleForm}/>
        : currentForm === "settings" ? <Settings onFormSwitch={toggleForm}/>

        : <Register onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

export default App;
