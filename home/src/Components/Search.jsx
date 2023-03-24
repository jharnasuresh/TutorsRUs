import React, { useEffect, useState } from "react";
import "./Search.css"
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from './Table'
import Sort from './Sort'
import Genre from './Genre'


function Search({ GlobalState, placeholder, data }) {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({ sort: "rating", order: "desc" });
    const [filterGenre, setFilterGenre] = useState([])
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [filterData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [searchBy, setSearchBy] = useState('Courses')
    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)

    console.log(location.state.u)


    /*useEffect(() => {
        const getAllMovies = async () => {
            try {
                const url = `${"hello"}?page=${page}&sort=${sort.sort},${sort.order}
                    &genre=${filterGenre.toString()}&search=${search}`
                const { data } = await axios.get(url);
                setObj(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        getAllMovies();
    }, [sort, filterGenre, page, search]);
*/
    //const [filteredData, setFilteredData] = useState[{}];
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

    const [users, setUsers] = useState("");
    const [none, setNone] = useState(false);

    const handleSubmit = (e) => {
        console.log("searching for " + search)
        setSearchBy(document.getElementsByName("search-by").value)
        console.log("search by: " + searchBy)

        const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "data": search });
        var url = "";


        if (searchBy == "Courses") {
            if (search.includes(",")) {
                // search for multiple courses
                console.log(search.split(", "))
                url = 'http://localhost:3001/searchmultiplecourses';
    
            } else {
                url = 'http://localhost:3001/searchcoursetitle';
            }
        }
        else if (searchBy == "Tutor") {
            url = 'http://localhost:3001/searchtutorname'
        }
        else { //searchby = prof
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
                    }
                    else {
                        // list tutors
                        setNone(false);
                        // TO BE FIXED WITH MORE DATA
                        let i = 0;
                        let u = "";
                        while (i < res.length) {
                            console.log(res[i]);
                            u += res[i] + ", ";
                            i++;
                        }
                        setUsers(u)


                    }

                })

    }

    return (

        <div className="App search">
            
            
            <div className="searchInputs">
    <form onChange={e => setSearchBy(e.target.value)}>
        <div className="searchby">
            <label for="courses" style={{padding: '6px 20px'}}>Courses</label>
            <input type="radio" id="courses" name="search-by" value="Courses" style={{height: '20px', width: '20px'}}/>
            <label for="tutor" style={{padding: '6px 20px'}}>Tutor</label>
            <input type="radio" id="tutor" name="search-by" value="Tutor" style={{height: '20px', width: '20px'}}/>
            <label for="professor" style={{padding: '6px 20px'}}>Professor</label>
            <input type="radio" id="Professor" name="search-by" value="Professor" style={{height: '20px', width: '20px'}}/>
            
        </div>
    </form>
            
            

                <input className="searchbar" type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} />

                    <button type="link-btn" onClick={handleSubmit}><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>

            {
                none ? <h1 style={{ color: 'red' }}>No available tutors</h1> : <p>{users}</p>
            }
            <div className="wrapper">
                <div className="container">
                    <div className="body">
                        <div className="table_container">
                            <Table movies = {obj.movies ? obj.movies : []}/>
                        </div>
                        <div className="filter_container">
                            <Sort sort={sort} setSort={(sort)=>setSort(sort)}/>
                            <Genre
                                filterGenre={filterGenre}
                                genres={obj.genres ? obj.genres:[]}
                                setFilterGenre={(genre) => setFilterGenre(genre)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;