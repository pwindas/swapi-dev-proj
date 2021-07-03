import React from 'react';

const Search = ({ handleChange }) =>{
    return (
        <input type='search'
        className='search'
        placeholder="Enter character name ..."
        onChange = {handleChange}
        />
    )
}

export default Search;