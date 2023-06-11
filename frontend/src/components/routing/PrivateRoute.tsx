import { FC, JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../config/GlobalStateConfig";

type Props = {
  children: JSX.Element;
};

const PrivateRoute: FC<Props> = ({ children }): JSX.Element => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  return isAuthenticated && !loading ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
