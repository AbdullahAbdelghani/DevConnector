import { Fragment, FC, JSX } from "react";
import { Profile } from "../../utiles/models";
import { useAppSelector } from "../../config/GlobalStateConfig";

const ProfileAbout: FC<{ profile: Profile }> = ({ profile }): JSX.Element => {
  const name = useAppSelector((state) => state.auth.user?.name);
  const { bio, skills } = profile;
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">
            {name && name.trim().split(" ")[0]}'s Bio
          </h2>
          <p>{bio}</p>
          <div className="line"></div>
        </Fragment>
      )}

      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fa fa-check"></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
