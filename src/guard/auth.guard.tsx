import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppStore } from "../redux/store";

const AuthGuard = () => {
  const userState = useSelector((store: AppStore) => store.user);
  
  if (!userState) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
