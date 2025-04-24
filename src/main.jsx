import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./HomePage.jsx";
import ShopPage from "./ShopPage.jsx";
import CartPage from "./CartPage.jsx";
import OrderPlacedPage from "./OrderPlacedPage.jsx";
import SignupPage from "./SignupPage.jsx";
import Login from "./LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "order-placed", element: <OrderPlacedPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
