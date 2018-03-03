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
      zipCoords: []
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
        this.setState({ data: res.data});
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
      .then(res => {
        this.setState({ data: res.data});
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
        <div className="map-page">
          <Map selectId={this.selectId} data={data} />
          <List id={this.state.id} data={data} />
        </div>
      );
    } else {
      return (
        <Search
          message={message}
          buttonText={buttonText}
          zip={this.state.zip}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          handleZipCode={this.handleZipCode}
        />
      );
    }
  };

  render() {
    console.log(this.state);

    return (
      <div>
        <this.DisplayResultPage />
      </div>
    );
  }
}

export default Home;
