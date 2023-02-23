import React from "react";

export const Tabs = (props) => {
    return (
        <div>
            <nav>
                <div className="logo">TutorsRUs</div>
                <ul className="nav-links">
                    <li>
                        <a href="./Start.jsx"> Home </a>
                        onClick={() => props.onFormSwitch('profile')}
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