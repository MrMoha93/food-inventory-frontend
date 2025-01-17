import App from "@App";
import { Logout, ProtectedRoute } from "@components";
import {
  CustomersPage,
  FoodsPage,
  NotFoundPage,
  OrdersPage,
  FoodFormPage,
  LoginPage,
} from "@components/pages";
import RegisterPage from "@components/pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <FoodsPage /> },
      { path: "/foods", element: <FoodsPage /> },
      {
        path: "/foods/:id",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <FoodFormPage /> }],
      },
      { path: "/customers", element: <CustomersPage /> },
      { path: "/orders", element: <OrdersPage /> },
    ],
  },
  { path: "/logout", element: <Logout /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

export default router;
