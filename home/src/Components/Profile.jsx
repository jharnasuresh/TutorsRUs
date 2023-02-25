import React from 'react';
import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';
import  './Main.css'
import { useHref, useNavigate } from "react-router-dom";

export const Profile = (props) => {
    return (
      <div className="App Profile">
        <Header />
        <hr />
        <About />
        <br></br>
          <a href="/Profile">
            <button className="submit" > Follow </button>
            </a>
        <br></br>
        <CourseInfo />
        <a href="/Settings">
            <button className="submit" > Edit Profile </button>
            </a>
      </div>
    );
}

export default Profile;