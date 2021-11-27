import { useState } from "react";
import ReactMapGL, { Marker, marker, Popup, popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

export default function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  //   transform the searh result object into the  {latitude, longitude} object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //   The latitude of the center of locations coordinates
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    width: "100%",
    height: "100%",
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/tsijones/ckwhsmyn91leu14qf7mx24d4n"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker latitude={result.lat} longitude={result.long}>
            <p
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
              onClick={() => setSelectedLocation(result)}
            >
              📌
            </p>
          </Marker>
          {/* this is the popup that should show if we click on a marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              close={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}
