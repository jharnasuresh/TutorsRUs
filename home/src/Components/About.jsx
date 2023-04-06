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
                     <h2>{this.props.user}</h2>
                    <h2>Primary Language:</h2> 
                    <p>{ this.props.lang === "" ? "English" : this.props.lang} </p>
                    <h2>Email:</h2> 
                    {
                        (this.props.yours) ? <p>{this.props.email}</p> : <a href={this.props.mail}>{this.props.email}</a>
                    }
                    <h2>Rating:</h2>
                    {
                        this.props.follows ? <p>{this.props.studentRating}/5.0 </p> : <p></p>
                    }
                    {
                        (this.props.tutor) ? <><h2>Price:</h2><p>${this.props.price}/hour</p> 
                        <h2>Tutor Rating:</h2><p>{this.props.tutorRating}/5.0</p>
                        </>
                        : <span></span>
                    }
                    
            </section>
        )
    }
}

export default About