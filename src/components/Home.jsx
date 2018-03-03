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
      <div>
        <form onSubmit={this.handleSubmit} className="search-tool">
      <input
        className="home-search"
        type="search"
        placeholder="All of NYC or Enter a Zip Code"
      />
      <button className="home-submit" type="submit"> Search </button>
      </form>
      </div>
    );
  }
}

export default Home;
