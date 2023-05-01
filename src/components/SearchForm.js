import React from 'react'

const SearchForm = (props) => {
  return (
    <form className='search' onSubmit={props.handleSearchSubmit}>
      <label htmlFor='searchInput'>Search</label>
      <input 
        name='searchInput'
        placeholder='input'
        value={props.searchInput}
        onChange={props.handleSearchChange}
      />

      <label htmlFor='sort'>Sort:</label>
      <select name='sort' id='sort'>
        <option value='date_asc'>By date ascending</option>
        <option value='date_des'>By date descending</option>
        <option value='a_z'>By title A - Z</option>
        <option value='z_a'>by title Z - A</option>
      </select>

      <input type='submit' className='submit-button' value='Submit' />
    </form>
  )
}

export default SearchForm