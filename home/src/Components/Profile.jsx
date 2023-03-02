import React, {useState} from 'react';
import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';
import ButtonList from './ButtonList';
import Popup from './Popup';
import './Main.css'
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
import Tabs from "./Tabs";
import Followers from './Followers'
import Following from './Following'


export const Profile = ({GlobalState}) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const { currUser, setCurrUser } = GlobalState;


  const location = useLocation();
  const navigate  = useNavigate();
  console.log("ll " + location.state.u)
  const [active, setActive] = useState(location.state.active)
  const [followers, setFollowers] = useState(location.state.followers)
  console.log("avtive = " + location.state.active)
  console.log("followers = " + location.state.followers)
  console.log("following = " + location.state.following)
  var a = (active) ? "" : "Your account is not currently active";
  if (currUser === "") {
    setCurrUser(location.state.u)
  }
  console.log(location.state.lang)


  return (
    <div className="App Profile">

      <div className='activate'><h1 style={{color: 'red'}}>{a}</h1></div>

      

      <Header fname={location.state.fname} lname={location.state.lname} />
      <hr />
      <About user={location.state.u} email={location.state.email} lang={location.state.lang}/>
      <br/>
      <CourseInfo courses={location.state.courses}/>
      <div className='profile-btn'>
        {/*<a href="/Profile">
          <button className="submit" > See Followers </button>
        </a> */}

        <a className="popupbutton">
          <button onClick={() => setButtonPopup(true)}className="submit">Click to See Followers</button>
      </a>
      <Followers trigger={buttonPopup} setTrigger={setButtonPopup}>
      <h3>User's Followers:</h3>
      
              <ButtonList followers={location.state.followers} />

            
      </Followers>

      <a className=".popupbutton2">
          <button onClick={() => setButtonPopup2(true)}className="submit">Click to See Following</button>
      </a>
      <Following trigger={buttonPopup2} setTrigger={setButtonPopup2}>
            <h3>User is Following:</h3>
            <p>Shrek</p>
            <p>Donkey</p>
            <p>Princess Peach</p>
      </Following>


        
        <button className='submit'> 
        <Link to="/Settings" state={{ user: location.state.u, active: location.state.active, courses: location.state.courses}}>Edit Profile</Link>
        </button>

      </div>
      
      <br/>
    </div>
    
  );
}

export default Profile;