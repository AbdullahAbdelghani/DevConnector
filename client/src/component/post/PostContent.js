import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostContent = ({ post: { user, avatar, name, text } }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
      </div>
    </div>
  );
};

PostContent.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostContent;
