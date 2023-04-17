
import React, {Component, useState} from 'react';
import './Discuss.css'
import CreateDiscussion from './CreateDiscussion'
import { useLocation, Link, useNavigate } from "react-router-dom";
import { blue } from 'tailwindcss/colors';
{/*class Discussion extends Component {
    render() {
        return (
            <div className = "App">
                <div className = "panel panel-default">
                    <div className= "panel=body">
                    Hello I'm a post
                    </div>
                </div>
                <div className = "panel panel-default post-editor">
                    <div className = "panel-body">
                        <textarea className = "form-control post-editor-input" />
                        <button className = "btn btn-sccess post-editor-button">Post</button>
                    </div>
                </div>
            </div>
        )
    }*/}


export const Discussion = ({GlobalState}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)

    console.log(location.state.boards)

    const leaveBoard = (b) => {
        console.log('leaving')
        const headers = { "content-type": "application/json" };
    const requestData = JSON.stringify({ "user":  currUser, board: b});
        fetch('http://localhost:3001/leaveboard', { method: 'POST', body: requestData, headers: headers })
    .then((res) => res.json())
    .then((res) => {
        console.log("r = " + res["studentRating"])
        navigate("/Profile", {
        
            state: {
                u: res.u,
                fname: res["fname"],
                lname: res["lname"], 
                email: res["email"], 
                followers: res["followers"],
                following: res["following"],
                active: res["active"],
                lang: res["lang"],
                profpic: res["profpic"],
                taking: res["taking"],
                taken: res["taken"],
                followers: res["followers"],
                following: res["following"],
                tutor: res["tutor"],
                price: res["price"],
                studentRating: res["studentRating"],
                tutorRating: res["tutorRating"]
            }
        });
    })
    }

    const toBoard = (b) => {
        console.log('to board')
        const headers = { "content-type": "application/json" };
    const requestData = JSON.stringify({ "user":  currUser, board: b});
        fetch('http://localhost:3001/getposts', { method: 'POST', body: requestData, headers: headers })
    .then((res) => res.json())
    .then((res) => {
        //console.log("r = " + res["studentRating"])
        navigate("/Board", {
        
            state: {
                u: currUser,
                posts: res.posts, 
                lookAtPost: res.posts[0],
                board: b
            }
        });
    })
        

        /*
        console.log('to board')
        const headers = { "content-type": "application/json" };
    const requestData = JSON.stringify({ "user":  currUser, board: b});
        fetch('http://localhost:3001/visitboard', { method: 'POST', body: requestData, headers: headers })
    .then((res) => res.json())
    .then((res) => {
        console.log("r = " + res["studentRating"])
        navigate("/Board", {
        
            state: {
                u: res.u,
            }
        });
    })
    */
    }


    return (
        
        <div className = "App">
             <div style={{padding: "20px", fontFamily: "Bowlby One", color: "rgb(96, 44, 145)", marginTop: '-700px'}}>
                        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                        <h1>Your Discussion Boards!</h1>
            </div>
            {
    
                location.state.boards.map((b) => (
                   
  
                    <div style={{width: '600px', height: '100px', textAlign: 'center', border: 'solid', backgroundColor: 'white', color: 'gray', borderRadius: '10px', padding: '5px', marginTop: "20px"}}>
                        <button className="linked" onClick={(e) => {toBoard(b)}}>{b}</button>
                        <button onClick={(e) => {leaveBoard(b)}}>Leave</button>
                    </div>
                   
                    
                )
                )
            }
                <div style={{ justifyContent: 'start' }} class = "Discussion">
            <button type="submit" onClick={() => navigate('/CreateDiscussion', {state: {u: currUser}})}>Create New Discussion Board</button>        
        </div>
                
            </div>
        )
        
       
    

};
export default Discussion;