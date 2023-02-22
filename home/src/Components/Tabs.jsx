import React from "react";

function Tabs() {
    return (
        <div>
            <nav>
                <div className="logo">TutorsRUs</div>
                <ul className="nav-links">
                    <li><a>Home</a></li>
                    <li><a>Profile</a></li>
                    <li><a>Log Out</a></li>
                    <li><a>Help</a></li>
                </ul>
            </nav>
        </div>
    )
}
export default Tabs;