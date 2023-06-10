import { Fragment, FC, JSX } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { authSlice } from "../../reducers/auth";
import { useAppSelector } from "../../config/GlobalStateConfig";

const Navbar: FC = (): JSX.Element => {
  const { loading, isAuthenticated } = useAppSelector((state) => state.auth);
  const logout = () => authSlice.actions.logout;
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
      <div className="detail" style={{ paddingTop: "60px" }}>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Navbar;
