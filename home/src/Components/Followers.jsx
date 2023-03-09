import React from 'react'
import './Main.css'
import ButtonList from './ButtonList';



function Followers(props) {
    console.log("f " + props.followers)


    
    return (props.trigger) ? (
        <div className='popup2'>
            <div className="popup-inner2">
                <button className="close-btn2" onClick={() => props.setTrigger(false)}> close </button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Followers