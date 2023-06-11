import { FC, JSX } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../config/GlobalStateConfig";

const Landing: FC = (): JSX.Element => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Landing;
