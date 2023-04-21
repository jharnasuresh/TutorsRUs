import React, { Component } from 'react'
import  './Main.css'
import { black } from 'tailwindcss/colors'
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
                    <h2 style={{display: 'inline', textAlign: "center",marginLeft: '-265px'}}>Primary Language: </h2> 

                    <p style={{display: 'inline'}}>{ this.props.lang === "" ? "English" : this.props.lang} </p>
                    <br></br>
                    <h2 style={{display: 'inline' , marginLeft: '-260px', color: black}}>Email: </h2> 
                    {
                        (this.props.yours) ? <p style={{display: 'inline', }}>{this.props.email}</p> : <a style={{display: 'inline', paddingRight: '50px'}} href={this.props.mail}>{this.props.email}</a>
                    }
                    <br></br>
                    <h2 style={{display: 'inline', paddingLeft: '178px',  marginLeft: '-550px'}}>Rating: </h2>
                    {
                        (this.props.follows || this.props.yours) ? <p style={{display: 'inline',}}>{this.props.studentRating}/5.0 </p> : <p></p>
                    }
                                    
                    <br></br>

                    {
                        (this.props.tutor) ? <><h2 style={{display: 'inline', marginLeft: '-390px'}}>Price: </h2><p style={{display: 'inline'}}>${this.props.price}/hour</p> 
                        <br></br>
                        <h2 style={{display: 'inline', marginLeft: '-325px'}}>Tutor Rating: </h2><p style={{display: 'inline'}}>{this.props.tutorRating}/5.0</p>
                        <br></br>
                        <br/>
                        
                      
                        {
                          (this.props.yours) ? <></> : <><h2 style={{display: 'inline'}}>Venmo: </h2><p style={{display: 'inline'}}>@{this.props.venmo}</p></>
                        
                        }
                        {
                        (this.props.yours) ? <></> : <button style={{border: "solid", marginLeft: '100px'}}onClick={() => window.location = 'mailto:'+this.props.email+"?cc=tutorsrus62@gmail.com"}>Request a Refund</button>
                        }

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