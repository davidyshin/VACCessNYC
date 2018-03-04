import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map.jsx";
import Search from "./Search.jsx";
import List from "./List.jsx";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import validZips from "./validZips";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      zip: "",
      message: "",
      displayResult: false,
      data: [],
      hoveredId: "",
      center: ""
    };
  }

  selectId = e => {
    this.setState({ id: e.target.id });
  };
  handleSubmit = e => {
    e.preventDefault();
    axios
      .get("https://data.cityofnewyork.us/resource/inaf-e6a5.json")
      .then(res => {
        this.setState({
          data: res.data
        });
      });
  };

  handleZipCode = e => {
    e.preventDefault();
    axios
      .get(
        `https://data.cityofnewyork.us/resource/inaf-e6a5.json?zip_code=${
          this.state.zip
        }`
      )
      .then(pharm => {
        this.setState({ data: pharm.data });
      });
  };
  handleHover = e => {
    this.setState({
      hoveredId: e.target.id
    });
  };

  handleUnhover = e => {
    this.setState({
      hoveredId: ""
    });
  };

  handleInput = e => {
    this.setState({
      zip: e.target.value,
      message: validZips.includes(Number(e.target.value))
        ? ""
        : "Hmm, that zip code doesn't seem to be in NYC. Please try again."
    });
  };

  DisplayResultPage = () => {
    const { data } = this.state;
    const { zip, message } = this.state;
    const buttonText = zip ? "Search" : "See all pharmacies";

    if (this.state.data.length > 0) {
      return (
        <div>
          <div>
            <nav className="App-nav">
              <div className="map-title-div">
                <h1> VACCess NYC </h1>
              </div>
              <div className="map-search-div">
                  <form onSubmit={ zip ? this.handleZipCode : this.handleSubmit } className="map-search-tool">
                    <input
                      className="map-search"
                      type="search"
                      placeholder="All of NYC or Enter a Zip Code"
                      onChange={this.handleInput}
                      value={zip}
                    />
                    <button
                      onSubmit={this.handleSubmit}
                      className="map-submit"
                      type="submit"
                    >
                      {buttonText}
                    </button>
                  </form>
                </div>
            </nav>
          </div>
          <div className="map-page">
            <Map hoveredId={this.state.hoveredId} data={data} />
            <List
              selectId={this.selectId}
              handleHover={this.handleHover}
              handleUnhover={this.handleUnhover}
              data={data}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <header className="App-header">
            <h1>
              <span className="App-title"> VACCess NYC </span>
            </h1>
          </header>
          <Search
            message={message}
            buttonText={buttonText}
            zip={this.state.zip}
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
            handleZipCode={this.handleZipCode}
          />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <this.DisplayResultPage />
      </div>
    );
  }
}

export default Home;
