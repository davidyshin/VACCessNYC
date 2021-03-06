import React from "react";
import banner from "../images/banner.png";

const Search = props => {
  return (
    <div>
      <h2> Fight the Flu - Find a service center today!</h2>
      <form
        onSubmit={props.zip ? props.handleZipCode : props.handleSubmit}
        className="search-tool"
      >
        <input
          className="home-search"
          type="search"
          placeholder="Enter a Zip Code or..."
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
        <br/>
      </form>
      <button className="near-me-button"onClick={props.getLocation}>Find a location near me</button>
      <span className="home-message">{props.message}</span>
      <img className="banner-image" src={banner} />
    </div>
  );
};

export default Search;
