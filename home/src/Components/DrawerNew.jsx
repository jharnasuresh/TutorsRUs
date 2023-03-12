import React from "react";
import {useState} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";


function DrawerNew () {
    const [open, setOpen] = useState(false);
    
    return (
        <div>
            <nav>
                <ul 
                className="nav-links" 
                style= {{transform: open ? "translateX(0px)" : "translateX(-500px)" }}
                >
                    
                </ul>


                <button type="link-btn" onClick={() => setOpen(!open)}><i className="fa-solid fa-ellipsis-vertical Menu" > </i> 
                </button>
                
               
            </nav>
        </div>
    )
}
export default DrawerNew;