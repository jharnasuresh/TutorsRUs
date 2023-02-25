import React from 'react';
import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';
import  './Main.css'
import { Route, useHref, useNavigate, useLocation } from "react-router-dom";

export const Profile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requestData = JSON.stringify({ "username": this.props.u});
    const headers = { "content-type": "application/json" };

    async function getResponse() {
        const response = await fetch('http://localhost:3001/delete', { method: 'POST', body: requestData, headers: headers });
        var r = await response.json();
        if (r === "error") {
            
        }
        else {

        }

    }

    getResponse();

    return;
}

const location = useLocation();
console.log("l " + location.state.u)
    return (
      <div className="App Profile">
        <Header fname={location.state.fname} lname={location.state.lname}/>
        <hr />
        <About user={location.state.u} email={location.state.email}/>
        <br></br>
          <a href="/Profile">
            <button className="submit" > {location.state.u} </button>
            </a>
        <br></br>
        <CourseInfo />
        <a href="/Settings">
            <button className="submit" > Edit Profile </button>
            </a>
        <button className='submit' onSubmit={handleSubmit}>Delete Account</button>
      </div>
    );
}

export default Profile;