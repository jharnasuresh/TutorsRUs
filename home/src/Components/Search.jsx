import React, { useEffect, useState } from "react";
import "./Search.css"
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


function Search({GlobalState, placeholder, data}) {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({sort: "rating", order: "desc"});
    const [filterGenre, setFilterGenre] = useState([])
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

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

    const [filteredData, setFilteredData] = useState[{}];
    const [open, setOpen] = useState(false);
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

    return (
        <div className="App search">
            <div className="searchInputs">
                <input type="text" placeholder="Search..." /*data={filename}*/ onChange={handleFilter}/>
                <div className="searchIcon">
                    <button type="link-btn" onClick={() => setOpen(!open)}><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
           {/* {setFilteredData.length != 0 && (
             <div className="dataResult">
                {filteredData.slice(0, 15).map((value, key) => {
                    return <a className="dataItem" /* href={value.blah}>
                        <p>{/*value.blah}</p>
                    </a>
                })} 
            </div> 
        )} */}
        </div>
    )
}

export default Search;