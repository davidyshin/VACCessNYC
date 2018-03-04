import React from "react";
import needle from "../images/needle.png";
import axios from "axios";
import data from "../data/mock.json";
import GoogleMapReact from "google-map-react";

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      zoom: 12,
      data: [],
      center: { lat: 40.737975, lng: -73.8801301 },
      id: ""
    };
  }

  // pins to render on map
  mapPin = ({ pharm, onClick }) => {
    return (
      <div className="pin-container">
        <div className={pharm.a === this.props.hoveredId ? "pin-info" : "hidden"}>
          <h1 className="pin-pharm-facility-name">{pharm.facility_name}</h1>
          <p id={pharm.a}>
            <span className="italics">Address:</span>{" "}
            {pharm.address + " " + pharm.borough + " " + pharm.zip_code}
          </p>
          <p id={pharm.a}>
            <span className="italics">Contact:</span> {pharm.phone}
          </p>
          <p id={pharm.a}>
            <span className="italics">Vaccines for kids:</span> {pharm.children}
          </p>
        </div>
        <img
          id={pharm.a}
          onClick={onClick}
          className="map-pin"
          alt=""
          src={needle}
        />
      </div>
    );
  };

  renderPin = pin => {
    console.log(
      pin.location.coordinates[1].toString(),
      pin.location.coordinates[0].toString()
    );
    return (
      <this.mapPin
        pharm={pin}
        lat={pin.location.coordinates[1].toString()}
        lng={pin.location.coordinates[0].toString()}
        id={pin.a}
        image={needle}
      />
    );
  };

  render() {
    const { data } = this.props;
    return (
      // Google Maps Container
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBa5tRyQAmC5MmyqK-bpMGJa7dRTHlyxus"
          }}
       
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {/*Map pins according to data here*/}
          {data.map(this.renderPin)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
