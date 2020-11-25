import React from 'react'


const Search = ({onSearchInput}) =>{
    return(
        <div className='search'>
            <h2 className='searchTitle'>Search</h2>
            <input onChange={(e)=>onSearchInput(e.target.value)} className='searchInput' type="text"/>
        </div>
    )
}

export default Search