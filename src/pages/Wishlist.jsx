import { useWishlist } from "../context/wishlist-context";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No hotels wishlisted yet.</p>
      ) : (
        <div className="wishlist__items">
          {wishlist.map((hotel) => (
            <div className="wishlist__item" key={hotel.id}>
              <div className="wishlist__photo">
                <img src={hotel.images[0]} alt={hotel.name} />
              </div>
              <div className="wishlist__info">
                <p className="wishlist__name">{hotel.name}</p>
                <p className="wishlist__address">{hotel.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
