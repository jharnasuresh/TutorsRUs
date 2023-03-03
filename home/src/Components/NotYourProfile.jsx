import React, {useState} from 'react';
import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';
import Popup from './Popup';
import './Main.css'
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
import Tabs from "./Tabs";

export const NotYourProfile = ({GlobalState}) => {
  const location = useLocation();
  const navigate  = useNavigate();
  console.log("ll " + location.state.u)
  const [active, setActive] = useState(location.state.active)
  var numFollowers = (location.state.followers).length + ""
  if ((location.state.followers).length > 500)
    numFollowers = "500+"
  var numFollowing = (location.state.following).length + ""

  if ((location.state.following).length > 500)
    numFollowing = "500+"
  console.log("avtiveNYP = " + location.state.active)
  
  console.log("followersNYP = " + numFollowers);
  console.log("followingNYP = " + numFollowing);
  var a = (active) ? "" : "Your account is not currently active";


  return (
    
    <div className="App NotYourProfile">

      <div className='activate'><h1 style={{color: 'red'}}>{a}</h1></div>

      

      <Header fname={location.state.fname} lname={location.state.lname} />
      <hr />
      <About user={location.state.u} mail={"mailto:" + location.state.email} email={location.state.email} yours={false}/>
      <CourseInfo courses={location.state.courses}/>
      <div  className='profile-btn'>
      <h3>Followers: {numFollowers}</h3>
      <h3>Following: {numFollowing} </h3>
      </div>
      
      
      
      <br/>
    </div>

    
  );
}

export default NotYourProfile;