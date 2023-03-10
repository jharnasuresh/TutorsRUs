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

    console.log(JSON.stringify(Object.values(location.state.taking)))

    var printing = "";

    function p (str) {
        printing+=str.title + "-" + str.professor + "-" + str.semester + ", "
    }
    Object.values(location.state.taking).forEach(p)
    console.log("pritning " + printing)

    var tut = (location.state.tutor) ? "tut"  : "";
    const handleAdd = () => {

        console.log("adding")

        const headers = { "content-type": "application/json" };
        //var add = " " + title + "-" + professor + "-" + semester;
        const requestData = JSON.stringify({"title": title, "prof": professor, "semester": semester, "u": location.state.u });

        fetch('http://localhost:3001/addcourse', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                console.log(res["fname"] + " " + res.u)
                navigate("/EditCourse", {
                    state: {
                        u: location.state.u, 
                        courses: res["courses"],
                        tutor: res["tutor"]
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
                        courses: res["courses"] ,
                        tutor: res["tutor"]
                        taking: res["taking"]
                    }
                });
            })

    }

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
                {
                    Object.entries(location.state.taking).length === 0 ? "" : <p>{printing}</p>
                }
                
            </section>
            {tut === 'tut' &&
                <section id="container-editcoursetutor" className="container-editcoursetutor">
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
            }
        </div>
    );
}


export default EditCourse