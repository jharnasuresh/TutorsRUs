import React, { Component } from 'react'
import  './Main.css'
/*onst handleSubmit = (e) => {
    e.preventDefault();
    console.log(code);
}*/

class About extends Component {

    
    render() {
        
        return (
            <section style={{marginLeft: "800px"}}id="container-about" className="container-about">
                     
                    <div style={{fontFamily: "Bowlby One", textAlign: "center"}}>
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bowlby+One" />
                     <h2>{this.props.user}</h2>
                     </div>
                     <div style={{flexDirection: "column"}}>
                    <h2 style={{display: 'inline', textAlign: "center",marginLeft: '-265px'}}>Primary Language:</h2> 

                    <p style={{display: 'inline'}}>{ this.props.lang === "" ? "English" : this.props.lang} </p>
                    <br></br>
                    <br></br>
                    <h2 style={{display: 'inline' , marginLeft: '-250px'}}>Email:</h2> 
                    {
                        (this.props.yours) ? <p style={{display: 'inline', }}>{this.props.email}</p> : <a style={{display: 'inline', paddingRight: '50px'}} href={this.props.mail}>{this.props.email}</a>
                    }
                    <br></br>
                    <br></br>
                    <h2 style={{display: 'inline', paddingLeft: '50px',  marginLeft: '-500px'}}>Rating:</h2>
                    {
                        this.props.follows ? <p style={{display: 'inline',}}>{this.props.studentRating}/5.0 </p> : <p></p>
                    }
                                    
                    <br></br>
                    {
                        (this.props.tutor) ? <><h2 style={{display: 'inline', marginLeft: '-380px'}}>Price:</h2><p style={{display: 'inline'}}>${this.props.price}/hour</p> 
                        <br></br>
                        <br></br>
                        <h2 style={{display: 'inline', marginLeft: '-325px'}}>Tutor Rating:</h2><p style={{display: 'inline'}}>{this.props.tutorRating}/5.0</p>
                        <br></br>
                        <br></br>
                        <h2 style={{display: 'inline', marginLeft: '-420px'}}>Venmo:</h2><p style={{display: 'inline'}}>@{this.props.venmo}</p>

                        </>
                        : <span></span>
                    }
                    </div>
                    <br></br>
                    <br></br>
                    
            </section>
        )
    }
}

export default About