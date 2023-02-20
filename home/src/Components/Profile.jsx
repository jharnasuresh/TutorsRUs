import React from 'react';
import './App.css';
import Header from './Components/Header'
import About from './Components/About'
import CourseInfo from './Components/CourseInfo'

function Profile() {
    return (
      <div className="Profile">
        <Header />
        <hr />
        <About />
        <br />
        <CourseInfo />
      </div>
  );
}

export default Profile;