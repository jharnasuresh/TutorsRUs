
import React, {Component} from 'react';
import './Discuss.css'
import React, {useState} from "react"
import CreateDiscussion from './CreateDiscussion'
import { useLocation, Link, useNavigate } from "react-router-dom";
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


    return (
        
        <div style={{ justifyContent: 'start' }} class = "App Discussion">
            <button type="submit" onClick={() => navigate('/CreateDiscussion', {state: {u: currUser}})}>Create New Discussion Board</button>        
        </div>
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
        
       

    )
    

}
export default Discussion;