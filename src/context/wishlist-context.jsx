import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Function to add/remove a hotel from the wishlist
  const toggleWishlist = (hotel) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === hotel.id);
      if (exists) {
        // Remove the hotel from the wishlist
        return prev.filter((item) => item.id !== hotel.id);
      } else {
        // Add the hotel to the wishlist
        return [...prev, hotel];
      }
    });
  };

  const isHotelWishlisted = (hotelId) =>
    wishlist.some((item) => item.id === hotelId);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isHotelWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};
