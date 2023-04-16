
import React, {Component, useState} from 'react';
import Discuss from './Discuss.css'
import { useLocation, Link, useNavigate } from "react-router-dom";
import Post from './Post';
import DisplayBoard from './DisplayBoard';

export const Board = ({GlobalState, props}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)

    //console.log(location.state.boards)


    return (
        <DisplayBoard />
        )
        
       
    

};
export default Board;