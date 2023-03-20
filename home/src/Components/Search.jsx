import React, { useState } from "react";
import "./Search.css"
import SearchIcon from '@mui/icons-material/Search';

function Search({GlobalState, placeholder, data}) {
    const [open, setOpen] = useState(false);
    const [filterData, setFilteredData] = useState([]);
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