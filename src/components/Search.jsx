import React from "react";
import banner from "../images/banner.png";

const Search = props => {
  return (
    <div>
    <h1> Hello There! </h1>
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
      <img className="banner-image" src={banner}/>
    </div>
  );
};


export default Search