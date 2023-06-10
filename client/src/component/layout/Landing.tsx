import React, { FC, JSX } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { GlobalStateType } from "../../reducers";

type Props = {
  isAuthenticated: boolean;
};

const landing: FC<Props> = ({ isAuthenticated }): JSX.Element => {
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

const mapStateToProps = (state: GlobalStateType) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(landing);
