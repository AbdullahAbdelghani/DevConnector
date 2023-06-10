import React, { Fragment, FC, JSX } from "react";
import { connect } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { logout } from "../../actions/auth";
import { GlobalStateType } from "../../reducers";

interface Props {
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
}

const Navbar: FC<Props> = ({
  isAuthenticated = false,
  loading = false,
  logout,
}): JSX.Element => {
  const authLinks: JSX.Element = (
    <ul>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <NavLink to="/posts">Posts</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink onClick={logout} to="/">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </NavLink>
      </li>
    </ul>
  );
  const guestLinks: JSX.Element = (
    <ul>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <NavLink to="/">
            <i className="fas fa-code"></i> DevConnector
          </NavLink>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
      <div className="detail">
        <Outlet />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: GlobalStateType) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Navbar);
