import React, {useState} from 'react';
import Header from './Header';
import About from './About';
import CourseInfo from './CourseInfo';
import Popup from './Popup';
import './Main.css'
import Avatar from "@mui/material/Avatar";
import { InlineWidget } from 'react-calendly';
import { Route, useHref, useNavigate, useLocation, Link } from "react-router-dom";
import Tabs from "./Tabs";
import { LocationSearching, Schedule } from '@mui/icons-material';
import CalendlyPopup from "./CalendlyPopup.jsx"
export const NotYourProfile = ({GlobalState}) => {

  //NOTE oldU = currently logged in user, u = user who's profile you are viewing

  const location = useLocation();
  const navigate  = useNavigate();
  //console.log("ll " + location.state.studentRating)
  const [active, setActive] = useState(location.state.active)
  var numFollowers = (location.state.followers).length + ""
  var tut = (location.state.tutor) ? "tut"  : "kjd";
  //console.log(tut)
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
  //console.log("avtiveNYP = " + location.state.active)
  
  //console.log("followersNYP = " + numFollowers);
  //console.log("followingNYP = " + numFollowing);
  console.log(location.state.studentRating)
  var a = (active) ? "" : "This account is not currently active";
  var urlTut = "https://calendly.com/" + location.state.u;
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
                    price: r["price"],
                    tutor: r["tutor"],
                    profpic: r["profpic"],
                    studentRating: r["studentRating"],
                    tutorRating: r["tutorRating"]
                }
            });
          }

  
      getResponse();

      return;
      
  }
  
  return (
    
    <div className="App Profile">

      <div className='activate'><h1 style={{color: 'red'}}>{a}</h1></div>

      
      {tut === 'tut' &&
      
      <div className={"img2"} style ={{position: 'absolute', marginLeft: '500px', marginTop: '-780px', height: '50px'}}><img class="img2" src = "/Images/verifiedtut.png"/></div>

    }

<div style={{position: 'absolute', marginLeft: '-700px', marginTop: '-350px'}}>
      <Avatar src={location.state.profpic} sx={{ width: 300, height: 300 }} />
    </div>      
    <hr />
    <div style={{position: 'absolute', marginLeft: '-1775px', marginTop: '-400px'}}>
    <About user={location.state.u} mail={"mailto:" + email} email={email} lang={location.state.lang} yours={false} price={location.state.price} tutor={location.state.tutor} studentRating={location.state.studentRating} tutorRating={location.state.tutorRating} follows={location.state.follows}/>    
    </div>
      
      <br/>
      <div style={{position: 'absolute', marginLeft: '525px', marginTop: '170px'}}>
        <CourseInfo courses={printing} past={false}/>
      </div>
      <br />
      {
        (location.state.tutor) ? <div style={{position: 'absolute', marginLeft: '525px', marginTop: '500px'}}><CourseInfo courses={printingTaken} past={true}/></div> : <span></span>
      }
      <div  className='profile-btn'  >
      <h3>Followers: {numFollowers}</h3>
      <h3>Following: {numFollowing} </h3>
      
      

<button type="submit" onClick={handleSubmit}> {isFollowing} </button>
<button onClick={() => navigate("/Rating", {state: {currU: location.state.oldU, otherU:location.state.u, tutor: location.state.tutor }})}>Rate This User</button>
{
        
      tut === 'tut' && 
      <div style = {{height: '300px'}}>
        <h2>Scehdule with Tutor:</h2>
        <div className="inline-widget">

          <InlineWidget url={urlTut} />
        </div>
        </div>
}

      </div>
      
      
      
      <br/>

    </div>
  
    
  );
}

export default NotYourProfile;