import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import meteorData from "./data/meteorLandings.json";
import "mapbox-gl/dist/mapbox-gl.css";

import "./App.css";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    width: "100%",
    height: "100vh",
    zoom: 1,
    projection: "naturalEarth",
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMouseOverMarker, setIsMouseOverMarker] = useState(false);

  return (
    <div className="map">
      <ReactMapGL
        style={{ width: "100%", height: "600px" }}
        {...viewport}
        mapboxAccessToken="pk.eyJ1IjoidnVrYXM4NiIsImEiOiJjbGw5ZDNsa3EwcDVxM2tvNmttMWN0eXVwIn0.dlIdV5eWP41VW-JMF9Cs3Q"
        mapStyle="mapbox://styles/vukas86/cllb59ak700rx01ph0ubc24af"
        onViewportChange={(newViewport) => setViewport(newViewport)}
      >
        {meteorData.map((item) => {
          if (item.geolocation) {
            return (
              <Marker
                key={item.id}
                latitude={parseFloat(item.geolocation.latitude)}
                longitude={parseFloat(item.geolocation.longitude)}
              >
                <button
                  className="marker-btn"
                  onMouseOver={() => {
                    setSelectedLocation(item);
                    setIsMouseOverMarker(true);
                  }}
                  onMouseLeave={() => {
                    setSelectedLocation(null);
                    setIsMouseOverMarker(false);
                  }}
                ></button>
              </Marker>
            );
          }
          return null;
        })}

        {isMouseOverMarker && selectedLocation && (
          <Popup
            latitude={parseFloat(selectedLocation.geolocation.latitude)}
            longitude={parseFloat(selectedLocation.geolocation.longitude)}
          >
            <div>
              <p>Name: {selectedLocation.name}</p>
              {selectedLocation.year && (
                <p>Year: {new Date(selectedLocation.year).getFullYear()}</p>
              )}
              <p>Mass: {selectedLocation.mass}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
