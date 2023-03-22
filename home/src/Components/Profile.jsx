import React, { useState } from 'react';
import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';
import ButtonList from './ButtonList';

import Avatar from "@mui/material/Avatar";
import ButtonList2 from './ButtonList2';
import Popup from './Popup';
import './Main.css'
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
import Tabs from "./Tabs";
import Followers from './Followers'
import Following from './Following'
import { LocationSearching } from '@mui/icons-material';


export const Profile = ({ GlobalState }) => {
  console.log("in profile now")
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
  var hasPFP = true;

  const toSendFollowing = [location.state.following, location.state.u]
  var a = (active) ? "" : "Your account is not currently active";
  if (currUser === "") {
    setCurrUser(location.state.u)
  }

  if (location.state.profpic === "") {
    hasPFP = false;
    console.log("---------- doesn't have pfp --------")
  }
  console.log(location.state.lang)
  console.log("tt " + location.state.tutor)


  var numFollowers = (location.state.followers).length + ""
  if ((location.state.followers).length > 3)
    numFollowers = "3+"
  var numFollowing = (location.state.following).length + ""

  if ((location.state.following).length > 3) {
    numFollowing = "3+"
  }
  var tut = (location.state.tutor) ? "tut"  : "kjd";

  var printing = "";
  if (location.state.taking != undefined) {
    function p (str) {
      printing+=str.title + "-" + str.professor + "-" + str.semester + ", "
  }
  Object.values(location.state.taking).forEach(p)
  }


  var printingTaken = "";

  if (location.state.taken != undefined) {
    function pTaken (str) {
      printingTaken+=str.title + "-" + str.professor + "-" + str.semester + "-" + str.grade  + ", "

  }
  Object.values(location.state.taken).forEach(pTaken)
  }

  console.log("offer " + printingTaken)

  return (
    <div className="App Profile">

      <div className='activate'><h1 style={{ color: 'red', marginTop: '-50px' }}>{a}</h1></div>
      

      {tut === 'tut' &&
          <div className="img2"><img class="img2" src = "/Images/verifiedtut.png"/></div>
      }

    <div style={{position: 'absolute', marginLeft: '-430px', marginTop: '50px'}}>
      <Avatar src={location.state.profpic} sx={{ width: 300, height: 300 }} />
      </div>
      <About user={location.state.u} email={location.state.email} lang={location.state.lang} yours={true} price={location.state.price} tutor={location.state.tutor}/>
      <br />
      <div style={{position: 'absolute', marginLeft: '800px', marginTop: '350px'}}>
        <CourseInfo courses={printing} past={false}/>
      </div>
      
      <br />
      {
        (location.state.tutor) ? <div style={{position: 'absolute', marginLeft: '800px', marginTop: '700px'}}><CourseInfo courses={printingTaken} past={true}/></div> : <span></span>
      }
      <div className='profile-btn'>

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
          <Link to="/Settings" state={{ user: location.state.u, active: location.state.active, taking: location.state.taking, taken: location.state.taken, tutor: location.state.tutor, profpic: location.state.profpic, hasPFP: hasPFP }}>Edit Profile</Link>
        </button>

      </div>

      <br />
    </div>

  );
}

export default Profile;