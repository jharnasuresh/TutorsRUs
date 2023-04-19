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
  var venmo = location.state.venmo;
  console.log("VENMO" + venmo)
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
                    tutorRating: r["tutorRating"],
                    venmo: r["venmo"]
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
      
      <div className={"img2"} style ={{position: 'absolute', marginLeft: '-730px', marginTop: '80px', height: '50px'}}><img class="img2" src = "/Images/verifiedtut.png"/></div>

    }

<div style={{position: 'absolute', marginLeft: '-700px', marginTop: '-450px', backgroundColor: 'white', padding: '20px', paddingBottom: '150px', border: '2px solid black'}}>
      <Avatar src={location.state.profpic} sx={{ width: 300, height: 300 }} />
    </div>      
    <hr />
    <div style={{position: 'absolute', marginLeft: '-1775px', marginTop: '-725px'}}>
    <About venmo={location.state.venmo} user={location.state.u} mail={"mailto:" + email} email={email} lang={location.state.lang} yours={false} price={location.state.price} tutor={location.state.tutor} studentRating={location.state.studentRating} tutorRating={location.state.tutorRating} follows={location.state.follows}/>    
    </div>
      
      <br/>
      <div style={{position: 'absolute', marginLeft: '525px', marginTop: '0px'}}>
        <CourseInfo courses={printing} past={false}/>
      </div>
      <br />
      {
        (location.state.tutor) ? <div style={{position: 'absolute', marginLeft: '525px', marginTop: '350px'}}><CourseInfo courses={printingTaken} past={true}/></div> : <span></span>
      }
      <div  className='profile-btn'  >
      <h3 style={{float: 'left', marginLeft: '100px', marginTop: '-20px', paddingRight: '40px'}}>Followers: {numFollowers}</h3> 
      <h3 style={{float: 'right', marginTop: '-20px'}}>Following: {numFollowing} </h3>
   <br></br>
      
      
<div style={{marginBottom: '100px', marginLeft: '80px'}}>
  <button style={{border: '1px solid black'}} type="submit" onClick={handleSubmit}> {isFollowing} </button>
  <button style={{border: '1px solid black'}} onClick={() => navigate("/Rating", {state: {currU: location.state.oldU, otherU:location.state.u, tutor: location.state.tutor }})}>Rate This User</button>
</div>
{
       
      tut === 'tut' && 
      <div style = {{height: '300px', paddingTop: '10px'}}>
        <br></br>
        <br></br>
        <h2>Schedule with Tutor:</h2>
        <div className="inline-widget">

          <InlineWidget url={urlTut} />
        </div>
        <a>
          
        </a>
        </div>
}

      </div>
      
      
      
      <br/>

    </div>
  
    
  );
}

export default NotYourProfile;