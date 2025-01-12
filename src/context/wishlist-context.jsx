import React, { createContext, useContext, useState } from "react";

// Create WishlistContext
const WishlistContext = createContext();

// WishlistProvider to wrap your app
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  console.log(wishlist);

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

  // Function to check if a hotel is wishlisted
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

// Custom hook to use the WishlistContext
export const useWishlist = () => {
  return useContext(WishlistContext);
};
