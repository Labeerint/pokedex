import React from 'react'
import store from "../store";

const Search = () =>{
    return(
        <div className='search'>
            <h2 className='searchTitle'>Search</h2>
            <input onChange={(e)=>store.onSearchInput(e.target.value)} className='searchInput' type="text"/>
        </div>
    )
}

export default Search