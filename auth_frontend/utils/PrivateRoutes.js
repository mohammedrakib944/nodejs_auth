import { Navigate, Outlet } from "react-router-dom";
export default PrivateRoutes = () => {
  let auth = true;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
