import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import { AppStore } from "../redux/store";
import { UserInfo } from "../models/user.models";

type Roles = "ADMINISTRADOR" | "ALUMNO" | "PROFESOR";

interface RoleGuardProps {
  allowedRoles: Roles[];
  children: React.ReactNode;
}

const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const userState = useSelector((store: AppStore) => store.user) as UserInfo;
  
  if (!allowedRoles.includes(userState.rol)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
