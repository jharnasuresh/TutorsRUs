

import React, {Component, useState} from 'react';
import './Board.css'
import CreateDiscussion from './CreateDiscussion'
import { useLocation, Link, useNavigate } from "react-router-dom";
//import { blue } from 'tailwindcss/colors';



export const Board = ({ GlobalState }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currUser, setCurrUser } = GlobalState;
    console.log(location.state.posts)
    const [text, setText] = useState('')
    const [link, setLink] = useState(false);
    const [anon, setAnon] = useState('false')
    const [emptyErr, setEmptyErr] = useState(false)
    const words = ['oreo'];
    const [wordErr, setWordErr] = useState(false)
    setCurrUser(location.state.u)

    //console.log(location.state.boards)


    const addPost = () => {
        console.log('leaving ' + text + " " + location.state.b)
        setWordErr(false)
        setEmptyErr(false)
        if (text.toLowerCase().includes('oreo')) {
            setWordErr(true);
            return
        }
        if (text === '') {
            setEmptyErr(true)
            return
        }
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "user": currUser, board: location.state.board, text: text, user: currUser, link: link, anon: anon });
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

    const toProfile = (user) => {

        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "username":  user});
    
        fetch('http://localhost:3001/info', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
          console.log(res["taking"].toString())

          var follows = false;
          if (res["followers"].includes(currUser)) {
            follows = true
          }
          
            navigate("/NotYourProfile", {

                state: {
                    oldU: currUser,
                    u: res.u,
                    fname: res["fname"],
                    lname: res["lname"], 
                    email: res["email"], 
                    active: res["active"],
                    lang: res["lang"],
                    followers: res["followers"],
                    following: res["following"],
                    follows: follows,
                    taking: res["taking"],
                    tutor: res["tutor"],
                    price: res["price"],
                    studentRating: res["studentRating"],
                    tutorRating: res["tutorRating"]
                }
            });
        })

    }

    const tagIfNeeded = (text) => {

        if (text.includes('@')) {
            var before = text.substring(0, text.indexOf('@') + 1)
            var after = ''
            var u = text.substring(text.indexOf('@') + 1)
            if (u.includes(' ')) {
                u = u.substring(0, u.indexOf(' '))
                after = text.substring(u.indexOf(' '))
            }
            console.log("tag " + u)
            return <>
            <span>{before}</span><button className='linked' onClick={() => {toProfile(u)}}>{u}</button><span>{after}</span>
            </>
        }

        return <p>{text}</p>;

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
                    <>
                    {
                        console.log(post[3])
                    }
                    <div style={{border: 'solid'}}>
                        <br/>
                    {
                        post[2] ? <a href={post[0]}>{post[0]}</a> : tagIfNeeded(post[0])
                    }
                    {
                        post[3] === 'true' ? <p>Posted by Anonymous</p> : <p>Posted by {post[1]}</p>
                    }
                        
                        <br/>
                        </div>
                        <br/>
                        </>

                    
                
                    
                ))
            }
             </div>
            
             <div style={{width: '800px', height: '600px', textAlign: 'left', border: 'solid', backgroundColor: 'white', color: 'black', borderRadius: '10px', padding: '5px', marginTop: "-600px", marginLeft: "500px" }}>
             <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                        <h1>{location.state.board} Board</h1>

            </div>
            <br/>
            {
                link && <p>Paste your link below!</p>
            }
            {
                !link && wordErr && <p>Please make sure your post is appropriate!</p>
            }
            {
                emptyErr && <p>Type something before posting!</p>
            }
                <div>
                <input style={{width: '400px'}} value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Type here..." id="text" name="text" />
                <button onClick={addPost}>Post</button>
                <br/>
                <h4>Post: </h4>
                <select id="anon" name="anon" onChange={(e) => setAnon(e.target.value)}>
                            <option value='false'>With Username</option>
                            <option value='true'>Anonymously</option>
                        </select>
                <br/>
                <button onClick={() => {setLink(!link)}}>Upload Link</button>
                <button onClick={() => {navigate('/UploadPDFBoard', {state: {board: location.state.board, user: currUser}})}}>Upload PDF</button>
                </div>
            </div>
        )
        
       
    

};
export default Board;