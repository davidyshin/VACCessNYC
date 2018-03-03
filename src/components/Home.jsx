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
      selectedId: "",
      displayResult: false,
      data: [],
      zipCoords: []
    };
  }
  handleSelect = e => {
    this.setState({selectedId: e.target.id})
    console.log("hello")
  }
  handleSubmit = e => {
    e.preventDefault();
    axios
      .get("https://data.cityofnewyork.us/resource/inaf-e6a5.json")
      .then(res => {
        this.setState({ data: res.data });
      });
    if (this.state.data.length > 0) {
      this.setState({ displayResult: true });
    }
  };

  handleZipCode = e => {
    e.preventDefault();
    axios
      .get(`https://data.cityofnewyork.us/resource/inaf-e6a5.json?zip_code=${this.state.zip}`)
      .then(res => {
        this.setState({ data: res.data })
      })
      if (this.state.data.length > 0) {
        this.setState({ displayResult: true });
      }
  }

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
    
    if (this.state.displayResult) {
      return (
        <div className="results-page-container">
          <div className="map-container">
          <Map data={data} handleSelect={this.handleSelect}/>
          </div>
          <div className="list-container">
          <List data={data} id={this.state.selectedId}/>
          </div>
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
