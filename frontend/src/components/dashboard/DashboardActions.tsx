import { FC, JSX } from "react";
import { Link } from "react-router-dom";

export const DashboardActions: FC = (): JSX.Element => {
  return (
    <div className="dash-buttons my-1">
      <Link to="/edit-profile" className="btn btn-light" state={{ edit: true }}>
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </Link>
    </div>
  );
};
