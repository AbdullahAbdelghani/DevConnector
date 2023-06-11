import React, { useState, FC, JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExperienceType } from "../../../../models/Profile";
import { addExperienceAsync } from "../../reducers/profile";
import { useAppDispatch } from "../../config/GlobalStateConfig";

const AddExperience: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [formData, setFormData] = useState<ExperienceType>({
    company: "",
    title: "",
    location: "",
    from: new Date(),
    to: undefined,
    current: false,
    description: "",
  });
  const [toDateDisabled, toggle] = useState<boolean>(false);
  const { company, title, location, from, to, current, description } = formData;

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="container">
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          dispatch(addExperienceAsync({ formData, navigate }));
          e.preventDefault();
        }}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
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
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggle(!toDateDisabled);
              }}
            />{" "}
            Current Job
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
            placeholder="Job Description"
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

export default AddExperience;
