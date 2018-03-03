import React from "react";

const Search = props => {
  return (
    <div>
      <form onSubmit={props.zip ? props.handleZipCode : props.handleSubmit} className="search-tool">
        <input
          className="home-search"
          type="search"
          placeholder="All of NYC or Enter a Zip Code"
          onChange={props.handleInput}
          value={props.zip}
        />
        <button
          onSubmit={props.handleSubmit}
          className="home-submit"
          type="submit"
        >
          {props.buttonText}
        </button>
      </form>
      <span className="home-message">{props.message}</span>
    </div>
  );
};

export default Search