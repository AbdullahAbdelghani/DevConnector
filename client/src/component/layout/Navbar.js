import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Outlet, NavLink } from "react-router-dom";
import { logout } from "../../actions/auth";
import Alert from "../../reducers/alert";

const Navbar = ({ isAuthenticated = false, loading = false, logout }) => {
  const authLinks = (
    <ul>
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
  const guestLinks = (
    <ul>
      <li>
        <NavLink to="#!">Developers</NavLink>
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
    <>
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
    </>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  logut: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Navbar);
