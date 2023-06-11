import { Fragment, FC, JSX } from "react";
import { ExperienceType } from "../../../../models/Profile";
import { transformExperience } from "../../utiles/models";
import Moment from "react-moment";
import { deleteExperienceAsync } from "../../reducers/profile";
import { useAppDispatch } from "../../config/GlobalStateConfig";

const Experience: FC<{ experience: ExperienceType[] }> = ({
  experience,
}): JSX.Element => {
  const experienceWithId = experience.map((exp) => transformExperience(exp));
  const dispatch = useAppDispatch();
  const experiences = experienceWithId.map((exp) => (
    <tr key={exp.id}>
      <td> {exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
        {exp.to ? "Now" : <Moment format="DD/MM/YYYY">{exp.to}</Moment>}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteExperienceAsync({ id: exp.id }))}>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
