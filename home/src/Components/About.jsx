import React, { Component } from 'react'
import './css/Main.css'
/*onst handleSubmit = (e) => {
    e.preventDefault();
    console.log(code);
}*/

class About extends Component {
    render() {
        return (
            <section id="container-about" className="container-about">
                    <h1>Your Name</h1>
                    <p>username</p>

                    <h2>Primary Language:</h2> 
                    <p>Blah blah blah </p>
                    <h2>Email:</h2> 
                    <p>urmom@gmail.com</p>
                    <h2>Rating:</h2>
                    <p>0.00</p>
            </section>
        )
    }
}

export default About