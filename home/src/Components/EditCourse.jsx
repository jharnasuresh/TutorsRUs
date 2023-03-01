import React, { Component } from 'react'
import { useState } from "react"
import  './Main.css'


export const EditCourse = ({ GlobalState }) => {
        const [title, setTitle] = useState('');
        const [professor, setProfessor] = useState('');
        const [semester, setSemester] = useState('');
        
        return (
            <div className="App EditCourse">
                <h1> Edit Courses </h1>
            <section id="container-editcourse" className="container-editcourse">
                <label for="title:">Class Title: </label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="title" placeholder="Enter Course Title" id="title" name="title" />
                <br></br>
                <label for="title:">Class Professor: </label>
                <input value={professor} onChange={(e) => setProfessor(e.target.value)} type="professor" placeholder="Enter Course Professor" id="professor" name="professor" />
                <br></br>
                <label for="title:">Class Semester: </label>
                <input value={semester} onChange={(e) => setSemester(e.target.value)} type="semester" placeholder="Enter Course Semester" id="semester" name="semester" />
                <br></br>
            </section>
            <button type="submit" className="editcourse-add" >Add Course</button>
            <button type="submit" className="editcourse-delete" >Delete Course</button>
            
            <h1 className="currenth1">Current Courses</h1>
            <section id="container-currentcourse" className="container-currentcourse">
                <p>CS 307</p>
                <p>CS 252</p>
                <p>MA 262</p>
            </section>
            </div>
        );
}


export default EditCourse