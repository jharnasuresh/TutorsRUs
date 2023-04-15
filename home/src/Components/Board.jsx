
import React, {Component, useState} from 'react';
import './Board.css'
import CreateDiscussion from './CreateDiscussion'
import { useLocation, Link, useNavigate } from "react-router-dom";
//import { blue } from 'tailwindcss/colors';



export const Board = ({GlobalState}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currUser, setCurrUser } = GlobalState;
    console.log(location.state.posts)
    const [text, setText] = useState('')
    //setCurrUser(location.state.u)

    //console.log(location.state.boards)

    
    const addPost = () => {
        console.log('leaving ' + text + " " + location.state.b)
        const headers = { "content-type": "application/json" };
    const requestData = JSON.stringify({ "user":  currUser, board: location.state.board, text: text, user: currUser});
        fetch('http://localhost:3001/addpost', { method: 'POST', body: requestData, headers: headers })
    .then((res) => res.json())
    .then((res) => {
        console.log("r = " + res["studentRating"])
        navigate("/Board", {
        
            state: {
                u: currUser,
                posts: res.posts, 
                board: location.state.board
            }
        });
    })
    }


    return (
        
        <div className = "App">
             <div style={{padding: "20px", fontFamily: "Bowlby One", color: "rgb(96, 44, 145)", marginTop: "-300px"}}>
                        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                        <h1>{location.state.board} Board</h1>
            </div>
            <div style={{width: '400px', height: '600px', textAlign: 'left', border: 'solid', backgroundColor: 'white', color: 'black', borderRadius: '10px', padding: '5px', marginTop: "20px", marginLeft: "-900px" }}>
                        <div style={{padding: "10px", fontFamily: "Bowlby One", color: "rgb(96, 44, 145)", size: '2'}}>
                            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                            <h1>Older Posts</h1>
                        </div>
            {
    
                location.state.posts.map((post) => (
                        <p>{post[0]} - {post[1]}</p>

                    
                
                    
                ))
            }
             </div>
            
             <div style={{width: '800px', height: '600px', textAlign: 'left', border: 'solid', backgroundColor: 'white', color: 'black', borderRadius: '10px', padding: '5px', marginTop: "-600px", marginLeft: "500px" }}>
             <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                        <h1>{location.state.board} Board</h1>

            </div>
                <div>
                <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Type here..." id="text" name="text" />
                    <button onClick={addPost}>Post</button>
                </div>
            </div>
        )
        
       
    

};
export default Board;