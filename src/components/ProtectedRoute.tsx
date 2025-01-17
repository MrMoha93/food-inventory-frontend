import { auth } from "@services";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const user = auth.getCurrentUser();

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
