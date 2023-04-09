import React, {useState} from "react"
import CreateDiscussion from './CreateDiscussion'
import { useLocation, Link, useNavigate } from "react-router-dom";

export const Discussion = ({GlobalState}) => {
    const navigate = useNavigate();
    //setCurrUser(location.state.u)
    //const location = useLocation();

    const { currUser, setCurrUser } = GlobalState;
   // setCurrUser(location.state.u)

    /*if (currUser === "") {
        setCurrUser(location.state.u)
    }*/

    return (
        
        <div classNames = "Discussion App">
            console.log("helllloo");
            <button type="submit" onClick={() => navigate('/CreateDiscussion', {state: {u: currUser}})}>Create New Discussion Board</button>        
        </div>
        
       

    )
    
}
export default Discussion