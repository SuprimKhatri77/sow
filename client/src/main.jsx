import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { LoginPage } from "../components/auth/login.jsx";
import { PriceListPage } from "../components/pricelist/PriceList.jsx";
import { Layout } from "../components/pricelist/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/price-list",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PriceListPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
