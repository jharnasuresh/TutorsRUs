import React, {useState} from "react"
import CreateDiscussion from './CreateDiscussion'
import { useLocation, Link, useNavigate } from "react-router-dom";

export const Discussion = ({GlobalState}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)


    return (
        
        <div style={{ justifyContent: 'start' }} class = "App Discussion">
            <button type="submit" onClick={() => navigate('/CreateDiscussion', {state: {u: currUser}})}>Create New Discussion Board</button>        
        </div>
        
       

    )
    
}
export default Discussion