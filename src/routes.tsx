import App from "@App";
import {
  CustomersPage,
  FoodsPage,
  NotFoundPage,
  OrdersPage,
  FoodFormPage,
  LoginPage,
} from "@components/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <FoodsPage /> },
      { path: "/foods", element: <FoodsPage /> },
      { path: "/foods/:id", element: <FoodFormPage /> },
      { path: "/customers", element: <CustomersPage /> },
      { path: "/orders", element: <OrdersPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

export default router;
