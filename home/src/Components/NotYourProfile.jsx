import React, {useState} from 'react';
import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';
import Popup from './Popup';
import './Main.css'
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
import Tabs from "./Tabs";
import { LocationSearching, Schedule } from '@mui/icons-material';
import Scheduling from './Scheduling';
export const NotYourProfile = ({GlobalState}) => {
  const location = useLocation();
  const navigate  = useNavigate();
  console.log("ll " + location.state.u)
  const [active, setActive] = useState(location.state.active)
  var numFollowers = (location.state.followers).length + ""
  var tut = (location.state.tutor) ? "tut"  : "kjd";
  if ((location.state.followers).length > 3) {
    numFollowers = "3+"
  }
  var numFollowing = (location.state.following).length + ""
  var isFollowing = "Follow"
  var email = "";
  if (location.state.follows) {
    isFollowing = "Unfollow"
    email = location.state.email
    console.log("we do follow")
  }
  else {
    console.log("we dont follow")
  }
  if ((location.state.following).length > 3) {
    numFollowing = "3+"
  }
  console.log("avtiveNYP = " + location.state.active)
  
  console.log("followersNYP = " + numFollowers);
  console.log("followingNYP = " + numFollowing);
  var a = (active) ? "" : "Your account is not currently active";

  const handleSubmit = (e) => {
      console.log("in handle submit of nyp")
      const requestData = JSON.stringify({"currUser": location.state.u, "oldUser": location.state.oldU});
      const headers = { "content-type": "application/json" };

      async function getResponse() { 
          const response = await fetch('http://localhost:3001/notyourprofile', { method: 'POST', body: requestData, headers: headers });
          var r = await response.json();
              if (isFollowing === "Follow") {
                isFollowing = "Unfollow"
              }
              else {
                isFollowing = "Follow"
              }
              console.log("success yay")
              console.log("jharna look its done done done")

              navigate("/Profile", {
        
                state: {
                    u: location.state.oldU,
                    fname: r["fname"],
                    lname: r["lname"], 
                    email: r["email"], 
                    followers: r["followers"],
                    following: r["newFollowing"],
                    active: r["active"],
                    lang: r["lang"],
                    taking: r["taking"],
                    followers: r["followers"],
                    following: r["following"]
                }
            });
          }

  
      getResponse();

      return;
      
  }
  
  return (
    
    <div className="App NotYourProfile">

      <div className='activate'><h1 style={{color: 'red'}}>{a}</h1></div>

      
      {tut === 'tut' &&
      <a>
       <div className="img2"><img class="img2" src = "/Images/verifiedtut.png"/></div>
       <h2> Schedule With Tutor: </h2>
       <Scheduling/>
       </a>
    }
      <Header fname={location.state.fname} lname={location.state.lname} />
      <hr />
      <About user={location.state.u} mail={"mailto:" + email} email={email} yours={false}/>
      <CourseInfo taking={location.state.taking}/>
      <div  className='profile-btn'>
      <h3>Followers: {numFollowers}</h3>
      <h3>Following: {numFollowing} </h3>
      

<button type="submit" onClick={handleSubmit}> {isFollowing} </button>
      </div>
      
      
      
      <br/>

    </div>
  
    
  );
}

export default NotYourProfile;