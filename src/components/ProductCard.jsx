import { useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";

import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlist-context";

const ProductCard = ({ property, className, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toggleWishlist, isHotelWishlisted } = useWishlist();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  // Minimum swipe distance (in px)
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
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }

    if (isRightSwipe) {
      // Previous image
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const handleImageTransition = (newIndex) => {
    setCurrentImageIndex(newIndex);
  };

  const getRatingColorClass = (rating) => {
    if (rating <= 3) return "property-card__rating--low";
    if (rating <= 3.9) return "property-card__rating--medium";
    return "property-card__rating--high";
  };

  return (
    <div className={`property-card ${className}`}>
      <div className="property-card__image-container">
        <div
          ref={sliderRef}
          className="property-card__slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Link
            to={`/products/${index}`}
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.name} - Image ${index + 1}`}
                className={`property-card__image ${
                  currentImageIndex === index
                    ? "property-card__image--active"
                    : ""
                }`}
                draggable="false"
              />
            ))}
          </Link>
        </div>

        <div className="property-card__dots">
          {property.images.map((item, index) => (
            <button
              key={index}
              onClick={() => handleImageTransition(index)}
              className={`property-card__dot ${
                currentImageIndex === index ? "property-card__dot--active" : ""
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => toggleWishlist(property)}
          className={`property-card__wishlist ${
            isHotelWishlisted(property.id)
              ? "property-card__wishlist--active"
              : ""
          }`}
        >
          <FaHeart className="property-card__wishlist-icon" />
        </button>

        {property.comments && (
          <div className="property-card__tag">{property.comments}</div>
        )}
      </div>

      <Link
        to={`/products/${index}`}
        key={index}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="property-card__content">
          <div className="property-card__header">
            <h3 className="property-card__title">{property.name}</h3>
            <div
              className={`property-card__rating ${getRatingColorClass(
                property.stars
              )}`}
            >
              <span className="property-card__star">★</span>
              <span className="property-card__rating-value">
                {property.stars}
              </span>
            </div>
          </div>
          <p className="property-card__address">{property.address}</p>
          <div className="property-card__footer">
            <span className="property-card__views">
              👁 {property.views.toLocaleString()}
            </span>
            <span className="property-card__date">{property.date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
