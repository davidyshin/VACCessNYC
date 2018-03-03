import React from "react";
import ReactDOM from "react-dom";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleSubmit = e => {

  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
      <input
        className="home-search"
        type="search"
        placeholder="All of NYC or Enter a Zip Code"
      />
      <button className="home-submit" type="submit"> </button>
      </form>
    );
  }
}

export default Home;
