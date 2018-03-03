import React from "react";
import needle from "../images/needle.png";
import axios from "axios";
import data from "../data/mock.json";
import GoogleMapReact from "google-map-react";

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      center: { lat: 40.737975, lng: -73.8801301 },
      zoom: 14,
      data: []
    };
  }
  componentWillMount() {
    axios
      .get("https://data.cityofnewyork.us/resource/inaf-e6a5.json")
      .then(res => {
        this.setState({ data: res.data });
      });
  }
  // pins to render on map
  mapPin = ({ id, onClick }) => {
    return (
      <img id={id} onClick={onClick} className="map-pin" alt="" src={needle} />
    );
  };

  renderPin = pin => {
    return (
      <this.mapPin
        id={pin.facility_name}
        onClick={this.showName}
        lat={pin.location.coordinates[1].toString()}
        lng={pin.location.coordinates[0].toString()}
        image={needle}
      />
    );
  };

  render() {
    const { data } = this.state;
    return (
      // Google Maps Container
      <div>
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
      </div>
    );
  }
}

export default Map;
