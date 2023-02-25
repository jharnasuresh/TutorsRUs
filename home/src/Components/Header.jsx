import React, { Component } from "react"
import  './Main.css'

class Header extends Component {
    render () {
        return (
            
            <div id = "home">
                <h1 className="header-h1">{this.props.fname} {this.props.lname}</h1>
                <img id="profileid" src = "/Images/Profile_Icon.png" alt = ""/> 
            </div>
            
        )
        
    }
}

export default Header