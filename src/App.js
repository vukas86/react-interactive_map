import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import meteorData from "./data/meteorLandings.json";
import "mapbox-gl/dist/mapbox-gl.css";

import infoIcon from "./assets/heroicons-info-basic.svg";

import "./App.css";

function App() {
  console.log(infoIcon);
  const [viewport, setViewPort] = useState({
    latitude: 32.1,
    longitude: -71.8,
    width: "100%",
    height: window.innerHeight,
    zoom: 1.2,
  });

  return (
    <ReactMapGL
      className="map"
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoidnVrYXM4NiIsImEiOiJjbGw3d2JqNjMwaHk1M21ybWcxbGwxa2tiIn0.drSVQlEPBuRcszaPlhunAw"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(newViewport) => setViewPort(newViewport)}
    >
      {meteorData.map((item) => {
        return (
          <Marker
            key={item.id}
            latitude={parseFloat(item.geolocation.latitude)}
            longitude={parseFloat(item.geolocation.longitude)}
          >
            <button className="marker-btn">
              <img src={infoIcon} alt="info icon" />
            </button>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}

export default App;
