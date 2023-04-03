import React from 'react'

const SearchForm = (props) => {
  return (
    <form className='search' onSubmit={props.handleSearchSubmit}>
      <label>Search</label>
      <input 
        name='searchInput'
        placeholder='input'
        value={props.searchInput}
        onChange={props.handleSearchChange}
      />
      <input type='submit' className='submit-button' value='Submit' />
    </form>
  )
}

export default SearchForm