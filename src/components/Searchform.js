import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useGlobalBookContext } from '../bookcontext';


function Searchform() {
    const { search, setSearch, fetchBooks } = useGlobalBookContext()
    const handleSubmit = e => {
      e.preventDefault();
      if(search) fetchBooks()
        
    }
  return (
    <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='search by author or title...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='form-input'
          />
          <button type='submit' className='submit_btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
  )
}

export default Searchform