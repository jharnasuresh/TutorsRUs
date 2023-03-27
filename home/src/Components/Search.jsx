import React, { useEffect, useState } from "react";
import "./Search.css"
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from './Table'
import Sort from './Sort'
import Genre from './Genre'

const base_url = process.env.REACT_APP_API_URL;

function Search({ GlobalState, placeholder, data }) {
    const [obj, setObj] = useState({});
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [filterData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [searchBy, setSearchBy] = useState('courses')
    const { currUser, setCurrUser } = GlobalState;
    const [showErr, setShowErr] = useState(false);
    const [tutors, setTutors] = useState([]);
    const [filter, setFilter] = useState("")
    const [lang, setLang] = useState('')
    setCurrUser(location.state.u)

    console.log(location.state.u)


    const handleChange = (e) => {
        setSearchBy(e.target.value)
        setShowErr(false)
    }

    const [users, setUsers] = useState("");
    const [none, setNone] = useState(false);

    const handleSubmit = (e) => {
        setShowErr(false)
        setSearchBy(document.getElementsByName("search-by").value)
        //setFilter(document.getElementsByName('filter-by').value)
        console.log("filter " + filter + " lang: " + lang)

        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "data": search, "currUser": currUser, "filter": filter, "lang": lang });
        var url = "";


        if (searchBy === "courses") {
            if (search.includes(",")) {
                // search for multiple courses
                console.log(search.split(", "))
                url = 'http://localhost:3001/searchmultiplecourses';

            } else {
                url = 'http://localhost:3001/searchcoursetitle';
            }
        }
        else if (searchBy === "tutor") {
            if (search.includes(",")) {
                setShowErr(true)
                setSearchBy(searchBy)
                setUsers("")
                return;
            }
            url = 'http://localhost:3001/searchtutorname'
        }
        else { //searchby = prof
            if (search.includes(",")) {
                setShowErr(true)
                setSearchBy(searchBy)
                setUsers("")
                return;
            }
            url = 'http://localhost:3001/searchprofname'
        }


        fetch(url, { method: 'POST', body: requestData, headers: headers })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setSearchBy(searchBy)
                if (res === "none") {
                    // no tutors
                    console.log("none here")
                    setNone(true)
                    setTutors([])
                }
                else {
                    // list tutors
                    setNone(false);

                    setTutors(res)


                }

            })

    }

    return (

        <div className="App search">

            <br></br>

            {
                searchBy !== 'courses' ? <span></span> : <h4>*When searching for multiple classes, use a comma to separate each one (ex: CS180, CS182)</h4>
            }




            <div className="searchInputs">
                <form onChange={e => handleChange(e)}>
                    <div className="searchby">
                        <label for="courses" style={{ padding: '6px 20px' }}>Courses</label>
                        <input type="radio" id="courses" name="search-by" value="courses" style={{ height: '20px', width: '20px' }} />
                        <label for="tutor" style={{ padding: '6px 20px' }}>Tutor</label>
                        <input type="radio" id="tutor" name="search-by" value="tutor" style={{ height: '20px', width: '20px' }} />
                        <label for="professor" style={{ padding: '6px 20px' }}>Professor</label>
                        <input type="radio" id="Professor" name="search-by" value="Professor" style={{ height: '20px', width: '20px' }} />
                    </div>
                </form>

                <input className="searchbar" type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} />
                <button type="link-btn" onClick={handleSubmit}><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>

            {
                none ? <h1 style={{ color: 'red' }}>No available tutors</h1> : <span></span>
            }


            {
                showErr ? <h3 style={{ color: 'red' }}>Only search for one {searchBy} at a time.</h3> : <span></span>
            }
            <div className="wrapper">
                <div className="container">
                    <div className="body">
                        <div className="table_container">
                            <Table tutors={tutors} />
                        </div>
                        <div className="filter_container">

                            <form onChange={(e) => setFilter(e.target.value)}>

                                <h3>Sort By:</h3>
                                <input type="radio" id="priceLow" name="filter-by" value="priceLow" style={{ height: '20px', width: '20px' }} />
                                <label for="priceLow" style={{ paddingLeft: '5px' }}>Price: Low to High</label>
                                <br />
                                <input type="radio" id="priceHigh" name="filter-by" value="priceHigh" style={{ height: '20px', width: '20px' }} />
                                <label for="priceHigh" style={{ paddingLeft: '5px' }}>Price: High to Low</label>
                                <br />
                                <input type="radio" id="ratingLow" name="filter-by" value="ratingLow" style={{ height: '20px', width: '20px' }} />
                                <label for="ratingLow" style={{ paddingLeft: '5px' }}>Rating: Low to High</label>
                                <br />
                                <input type="radio" id="ratingHigh" name="filter-by" value="ratingHigh" style={{ height: '20px', width: '20px' }} />
                                <label for="ratingHigh" style={{ paddingLeft: '5px' }}>Rating: High to Low</label>
                                <h3>Filter By:</h3>
                                <input type="radio" id="thirty" name="filter-by" value="Thirty" style={{ height: '20px', width: '20px' }} />
                                <label for="thirty" style={{ paddingLeft: '5px' }}>Under $30</label>
                                <br />
                                <input type="radio" id="twenty" name="filter-by" value="Twenty" style={{ height: '20px', width: '20px' }} />
                                <label for="twenty" style={{ paddingLeft: '5px' }}>Under $20</label>
                                <br />
                                <input type="radio" id="ten" name="filter-by" value="Ten" style={{ height: '20px', width: '20px' }} />
                                <label for="ten" style={{ paddingLeft: '5px' }}>Under $10</label>
                                <br />
                                <input type="radio" id="ten" name="filter-by" value="Language" style={{ height: '20px', width: '20px' }} />
                                <label for="language" style={{ paddingLeft: '5px' }}>Primary Language</label>


                            </form>
                            <input style={{ borderStyle: 'solid', }} type="text" placeholder="Search..." onChange={(e) => setLang(e.target.value)} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;