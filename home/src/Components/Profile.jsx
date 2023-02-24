import React from 'react';

import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';
import  './Main.css'
export const Profile = (props) => {

    return (
      <div className="App Profile">
        <Header />
        <hr />
        <About />
        <br />
        <CourseInfo />
        <button type = "submit" className="edit-btn" onClick={() => props.onFormSwitch('settings')}>Edit Profile</button>
      </div>
    );
}

export default Profile;