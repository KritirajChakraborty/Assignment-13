import { createRoot } from "react-dom/client";
import AppRouter from "./App.jsx";
import { WishlistProvider } from "./context/wishlist-context.jsx";

createRoot(document.getElementById("root")).render(
  <WishlistProvider>
    <AppRouter />
  </WishlistProvider>
);
