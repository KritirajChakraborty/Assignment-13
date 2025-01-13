import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./GoogleMaps.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "5px",
};

const GoogleMaps = ({ center }) => {
  const apiKey = import.meta.env.VITE_GOOGLEMAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const target = { lat: center[0], lng: center[1] };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={target}
        options={{
          gestureHandling: "cooperative",
          fullscreenControl: false,
          mapTypeControl: false,
        }}
      >
        <Marker position={target} />
      </GoogleMap>
    </div>
  );
};

export default GoogleMaps;
