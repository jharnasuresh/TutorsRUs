import React, { Component } from 'react'
import  './Main.css'

class CourseInfo extends Component {
    render() {
        return (
            <section id="container-course" className="container-course">
                    <h1>Courses taking:</h1> 
                    <br></br>
                    <p>
                        {this.props.courses.toString()}
                    </p>
            </section>
        )
    }
}

export default CourseInfo