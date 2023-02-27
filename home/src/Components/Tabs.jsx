import React from "react";
import {useState} from "react"
export const Tabs = (props) => {
    const [currentForm, setCurrentForm] = useState('start');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
 
    return (
        <div>
            <nav>
            
                <div className="logo">TutorsRUs</div>
                <ul className="nav-links">
                    <li>
                        <a href="./Start"> Home </a>

                    </li>
                    <li>
                        <a href="./Profile">Profile</a>
                    </li>
                    <li>
                        <a href="./Login">Log Out</a>
                    </li>
                    <li>
                        <a href="./Profile">Help</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Tabs;