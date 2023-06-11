import { FC, JSX } from "react";
import Moment from "react-moment";
import { EducationType } from "../../../../models/Profile";

const ProfileEducation: FC<{ education: EducationType }> = ({
  education,
}): JSX.Element => {
  const { school, from, current, degree, fieldofstudy, to, description } =
    education;
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <strong>From-To :</strong>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {current ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Degree :</strong>
        {degree}
      </p>
      <p>
        <strong>Field of study :</strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description :</strong>
        {description}
      </p>
    </div>
  );
};

export default ProfileEducation;
