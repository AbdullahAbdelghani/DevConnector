import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <p>Would you like to edit your profile ?</p>
          <Link
            to="/edit-profile"
            state={{ edit: true }}
            className="btn btn-primary my-1">
            Edit Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            First step to connect with other developers, please setup your
            profile
          </p>
          <Link
            to="/create-profile"
            state={{ edit: false }}
            className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
