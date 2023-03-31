import React, { Component } from 'react'
import { useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import './Main.css'


export const EditCourseTutor = ({ GlobalState }) => {
    const [title, setTitle] = useState('');
    const [professor, setProfessor] = useState('');
    const [semester, setSemester] = useState('');
    const [grade, setGrade] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    //console.log(JSON.stringify(Object.values(location.state.taken)))
    console.log(location.state.tutor)

    var printing = "";

    if (location.state.taken != undefined) {
        function p (str) {
            printing+=str.title + "-" + str.professor + "-" + str.semester + "-" + str.grade + ", "
        }
        Object.values(location.state.taken).forEach(p)
    }

    
    console.log("pritning " + printing)

    var tut = (location.state.tutor) ? "tut"  : "";

    const handleAdd = () => {

        console.log("adding")

        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({"title": title, "prof": professor, "semester": semester, "u": location.state.u, "grade": grade });

        fetch('http://localhost:3001/addcoursetutor', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                console.log(res["fname"] + " " + res.u)
                navigate("/EditCourseTutor", {
                    state: {
                        u: location.state.u, 
                        tutor: res["tutor"],
                        taken: res["taken"]
                    }
                });
            })

    }

    const handleDelete = () => {

        console.log("deleting")

        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({"title": title, "u": location.state.u });

        fetch('http://localhost:3001/deletecoursetutor', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                console.log(res["fname"] + " " + res.u)
                navigate("/EditCourseTutor", {
                    state: {
                        u: location.state.u, 
                        tutor: res["tutor"],
                        taken: res["taken"]
                    }
                });
            })

    }

    return (
        <div className="App EditCourse">
            <h1 className='editcourseh1tutor'> Edit Courses </h1>
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
                <label for="title:">Grade Recieved: </label>
                <input value={grade} onChange={(e) => setGrade(e.target.value)} type="grade" placeholder="Enter Grade Receieved" id="semester" name="grade" />
                <br></br>
            </section>
            <button type="submit" className="editcourse-add" onClick={handleAdd}>Add Course</button>
            <button type="submit" className="editcourse-delete" onClick={handleDelete}>Delete Course</button>

            <h1 className="currenth1">Past Courses</h1>
            <section id="container-currentcourse" className="container-currentcourse">
                {
                    Object.entries(location.state.taken).length === 0 ? "" : <p>{printing}</p>
                }
                
            </section>
        </div>
    );
}


export default EditCourseTutor