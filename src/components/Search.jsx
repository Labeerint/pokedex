import React from 'react'
import store from "../store";
import {observer} from "mobx-react";

const Search = observer(() =>{
    const searchRequest = (searchValue) =>{
        store.onSearchInput(searchValue)
    }
    return(
        <div className='search'>
            <h2 className='searchTitle'>Search</h2>
            <input onChange={(e)=>searchRequest(e.target.value)} value={store.searchValue} className='searchInput' type="text"/>
        </div>
    )
})

export default Search