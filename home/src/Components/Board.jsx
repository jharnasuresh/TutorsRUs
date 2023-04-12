
import React, {Component, useState} from 'react';
import CreateDiscussion from './CreateDiscussion'
import { useLocation, Link, useNavigate } from "react-router-dom";



export const Board = ({GlobalState}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)

    //console.log(location.state.boards)


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
        
       
    

};
export default Board;