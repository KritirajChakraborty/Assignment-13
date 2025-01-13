import { useParams } from "react-router-dom";
import hotelData from "../data.json";
import "./PropertyDetails.css";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import GoogleMaps from "../components/GoogleMaps";
import ImageSlider from "../components/ImageSlider";

const hotelDetails = () => {
  const [selectedType, setSelectedType] = useState("House");

  const data = [...hotelData];
  const params = useParams();
  const id = Number(params.id);
  const hotel = data.find((_, index) => index == id);

  return (
    <div className="hotel-details__container">
      <div
        style={{
          height: "600px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ImageSlider hotel={hotel} />
      </div>

      <div className="hotel-details">
        <div className="hotel-details__header-container">
          <div className="hotel-details__header">
            <span className="hotel-details__name">{hotel.name}</span>
            <span className="hotel-details__address">
              <FaLocationDot /> {hotel.address.slice(0, 15)}
            </span>
          </div>
          <div className="hotel-details__header">
            <span className="hotel-details__price">1.5 Cr</span>
            <span className="hotel-details__emi">EMI Available</span>
          </div>
        </div>

        <div className="hotel-details__location">
          <h3 className="hotel-details__location-title">Location</h3>
          <div className="hotel-details__location-address">
            <span className="hotel-details__location-icon">
              <HiOutlineLocationMarker />
            </span>
            {hotel.address}
          </div>
        </div>
      </div>
      <GoogleMaps center={hotel.location} />
      <div className="hotel-amenities">
        {/* Amenities Section */}
        <div className="hotel-amenities__nearby">
          <span className="hotel-amenities__item">2 Hospital</span>
          <span className="hotel-amenities__item">4 Gas stations</span>
          <span className="hotel-amenities__item">2 Schools</span>
        </div>

        <h3 className="hotel-amenities__title">Property Amenities</h3>
        <div className="hotel-amenities__types">
          <button
            className={`hotel-amenities__type ${
              selectedType === "House" ? "hotel-amenities__type--selected" : ""
            }`}
            onClick={() => setSelectedType("House")}
          >
            House
          </button>
          <button
            className={`hotel-amenities__type ${
              selectedType === "Apartment"
                ? "hotel-amenities__type--selected"
                : ""
            }`}
            onClick={() => setSelectedType("Apartment")}
          >
            Apartment
          </button>
        </div>
      </div>
    </div>
  );
};

export default hotelDetails;
