import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { AuthProvider } from "../context/AuthProvider.jsx";
import { AuthPage } from "../components/auth/Auth.jsx";
import { PriceListPage } from "../components/pricelist/PriceList.jsx";
import { Layout } from "../components/pricelist/Layout.jsx";
import { ProtectedRoute } from "../components/pricelist/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/price-list",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
