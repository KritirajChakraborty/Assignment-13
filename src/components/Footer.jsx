import { NavLink, useLocation } from "react-router-dom";
import Search from "/Search.svg";
import Wishlist from "/Wishlist.svg";
import Location from "/Location.svg";
import Profile from "/Profile.svg";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__list-items">
          <NavLink to="/" className={`navlink ${getLinkClass("/")}`}>
            <div>
              <img src={Search} alt="Home Page" />
              <span>Explore</span>
            </div>
          </NavLink>
        </li>
        <li className="navbar__list-items">
          <NavLink
            to="/wishlist"
            className={`navlink ${getLinkClass("/wishlist")}`}
          >
            <div>
              <img src={Wishlist} alt="Wishlist" />
              <span>Wishlist</span>
            </div>
          </NavLink>
        </li>
        <li className="navbar__list-items">
          <NavLink to="/map" className={`navlink ${getLinkClass("/maps")}`}>
            <div>
              <img src={Location} alt="Maps" />
              <span>Maps</span>
            </div>
          </NavLink>
        </li>
        <li className="navbar__list-items">
          <NavLink to="/login" className={`navlink ${getLinkClass("/login")}`}>
            <div>
              <img src={Profile} alt="Login" />
              <span>Login</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Footer;
