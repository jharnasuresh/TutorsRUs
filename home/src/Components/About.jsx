import React, { Component } from 'react'
import  './Main.css'
/*onst handleSubmit = (e) => {
    e.preventDefault();
    console.log(code);
}*/

class About extends Component {
    render() {
        return (
            <section id="container-about" className="container-about">
                     <h2>Your Username</h2>
                    <h2>Primary Language:</h2> 
                    <p>Blah blah blah </p>
                    <h2>Email:</h2> 
                    <a href="mailto:urmom@gmail.com">urmom@gmail.com</a>
                    <h2>Rating:</h2>
                    <p>0.00</p>
            </section>
        )
    }
}

export default About