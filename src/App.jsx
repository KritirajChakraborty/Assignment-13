import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Wishlist from "./pages/Wishlist";
import MapPage from "./pages/MapPage";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import PropertyDetails from "./pages/PropertyDetails";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:id" element={<PropertyDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
