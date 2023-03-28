import React, {useState} from "react"

export const Help = ({GlobalState}) => {
    const location = useLocation();

    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)

    if (currUser === "") {
        setCurrUser(location.state.u)
    }

    return (
        
        <div classNames = "App">
        </div>
        
       

    )
    
}
export default Group