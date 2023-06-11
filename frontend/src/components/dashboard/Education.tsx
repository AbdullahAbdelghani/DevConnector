import { Fragment, FC, JSX } from "react";
import moment from "moment";
import { EducationType } from "../../../../models/Profile";
import { WithId } from "../../utiles/models";
import { deleteEducationAsync } from "../../reducers/profile";
import { useAppDispatch } from "../../config/GlobalStateConfig";

const Educations: FC<{ education: EducationType[] }> = ({
  education,
}): JSX.Element => {
  const educationWithId = education as WithId<EducationType>[];
  const dispatch = useAppDispatch();
  const educations = educationWithId.map((edu) => (
    <tr key={edu.id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {moment(edu.from).format("YYYY/MM/DD")}-{" "}
        {edu.to === null ? " Now" : moment(edu.to).format("YYYY/MM/DD")}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteEducationAsync({ id: edu.id }))}>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default Educations;
