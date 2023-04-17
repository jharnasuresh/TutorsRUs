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
                    <div style={{fontFamily: "Bowlby One"}}>
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                     <h2>{this.props.user}</h2>
                     </div>
                    <h2 style={{display: 'inline', paddingRight: '50px', marginLeft: '-190px'}}>Primary Language:</h2> 
                    <p style={{display: 'inline'}}>{ this.props.lang === "" ? "English" : this.props.lang} </p>
                    <br></br>
                    <br></br>
                    <h2 style={{display: 'inline', paddingRight: '50px', marginLeft: '-150px'}}>Email:</h2> 
                    {
                        (this.props.yours) ? <p style={{display: 'inline',paddingRight: '50px'}}>{this.props.email}</p> : <a style={{display: 'inline', paddingRight: '50px'}} href={this.props.mail}>{this.props.email}</a>
                    }
                    <br></br>
                    <br></br>
                    <h2 style={{display: 'inline', marginLeft: '-445px'}}>Rating:</h2>
                    {
                        this.props.follows ? <p style={{display: 'inline', paddingRight: '50px'}}>{this.props.studentRating}/5.0 </p> : <p></p>
                    }
                    <br></br>
                    {
                        (this.props.tutor) ? <><h2 style={{display: 'inline', paddingRight: '50px', marginLeft: '-360px'}}>Price:</h2><p style={{display: 'inline'}}>${this.props.price}/hour</p> 
                        <br></br>
                        <br></br>
                        <h2 style={{display: 'inline', paddingRight: '50px', marginLeft: '-285px'}}>Tutor Rating:</h2><p style={{display: 'inline'}}>{this.props.tutorRating}/5.0</p>
                        </>
                        : <span></span>
                    }
                    
            </section>
        )
    }
}

export default About