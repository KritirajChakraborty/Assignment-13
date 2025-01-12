import { useEffect, useState } from "react";
import hotelData from "../data.json";
import Product from "../components/Products";

const Homepage = () => {
  const [hotels, setHotels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const hotelsToShow = hotelData.slice(currentIndex, currentIndex + 6);
    setHotels((prev) => [...prev, ...hotelsToShow]);
  }, [currentIndex]);
  return <Product hotels={hotels} setCurrentIndex={setCurrentIndex} />;
};

export default Homepage;
