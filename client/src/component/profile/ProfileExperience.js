import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <div>
      <p>
        <h3 className="text-dark">{company}</h3>
        {location && `at ${location}`}
      </p>
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

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
