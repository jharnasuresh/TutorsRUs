import React, { useEffect, useState } from "react";
import "./Search.css"
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Search({GlobalState, placeholder, data}) {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({sort: "rating", order: "desc"});
    const [filterGenre, setFilterGenre] = useState([])
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getAllMovies = async () => {
            try {
                const url = `${"hello"}?page=${page}&sort=${sort.sort},${sort.order}
                    &genre=${filterGenre.toString()}&search=${search}`
                const {data} = await axios.get(url);
                setObj(data);
                console.log(data);
            } catch(err) {
                console.log(err);
            }
        };
        getAllMovies();
    }, [sort, filterGenre, page, search]);

    //const [filteredData, setFilteredData] = useState[{}];
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

    const [users, setUsers] = useState("");
    const [none, setNone] = useState(false);


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
                    setNone(true)
                }
                else {
                    // list tutors
                    setNone(false);
                    let i = 0;
                    let u = "";
                    while (i < res.length) {
                        console.log(res[i]);
                        u += res[i] + ", ";
                        i++;
                    }
                    setUsers(u)
                    
                    //setUsers(u)
                    
                }

                // this is temp
            })


    }

    return (
        <div className="App search">
            <div className="wrapper">
                <div className="container">
                    <div className="body">
                        <div className="table_container"></div>
                        <div className="filter_container"></div>
                    </div>
                </div>
            </div>
            
            <div className="searchInputs">

                <input type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)}/>
                <div className="searchIcon">
                    <button type="link-btn" onClick={handleSubmit}><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            {
                none ? <h1 style={{color: 'red'}}>No available tutors</h1> : <p>{users}</p>
            }
        </div>
    )
}

export default Search;