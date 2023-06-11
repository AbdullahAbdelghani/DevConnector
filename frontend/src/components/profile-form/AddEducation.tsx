import { useState, FC, JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EducationType } from "../../../../models/Profile";
import { addEducationAsync } from "../../reducers/profile";
import { useAppDispatch } from "../../config/GlobalStateConfig";

const AddEducation: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [formData, setFormData] = useState<EducationType>({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: new Date(),
    to: undefined,
    current: false,
    description: "",
  });
  const [toDateDisabled, toggle] = useState<boolean>(false);
  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="container">
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          dispatch(addEducationAsync({ formData, navigate }));
          e.preventDefault();
        }}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from.toString()}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current.toString()}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggle(!toDateDisabled);
              }}
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to ? to.toString() : ""}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? true : false}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols={parseInt("30")}
            rows={parseInt("5")}
            placeholder="Program Description"
            value={description}
            onChange={(e) => onChange(e)}></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddEducation;
