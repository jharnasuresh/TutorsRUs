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
                    <button className="link-btn" onClick={() => props.onFormSwitch('profile')}>Profile. </button>
                    {/*<a> Home </a>*/}

                    </li>
                    <li>
                        <a href="./Profile.jsx">Profile</a>
                    </li>
                    <li>
                        <a href="./Profile">Log Out</a>
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