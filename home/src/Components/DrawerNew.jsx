import React from "react";
import {useState} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Drawer.css'
import { serviceDropdown } from "./navItems";
function DrawerNew (props) {
    {const [open, setOpen] = useState(false);
    
    return (props.trigger) ? (
        <div classname="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>x</button>
                {props.children}
            </div>
        </div>
    ) : ""
    }
    {/*const [dropdown, setDropdown] = useState(false);

    return (
      <>
        <ul
          className={dropdown ? "services-submenu clicked" : "services-submenu"}
          onClick={() => setDropdown(!dropdown)}
        >
          {serviceDropdown.map((item) => {
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={item.cName}
                  onClick={() => setDropdown(false)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }*/}
}
export default DrawerNew;