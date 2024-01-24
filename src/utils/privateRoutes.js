import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  // let auth = { token: };
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
