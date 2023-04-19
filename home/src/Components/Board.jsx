

import React, {Component, useState, useEffect} from 'react';
import './Board.css'
import CreateDiscussion from './CreateDiscussion'
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Row } from 'react-bootstrap';
//import { blue } from 'tailwindcss/colors';



export const Board = ({ GlobalState }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [lookAtPost, setLookAtPost] = useState(undefined);
    const [replies, setReplies] = useState([])
    const { currUser, setCurrUser } = GlobalState;
    console.log(location.state.lookAtPost)
    const [text, setText] = useState('')
    const [reply, setReply] = useState('')
    const [link, setLink] = useState(false);
    const [anon, setAnon] = useState('false')
    const [anonReply, setAnonReply] = useState('false')
    const [emptyErr, setEmptyErr] = useState(false)
    const [emptyErrReply, setEmptyErrReply] = useState(false)
    const [validU, setValidU] = useState(false)
    const words = ['oreo'];
    const [wordErr, setWordErr] = useState(false)
    const [wordErrReply, setWordErrReply] = useState(false)
    const [isDeleted, setIsDeleted] = useState(location.state.isDeleted);
    console.log("start2 " + location.state.posts[0])
    
    //console.log("start " + location.state.posts)
    console.log("check " + lookAtPost)
    setCurrUser(location.state.u)

    console.log(location.state.posts[0])

    var listofposts = location.state.posts
    var listofreploes = location.state.replies
    
    /*

    var repliess = [] // replies is an array of arrays, each inner array is a reply
    if (lookAtPost != undefined) {
        var r = lookAtPost[4]
        console.log(r)
        for (var i = 0; i < r.length; i++) {
            var temp = r[i]
            var reptext = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var usern = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var an = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var upv = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var downv = temp
            var info = [reptext, usern, an, upv, downv]
            repliess.push(info)
        }
    }

    console.log([...repliess])
    
*/

    const setRepliesFunc = (post) => {
console.log("---set replies---")
var repliess = [] // replies is an array of arrays, each inner array is a reply
    
        var r = post[4]
        console.log(r)
        for (var i = 0; i < r.length; i++) {
            var temp = r[i]
            console.log("temp " + temp)
            var reptext = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var usern = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var an = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var upv = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var downv = temp
            var info = [reptext, usern, an, upv, downv]
            repliess.push(info)
        }
        setReplies(repliess)
    
    }

    //console.log(replies)
    const upVotePost = () => {
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ user: currUser, post: lookAtPost})
        fetch('http://localhost:3001/upvotepost', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
            console.log("checked " + res);
        })
    }
    
    const downVotePost = () => {
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ user: currUser, post: lookAtPost})
        fetch('http://localhost:3001/downvotepost', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
            console.log("checked " + res);
        })
    }

    const upVoteReply = (reply) => {
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ user: currUser, post: lookAtPost, reply: reply, board: location.state.board})
        fetch('http://localhost:3001/upvotereply', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
            console.log("checked " + res);
            setReplies(res.replies)
        })
    }
    
    const downVoteReply = (reply) => {
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ user: currUser, post: lookAtPost, reply: reply, board: location.state.board})
        fetch('http://localhost:3001/downvotereply', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
            console.log("checked " + res);
            setReplies(res.replies)
        })
    }

    const reportPost = () => {
        /*const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ user: u, post: lookAtPost})
        fetch('http://localhost:3001/reportpost', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
            console.log("checked " + res);
        })*/
    }

    const addPost = () => {
        console.log('leaving ' + text + " " + location.state.b)
        setWordErr(false)
        setEmptyErr(false)
        setValidU(false)
        if (text.toLowerCase().includes('oreo')) {
            setWordErr(true);
            return
        }
        if (text === '') {
            setEmptyErr(true)
            return
        }
        if (text.includes('@')) {
            var u = text.substring(text.indexOf('@') + 1)
            if (u.includes(' ')) {
                u = u.substring(0, u.indexOf(' '))
            }
            const headers = { "content-type": "application/json" };
            const requestData = JSON.stringify({ user: u})
            fetch('http://localhost:3001/checkvaliduser', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                console.log("checked " + res)
                if (res === 'error') {
                    setValidU(true)
                    return
                }
            })
        }
        if (validU) {
            return
        }
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "user": currUser, board: location.state.board, text: text, user: currUser, link: link, anon: anon, pdf: false });
        fetch('http://localhost:3001/addpost', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                //console.log("r = " + res["studentRating"])
                console.log("res " + res.posts)
                
                
                /*listofposts.push([text, currUser, link, anon, []])
                console.log("next")
                setLookAtPost(listofposts[0])
                console.log("next2")*/
                navigate("/Board", {

                    state: {
                        u: currUser,
                        posts: res.posts,
                        isDeleted: false,
                        lookAtPost: res.posts[0],
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
    const deletePost = () => {
        const headers = { "content-type": "application/json" };
        //const requestData = JSON.stringify({ user: currUser, post: lookAtPost})

        const requestData = JSON.stringify({ user: currUser, post: lookAtPost, board: location.state.board, text: text, user: currUser, link: link, anon: anon });
        fetch('http://localhost:3001/deletepost', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
            console.log("deleted " + res);
            setIsDeleted(true);
            navigate("/Board", {

                state: {
                    u: currUser,
                    posts: res.posts,
                    board: location.state.board,
                    isDeleted: true
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
            <h1><span>{before}</span><button className='linked' onClick={() => {toProfile(u)}}>{u}</button><span>{after}</span></h1>
            
            </>
        }

        return <h1>{text}</h1>;

    }

    const addReply = () => { //TODO
        setWordErrReply(false)
        setEmptyErrReply(false)
        if (reply.toLowerCase().includes('oreo')) {
            setWordErrReply(true);
            return
        }
        if (reply === '') {
            setEmptyErrReply(true)
            return
        }

        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ text: reply, user: currUser, anon: anon, post: lookAtPost[0], board: location.state.board });
        fetch('http://localhost:3001/addreply', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                console.log("r = " + res["studentRating"])
                navigate("/Board", {

                    state: {
                        u: currUser,
                        posts: res.posts,
                        isDeleted: false,
                        lookAtPost: res.posts[0],
                        board: location.state.board
                    }
                });
            })
            

    }

    //console.log(lookAtPost)
    //setLookAtPost(location.state.posts[0])

    return (
        

        
        <div className = "App">

             <div style={{padding: "20px", fontFamily: "Bowlby One", color: "rgb(96, 44, 145)", marginTop: "50px"}}>
                        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                        <h1>{location.state.board} Board</h1>
            </div>
            <div style={{width: '400px', height: '1000px', textAlign: 'left', border: 'solid', backgroundColor: 'white', color: 'black', borderRadius: '10px', padding: '5px', marginTop: "50px", marginLeft: "-900px" }}>
                        <div style={{padding: "10px", fontFamily: "Bowlby One", color: "rgb(96, 44, 145)", size: '2'}}>
                            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                            <h1>Older Posts</h1>

                        </div>
                        
            {
    
                listofposts.map((post) => (
                    <>
                    <div style={{border: 'solid', backgroundColor: "#F8C8DC"}}>
                        <br/>
                        {
                            post[5] ? <button className="link-btn" style={{textAlign: 'left'}} onClick={(e) => {setLookAtPost(post); setRepliesFunc(post);}} >{post[6]}</button> : <button className="link-btn" style={{textAlign: 'left'}} onClick={(e) => isDeleted ? (setLookAtPost(post), setIsDeleted(false)) : (setLookAtPost(post), setRepliesFunc(post))} > {post[0]}</button>
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
            
             <div style={{width: '800px', height: '1000px', textAlign: 'left', border: 'solid', backgroundColor: 'white', color: 'black', borderRadius: '10px', padding: '5px', marginTop: "-1000px", marginLeft: "500px", textAlign:'left' }}>
             
             <div style={{border: 'solid', backgroundColor: "#F8C8DC"}}>
                    {
                            isDeleted ? <p> This post was deleted </p>  : <p>This post exists</p>
                    }
                <div style={{padding: "10px", fontFamily: "Bowlby One", color: "rgb(96, 44, 145)", size: '2', textAlign: 'left'}}>
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                       
                    {
                        lookAtPost != undefined && <>

                        {/* {
                            lookAtPost[5] ? <button className="link-btn" onClick={() => {navigate('/ViewPDF', {state: {u: currUser, pdf: lookAtPost[0]}})}}>Click here to view PDF</button> : <h1>{lookAtPost[0]}</h1>
                        }

                        
                    {
                      */}
                      { //PDF
                        lookAtPost[5] && <button className="link-btn" onClick={() => {navigate('/ViewPDF', {state: {u: currUser, pdf: lookAtPost[0]}})}}>Click here to view PDF</button>
                      }
                      {
                        !lookAtPost[5] && (lookAtPost[2] ? <a href={lookAtPost[0]}>{lookAtPost[0]}</a> : tagIfNeeded(lookAtPost[0]))
                      }
                    
                          
                    

                        {
                            lookAtPost[3] === 'true' ? <p>Posted by: Anonymous</p> : <p>Posted by: {lookAtPost[1]}</p>



                        }
                         {
                            lookAtPost[1] === currUser ? <button onClick={deletePost}>DELETE</button> : <></>


                         }

                         
                        <nav>
                        <li>

                            <span onClick={upVotePost}><i class="fa-solid fa-thumbs-up"></i></span>
                        </li>
                        <li>

                        <span onClick={downVotePost}><i class="fa-solid fa-thumbs-down"></i></span>
                        </li>
                        <li>
                            <span onClick={reportPost}><i class="fa-solid fa-warning"></i></span>
                        </li>
                        </nav>
                        </>

}
                </div>
            </div>

            <div style={{border: 'solid'}}>
            <div style={{padding: "10px", fontFamily: "Georgia", color: "rgb(96, 44, 145)", size: '0', textAlign: 'left', fontSize: '8px', textAlignLast: 'left'}}>
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                       

                       {
                        
                        lookAtPost != undefined &&                      <div> <><h1> Compose a Reply: </h1>
                        {
                            wordErrReply && <h2 style={{color: 'black'}}>Please make sure your post is appropriate!</h2>
                        }

                        {
                            emptyErrReply && <h2 style={{color: 'black'}}>Type something before posting!</h2>
                        }
   
                        <input style={{width: '400px'}} value={reply} onChange={(e) => setReply(e.target.value)} type="reply" placeholder="Type here..." id="reply" name="reply" />
                        <button onClick={addReply}>Post</button> {/* posts as a post, need to make it a reply*/}
                        <select id="anonreply" name="anonreply" onChange={(e) => setAnonReply(e.target.value)}>
                            <option value='false'>With Username</option>
                            <option value='true'>Anonymously</option>
                        </select></>
                        
                            {replies.map((replies) => (
                                <>

                            <div style={{border: 'solid', backgroundColor: "#F8C8DC"}}>
                            <></>
                             <span style={{fontSize: 20 }}>
                            {replies[0]}
                            </span>
                            
                            {
                                replies[3] === 'true' ? <p>Posted by Anonymous</p> : <p>Posted by {replies[1]}</p>
                            } 


                                
                                <br/>
                                </div>
                                <span style={{display: "flex", fontSize: "15px" }}>
                                    <li style={{padding: "10px"}}>
                                    <span>{replies[3]}              </span>
                                    <span onClick={() => {upVoteReply(replies[0])}}><i class="fa-solid fa-thumbs-up"></i></span>
                                    </li>
                                    <li style={{padding: "10px"}}>
                                    <span>{replies[4]}              </span>
                                    <span onClick={() => {downVoteReply(replies[0])}}><i class="fa-solid fa-thumbs-down"></i></span>
                                    </li>
                                    <br></br>
                                    <li style={{padding: "10px"}}>
                                    <span onClick={() => {console.log("report")}}><i class="fa-solid fa-warning"></i></span>
                                    </li>
                                    </span>
                                <br/>
                                </>
                            ))}
                            
                
                            </div>

                       }
                


                </div>
            </div>

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
            {
                validU && <p>That account does not exist</p>
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