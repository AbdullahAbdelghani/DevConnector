import { FC, JSX, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";
import { getCurrentProfileAsync } from "../../reducers/profile";
import { useAppDispatch, useAppSelector } from "../../config/GlobalStateConfig";
import { deleteAccountAsync } from "../../reducers/profile";
import { DashboardActions } from "./DashboardActions";
import Educations from "./Education";
import Experience from "./Experience";
// import { DashboardActions } from "./DashboardActions";
// import Experience from "./Experience";
// import Educations from "./Education";

const Dashboard: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentProfileAsync());
  }, [dispatch]);
  const { user } = useAppSelector((state) => state.auth);
  const { loading, profile } = useAppSelector((state) => state.profile);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <Alert />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Educations education={profile.education} />
          <Experience experience={profile.experience} />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => dispatch(deleteAccountAsync())}>
              <i className="fas fas-user-minus"></i> Delete My Account
            </button>
          </div>
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
    </div>
  );
};

export default Dashboard;
