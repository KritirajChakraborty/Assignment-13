import { useRef, useState } from "react";
import { useWishlist } from "../context/wishlist-context";
import { FaHeart } from "react-icons/fa6";
import "./ImageSlider.css";
import { useLocation } from "react-router-dom";

const ImageSlider = ({ hotel }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toggleWishlist, isHotelWishlisted } = useWishlist();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Next image
      setCurrentImageIndex((prev) =>
        prev === hotel.images.length - 1 ? 0 : prev + 1
      );
    }

    if (isRightSwipe) {
      // Previous image
      setCurrentImageIndex((prev) =>
        prev === 0 ? hotel.images.length - 1 : prev - 1
      );
    }
  };

  const handleImageTransition = (newIndex) => {
    setCurrentImageIndex(newIndex);
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div
      style={{
        "--slider-height": isHomePage ? "59%" : "100%",
        "--border-radius": isHomePage ? "0px" : "15px",
        "--top-border-radius": isHomePage ? "8px" : "10px",
      }}
      className="hotel-card__image-container"
    >
      <div
        ref={sliderRef}
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

      <div className="hotel-card__dots">
        {hotel.images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleImageTransition(index)}
            className={`hotel-card__dot ${
              currentImageIndex === index ? "hotel-card__dot--active" : ""
            }`}
          />
        ))}
      </div>

      <button
        onClick={(event) => {
          event.preventDefault();
          toggleWishlist(hotel);
        }}
        className={`hotel-card__wishlist ${
          isHotelWishlisted(hotel.id) ? "hotel-card__wishlist--active" : ""
        }`}
      >
        <FaHeart className="hotel-card__wishlist-icon" />
      </button>

      {hotel.comments && (
        <div className="hotel-card__tag">{hotel.comments}</div>
      )}
    </div>
  );
};

export default ImageSlider;
