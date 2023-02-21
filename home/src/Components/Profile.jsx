import React from 'react';
import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';

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