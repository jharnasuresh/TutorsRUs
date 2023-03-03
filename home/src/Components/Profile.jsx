import React, { useState } from 'react';
import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';
import ButtonList from './ButtonList';

import ButtonList2 from './ButtonList2';
import Popup from './Popup';
import './Main.css'
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
import Tabs from "./Tabs";
import Followers from './Followers'
import Following from './Following'
import { LocationSearching } from '@mui/icons-material';


export const Profile = ({ GlobalState }) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const { currUser, setCurrUser } = GlobalState;


  const location = useLocation();
  const navigate = useNavigate();
  console.log("ll " + location.state.u)
  const [active, setActive] = useState(location.state.active)
  const [followers, setFollowers] = useState(location.state.followers)
  console.log("avtive = " + location.state.active)
  console.log("followers = " + location.state.followers)
  console.log("following = " + location.state.following)
  const toSendFollowers = [location.state.followers, location.state.u]

  const toSendFollowing = [location.state.following, location.state.u]
  var a = (active) ? "" : "Your account is not currently active";
  if (currUser === "") {
    setCurrUser(location.state.u)
  }
  console.log(location.state.lang)


  var numFollowers = (location.state.followers).length + ""
  if ((location.state.followers).length > 3)
    numFollowers = "3+"
  var numFollowing = (location.state.following).length + ""

  if ((location.state.following).length > 3) {
    numFollowing = "3+"
  }
  return (
    <div className="App Profile">

      <div className='activate'><h1 style={{ color: 'red' }}>{a}</h1></div>



      <Header fname={location.state.fname} lname={location.state.lname} />
      <hr />
      <About user={location.state.u} email={location.state.email} lang={location.state.lang} yours={true}/>
      <br />
      <CourseInfo courses={location.state.courses} />
      <div className='profile-btn'>
        {/*<a href="/Profile">
          <button className="submit" > See Followers </button>
        </a> */}

          <a className="popupbutton">
            <button onClick={() => setButtonPopup(true)} className="submit">Followers: {numFollowers}</button>
          </a>
          <Followers trigger={buttonPopup} setTrigger={setButtonPopup} followers= {location.state.followers} oldUser = {location.state.u}>
            <h3>User's Followers:</h3>
            <ButtonList followers= {location.state.followers} oldUser = {location.state.u} following = {location.state.following}/>

          </Followers>
        <a className=".popupbutton2">
          <button onClick={() => setButtonPopup2(true)} className="submit">Following: {numFollowing}</button>
        </a>
        <Following trigger={buttonPopup2} setTrigger={setButtonPopup2}>
          <h3>User is Following:</h3>
          <ButtonList2 following={location.state.following} oldUser = {location.state.u}/>
        </Following>



        <button className='submit'>
          <Link to="/Settings" state={{ user: location.state.u, active: location.state.active, courses: location.state.courses }}>Edit Profile</Link>
        </button>

      </div>

      <br />
    </div>

  );
}

export default Profile;