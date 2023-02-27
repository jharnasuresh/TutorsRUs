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
  const navigate  = useNavigate();
  console.log("ll " + location.state.u)
  const [active, setActive] = useState(location.state.active)

  console.log("avtive = " + location.state.active)

  var a = (active) ? "" : "Your account is not currently active";





  

  

  return (
    <div className="App Profile">
      <Tabs/>
      <h1 style={{color: 'red'}}>{a}</h1>
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
      <Link to="/Settings" state={{ user: location.state.u, active: location.state.active}}>Edit Profile</Link>
      </button>
      
      
      
      <br/>
    </div>
    
  );
}

export default Profile;