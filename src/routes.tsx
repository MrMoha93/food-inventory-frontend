import App from "@App";
import { CustomersPage, OrdersPage } from "@components/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/customers", element: <CustomersPage /> },
  { path: "/orders", element: <OrdersPage /> },
]);

export default router;
