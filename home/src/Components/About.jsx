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
                    {/* fix so user cant click on a mailto link on their own page, only other peoples*/}
                    <p>{this.props.email}</p>
                    <h2>Rating:</h2>
                    <p>0.00</p>
            </section>
        )
    }
}

export default About