import React, { Component } from 'react'
import  './Main.css'

class CourseInfo extends Component {
    render() {
        return (
            <section id="container-course" className="container-course">
                {
                    (this.props.past) ? <h1>Courses Offering</h1>: <h1>Courses taking:</h1> 
                }
                    <br></br>
                    <p>
                    {this.props.courses}
                    </p>
            </section>
        )
    }
}

export default CourseInfo