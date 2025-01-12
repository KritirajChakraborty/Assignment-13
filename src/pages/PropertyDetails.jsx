import { useParams } from "react-router-dom";
import hotelData from "../data.json";
import "./PropertyDetails.css";
import { useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import GoogleMaps from "../components/GoogleMaps";

const hotelDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartRef = useRef({});
  const isTwoFingerSwipe = useRef(false);
  const [selectedType, setSelectedType] = useState("House");

  const data = [...hotelData];
  const params = useParams();
  const id = Number(params.id);
  const hotel = data.find((_, index) => index == id);

  // Handle touch start
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      isTwoFingerSwipe.current = true;
      touchStartRef.current = {
        x1: e.touches[0].clientX,
        y1: e.touches[0].clientY,
        x2: e.touches[1].clientX,
        y2: e.touches[1].clientY,
      };
    } else {
      isTwoFingerSwipe.current = false;
    }
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!isTwoFingerSwipe.current || e.touches.length !== 2) return;

    const x1 = e.touches[0].clientX;
    const x2 = e.touches[1].clientX;

    // Detect swipe direction based on the change in the first finger's X position
    const swipeDistance = Math.abs(x1 - touchStartRef.current.x1);

    if (swipeDistance > 50) {
      if (x1 < touchStartRef.current.x1) {
        // Swipe left
        nextImage();
      } else {
        // Swipe right
        prevImage();
      }
      isTwoFingerSwipe.current = false; // Prevent multiple triggers in one gesture
    }
  };

  const handleTouchEnd = () => {
    // Reset states after touch ends
    isTwoFingerSwipe.current = false;
    touchStartRef.current = {};
  };

  // Go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="hotel-details__container">
      <div className="hotel-card__image-container">
        <div
          ref={touchStartRef}
          className="hotel-card__slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {hotel.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${hotel.name} - Image ${index + 1}`}
              className={`hotel-card__image ${
                currentImageIndex === index ? "hotel-card__image--active" : ""
              }`}
              draggable="false"
            />
          ))}
        </div>
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
      <div className="property-amenities">
        {/* Amenities Section */}
        <div className="property-amenities__nearby">
          <span className="property-amenities__item">2 Hospital</span>
          <span className="property-amenities__item">4 Gas stations</span>
          <span className="property-amenities__item">2 Schools</span>
        </div>

        <h3 className="property-amenities__title">Property Amenities</h3>
        <div className="property-amenities__types">
          <button
            className={`property-amenities__type ${
              selectedType === "House"
                ? "property-amenities__type--selected"
                : ""
            }`}
            onClick={() => setSelectedType("House")}
          >
            House
          </button>
          <button
            className={`property-amenities__type ${
              selectedType === "Apartment"
                ? "property-amenities__type--selected"
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
