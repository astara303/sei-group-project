import React from 'react'

const Search = ({ basicSearchFunction }) => (

  <form onSubmit={(e) => e.preventDefault()}>
    <div className="SearchBar">
      <div className="control has-icons-left">
        <input className="input" placeholder="Search By Postcode" onChange={basicSearchFunction}/>
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </div>
  </form>

)

export default Search