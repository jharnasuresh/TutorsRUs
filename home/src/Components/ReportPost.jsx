import React, {Component, useState} from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

export const ReportPost = ({GlobalState}) => {
    const [why, setWhy] = useState('');
    const location = useLocation();
    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)

    return (
        <div class="App">
        <div style={{backgroundColor: 'white', marginTop: '-500px', width: '600px', height: '400px', borderRadius: '10px', border: '5px solid rgb(180, 180, 180)', padding: '80px'}} class="reportPost">
                <form >
                        <h2 style={{padding: '40px'}}div="h2">Report a Post</h2>
                        
                        <label htmlFor="why">Why does this post violate Purdue guidelines?</label>
                        <input style={{padding: '40px'}} value={why} onChange={(e) => setWhy(e.target.value)} type="why" placeholder="Enter Your Explanation:" id="why" name="why" />
                        
                </form>
               {/* <button onClick={handleSubmit}> Submit </button> */}
        </div>
        </div>
    )
};


export default ReportPost
