import { useEffect, useState } from "react";
import GoogleMaps from "../components/GoogleMaps";

const Map = () => {
  const [mylocation, setMyLocation] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          console.log(typeof latitude);
          setMyLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div style={{ marginTop: "20px", padding: "10px", marginBottom: "100px" }}>
      <h2 style={{ fontSize: "20px", textAlign: "center" }}>
        Dear User, This is your location😊
      </h2>
      <GoogleMaps center={mylocation} />
    </div>
  );
};

export default Map;
