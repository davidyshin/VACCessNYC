import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map.jsx"

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleSubmit = e => {};

  render() {
    return (
      <div>
        <div className="home-container">
          <form onSubmit={this.handleSubmit}>
            <input
              className="home-search"
              type="search"
              placeholder="All of NYC or Enter a Zip Code"
            />
            <button className="home-submit" type="submit">
              {" "}
            </button>
          </form>
        </div>

      </div>
    );
  }
}

export default Home;
