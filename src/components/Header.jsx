import { memo } from "react";
import TimeDisplay from "./TimeDisplay";
import Logo from "/propsochLogo.svg";
import CellularConnection from "/CellularConnection.svg";
import Wifi from "/wifi.svg";
import Battery from "/Battery.svg";
import "./Header.css";

const Header = memo(() => {
  return (
    <header className="header">
      <TimeDisplay />
      <img className="header__logo" src={Logo} alt="Logo" />
      <div className="header__status-icons">
        <img
          className="header__icon"
          src={CellularConnection}
          alt="Cellular Connection"
        />
        <img className="header__icon" src={Wifi} alt="WiFi" />
        <img className="header__icon" src={Battery} alt="Battery" />
      </div>
    </header>
  );
});

export default Header;
