import React from 'react'
import './Main.css'

function AutologoutWarning(props) {
    return (props.trigger) ? (
        <div className='popup2'>
            <div className="popup-inner2">
                <button className="close-btn2" onClick={() => props.setTrigger(false)}> close </button>
                { props.children }
            </div>
        </div>
    ) : "";
}
export default AutologoutWarning