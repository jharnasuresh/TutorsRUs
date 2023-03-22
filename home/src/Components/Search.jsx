import React, { useState } from "react";
import "./Search.css"
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, Link, useNavigate } from "react-router-dom";


function Search({GlobalState, placeholder, data}) {
    const [open, setOpen] = useState(false);
    const [filterData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const handleFilter = (event) => {
        const searchWord = event.target.value
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase);
        });
        if (searchWord === "") {
            setFilteredData([])
        }
        else {
            setFilteredData(newFilter);
        }
    }

    console.log(location.state.none)

    const handleSubmit = (e) => {
        console.log("searching for " + search)
        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "course": search });

        fetch('http://localhost:3001/searchcoursetitle', { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res === "none") {
                    // no tutors
                    console.log("none here")
                    navigate("/Search", {state: {none: true}});
                }
                else {
                    // list tutors
                    navigate("/Search", {state: {none: false}});
                }

                // this is temp
            })

    }

    return (
        <div className="App search">
            
            <div className="searchInputs">

                <input type="text" placeholder="Search..." /*data={filename}*/ onChange={handleFilter}/>
                <div className="searchIcon">
                    <button type="link-btn" onClick={() => setOpen(!open)}><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            {
                location.state.none && <h1 style={{color: 'red'}}>No available tutors</h1>
            }
        </div>
    )
}

export default Search;