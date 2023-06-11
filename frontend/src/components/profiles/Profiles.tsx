import { Fragment, useEffect, FC, JSX } from "react";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfilesAsync } from "../../reducers/profile";
import { useAppDispatch, useAppSelector } from "../../config/GlobalStateConfig";

const Profiles: FC = (): JSX.Element => {
  const { loading, profiles } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfilesAsync());
  }, [dispatch]);
  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((pro) => <ProfileItem key={pro.id} profile={pro} />)
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Profiles;
