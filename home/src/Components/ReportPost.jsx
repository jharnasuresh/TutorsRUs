import React, {Component, useState} from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Discussion from './Discussion'
export const ReportPost = ({GlobalState}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [reasonWhy, setreasonWhy] = useState('');
    const [reported, setReported] = useState(false);
    const { currUser, setCurrUser } = useState(location.state.u);

    return (
        <div class="App">
        <div style={{backgroundColor: 'white', marginTop: '-500px', width: '600px', height: '500px', borderRadius: '10px', border: '5px solid rgb(180, 180, 180)', padding: '80px'}} class="reportPost">
                <form >
                        <h2 style={{padding: '40px'}}div="h2">Report a Post</h2>
                        
                        <label htmlFor="why">Why does this post violate Purdue guidelines?</label>
                        <input style={{padding: '40px'}} value={reasonWhy} onChange={(e) => {setreasonWhy(e.target.value)}} type="why" placeholder="Enter Your Explanation:" id="why" name="why" />
                        {
                            reported ? <p> You have successfully reported the post </p>:console.log()
                        }
                        <button type="submit" onClick={(e)=>{setReported(true)}} >Submit</button>
                </form>
             
        </div>
        </div>
    )
};


export default ReportPost
