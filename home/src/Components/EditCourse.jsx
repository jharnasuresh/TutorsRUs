import React, { Component } from 'react'
import { useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import './Main.css'


export const EditCourse = ({ GlobalState }) => {
    const [title, setTitle] = useState('');
    const [professor, setProfessor] = useState('');
    const [semester, setSemester] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleAdd = () => {

        console.log("adding")

        const headers = { "content-type": "application/json" };
        var add = " " + title + "-" + professor + "-" + semester;
        const requestData = JSON.stringify({"title": add, "u": location.state.u });

        fetch('http://localhost:3001/addcourse', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                console.log(res["fname"] + " " + res.u)
                navigate("/EditCourse", {
                    state: {
                        u: location.state.u, 
                        taking: res["taking"]
                    }
                });
            })

    }

    const handleDelete = () => {

        console.log("deleting")

        const headers = { "content-type": "application/json" };
        var add = " " + title + "-" + professor + "-" + semester;
        const requestData = JSON.stringify({"title": add, "u": location.state.u });

        fetch('http://localhost:3001/deletecourse', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                console.log(res["fname"] + " " + res.u)
                navigate("/EditCourse", {
                    state: {
                        u: location.state.u, 
                        taking: res["taking"]
                    }
                });
            })

    }

    console.log(typeof location.state.taking)

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
            <button type="submit" className="editcourse-add" onClick={handleAdd}>Add Course</button>
            <button type="submit" className="editcourse-delete" onClick={handleDelete}>Delete Course</button>

            <h1 className="currenth1">Current Courses</h1>
            <section id="container-currentcourse" className="container-currentcourse">
                <p>{location.state.taking.toString()}</p>
            </section>
        </div>
    );
}


export default EditCourse