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
      clickedPin: "",
      center: "",
      zoom: 12,
      forChild: false
    };
  }
  
  getLocation = e => {
    navigator.geolocation.getCurrentPosition((position) => {
        axios.get(`https://data.cityofnewyork.us/resource/inaf-e6a5.json?$where=within_circle(location,${position.coords.latitude},${position.coords.longitude},1610)`)
        .then(res=>{
          this.setState({data: res.data})
        })
    });
  }

  handleCheckboxChange = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

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
      hoveredId: e.target.id,
      clickedPin: ""
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

  pinClick = e => {
    this.setState({
      clickedPin: e.target.id
    });
    // let center = clicked
  };

  listClicked = e => {
    let clicked = this.state.data.find(el => el.a === e.target.id)
    console.log(clicked.location.coordinates)
    this.setState({
      center: {lat: clicked.location.coordinates[1], lng: clicked.location.coordinates[0]},
      zoom: 14,
      clickedPin: e.target.id
    })
    // this.setState({})
  }
  elseClick = e => {
    this.setState({
      clickedPin: ""
    });
  };

  DisplayResultPage = () => {
    const { data } = this.state;
    let renderData = !this.state.forChild
      ? data
      : data.filter(pharm => pharm.children === "Yes");
    const { zip, message } = this.state;
    const buttonText = zip ? "Search" : "See all locations";

    if (this.state.data.length > 0) {
      return (
        <div>
          <div>
            <nav className="App-nav">
              <div className="App-map-title">
                <a href="/">
                  {" "}
                  <h1 id="header-title"> (V)ACCESS NYC </h1>{" "}
                </a>
              </div>
              <div className="map-search-div">
                <form
                  onSubmit={zip ? this.handleZipCode : this.handleSubmit}
                  className="map-search-tool"
                >
                  <input
                    className="map-search"
                    type="search"
                    placeholder="Enter a Zip Code or..."
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
            <Map
              hoveredId={this.state.hoveredId}
              elseClick={this.elseClick}
              pinClick={this.pinClick}
              clickedPin={this.state.clickedPin}
              data={renderData}
              center={this.state.center}
              zoom={this.state.zoom}
            />

            <List
              selectId={this.selectId}
              handleHover={this.handleHover}
              handleUnhover={this.handleUnhover}
              listClicked={this.listClicked}
              clickedPin={this.state.clickedPin}
              handleCheckboxChange={this.handleCheckboxChange}
              data={renderData}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <header className="App-header">
            <h1>
              <span className="App-title"> (V)ACCESS NYC </span>
            </h1>
          </header>
          <div className="home-container">
            <Search
              message={message}
              getLocation={this.getLocation}
              buttonText={buttonText}
              zip={this.state.zip}
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}
              handleZipCode={this.handleZipCode}
            />
          </div>
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
