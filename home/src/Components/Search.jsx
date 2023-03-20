import React, { useState } from "react";
import "./Search.css"
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, Link, useNavigate } from "react-router-dom";


function Search({GlobalState, placeholder, data}) {
    const [filterData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
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
                }
                else {
                    // list tutors
                }

                // this is temp
                navigate("/Login");
            })

    }

    return (
        <div className="App search">
            <div className="searchInputs">
                <input type="text" placeholder="Search..." /*data={filename}*/ onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={handleSubmit}>Search</button>
                
            </div>
        </div>
    )
}

export default Search;