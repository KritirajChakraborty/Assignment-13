import ImageSlider from "./ImageSlider";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ property, className }) => {
  const getRatingColorClass = (rating) => {
    if (rating <= 3) return "property-card__rating--low";
    if (rating <= 3.9) return "property-card__rating--medium";
    return "property-card__rating--high";
  };

  return (
    <div className={`property-card ${className}`}>
      <Link
        to={`/products/${property.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ImageSlider hotel={property} />
      </Link>

      <Link
        to={`/products/${property.id}`}
        key={property.id}
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
