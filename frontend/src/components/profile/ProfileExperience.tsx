import { FC, JSX } from "react";
import Moment from "react-moment";
import { ExperienceType } from "../../../../models/Profile";

const ProfileExperience: FC<{ experience: ExperienceType }> = ({
  experience,
}): JSX.Element => {
  const { company, location, from, current, to, title, description } =
    experience;
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      {location && `at ${location}`}
      <p>
        <strong>From-To :</strong>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {current ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Position :</strong>
        {title}
      </p>
      <p>
        <strong>Description :</strong>
        {description}
      </p>
    </div>
  );
};

export default ProfileExperience;
