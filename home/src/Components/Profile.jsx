import React, {useState} from 'react';
import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';
import Popup from './Popup';
import './Main.css'
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
import Tabs from "./Tabs";

export const Profile = () => {
  const location = useLocation();
  console.log("ll " + location.state.u)
  const [buttonPopup, setButtonPopup] = useState(false);



  

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = JSON.stringify({ "username": this.props.u });
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

  return (
    <div className="App Profile">

      <Header fname={location.state.fname} lname={location.state.lname} />
      <hr />
      <About user={location.state.u} email={location.state.email} mail={"mailto:" + location.state.email} />
      <br/>
      <a href="/Profile">
        <button className="submit" > Follow </button>
      </a>
      <br></br>
      <CourseInfo />

      <button className='submit'>
      <Link to="/Settings" state={{ user: location.state.u }}>Edit Profile</Link>
      </button>
      
      <button className='submit' onClick={() => setButtonPopup(true)}>Delete Account</button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} state={{user: location.state.u}}>Are you sure you want to delete your account?</Popup>
    </div>
    
  );
}

export default Profile;