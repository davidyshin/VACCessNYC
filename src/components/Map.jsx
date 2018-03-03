import React from "react";
import needle from "../images/needle.png";
import GoogleMapReact from "google-map-react";

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      center: { lat: 40.737975, lng: -73.8801301 },
      zoom: 11
    };
  }
  // pins to render on map
  mapPin = () => {
   return <img className="map-pin" alt="" src={needle} />;
  };
  render() {
    return (
      // Google Maps Container
      <div className="map-container">
        <GoogleMapReact
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {/*Map pins according to data here*/}
          <this.mapPin lat={40.7127753} lng={-73.8801301} image={needle} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
