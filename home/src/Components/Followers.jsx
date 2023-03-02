import React from 'react'
import './Main.css'
import ButtonList from './ButtonList';



function Followers(props) {
    console.log("f " + props.followers)


    
    return (props.trigger) ? (
        <div className='popup'>
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}> close </button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Followers