import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map.jsx"

import validZips from "./validZips";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      zip: "",
      message: ""
    };
  }

  handleSubmit = e => {};
  handleSearchInput = e => {
    this.setState({
      zip: e.target.value,
      message: validZips.includes(Number(e.target.value))
        ? ""
        : "Hmm, that zip code doesn't seem to be in NYC. Please try again."
    });
  };

  render() {
    const { zip, message } = this.state;
    const btn = zip ? "Search" : "See all pharmacies";
    console.log(this.state);

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="search-tool">
          <input
            className="home-search"
            type="search"
            placeholder="All of NYC or Enter a Zip Code"
            onChange={this.handleSearchInput}
            value={zip}
          />
          <button className="home-submit" type="submit">
            {btn}
          </button>
        </form>
        <span className="home-message">{message}</span>
      </div>
    );
  }
}

export default Home;
