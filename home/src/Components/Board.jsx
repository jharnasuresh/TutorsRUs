
import React, { Component, useState } from 'react';
import './Discuss.css'
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
    //setCurrUser(location.state.u)

    //console.log(location.state.boards)


    const addPost = () => {
        console.log('leaving ' + text + " " + location.state.b)
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "user": currUser, board: location.state.board, text: text, user: currUser });
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

        <div className="App">

            {
                location.state.posts.map((post) => (
                    <div style={{ width: '600px', height: '100px', textAlign: 'center', border: 'solid', backgroundColor: 'white', color: 'gray', borderRadius: '10px', padding: '5px', marginTop: "20px" }}>
                        
                        <p>{post[0]}</p>
                        <p>Posted by {post[1]}</p>
                    </div>
                )
                )
            }
            {
                link && <p>Paste your link below!</p>
            }
            <div>
                <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Type here..." id="text" name="text" />
                <button onClick={addPost}>Post</button>
                <br/>
                <button onClick={() => {setLink(!link)}}>Upload Link</button>
                <button>Upload PDF</button>
            </div>
        </div>
    )




};
export default Board;