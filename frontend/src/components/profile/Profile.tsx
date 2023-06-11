import { Fragment, useEffect, FC, JSX } from "react";
import Spinner from "../layout/Spinner";
import { useParams, Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import { getProfileByIdAsync } from "../../reducers/profile";
import { useAppDispatch, useAppSelector } from "../../config/GlobalStateConfig";
import { transformEducation, transformExperience } from "../../utiles/models";

const Profile: FC = (): JSX.Element => {
  const { profile, loading } = useAppSelector((state) => state.profile);
  const auth = useAppSelector((state) => state.auth);
  let { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(getProfileByIdAsync({ userId: id }));
  }, [dispatch, id]);
  if (profile) {
    const educationWithId = profile.education.map((edu) =>
      transformEducation(edu)
    );
    const experienceWithId = profile.experience.map((exp) =>
      transformExperience(exp)
    );
    return (
      <div className="container">
        {profile === null || loading ? (
          <>
            <h4>No profile found...</h4>
            <Spinner />
          </>
        ) : (
          <Fragment>
            <Link to="/profiles" className="btn btn-light">
              Back to profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user?.id === profile.user && (
                <Link to="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </Link>
              )}
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {experienceWithId.length > 0 ? (
                  <Fragment>
                    {experienceWithId.map((exp) => (
                      <ProfileExperience key={exp.id} experience={exp} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No experience credintials</h4>
                )}
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {educationWithId.length > 0 ? (
                  <Fragment>
                    {educationWithId.map((edu) => (
                      <ProfileEducation key={edu.id} education={edu} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No education credintials</h4>
                )}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
  return <></>;
};

export default Profile;
