import { useEffect } from "react";
import ProductCard from "./ProductCard";

const Product = ({ hotels, setCurrentIndex = () => {} }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (params) => {
        if (params[0].isIntersecting) {
          observer.unobserve(lastCard);
          setCurrentIndex((prev) => prev + 6);
        }
      },
      { threshold: 0.8 }
    );

    const lastCard = document.querySelector(".product-card:last-child");
    if (!lastCard) return;
    observer.observe(lastCard);

    return () => {
      if (lastCard) {
        observer.unobserve(lastCard);
      }
      observer.disconnect();
    };
  }, [hotels]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        margin: "10px 0",
        padding: "0 5px",
      }}
    >
      {hotels.map((item, index) => (
        <ProductCard
          key={index}
          className="product-card"
          property={item}
          index={index}
        />
      ))}
    </div>
  );
};

export default Product;
