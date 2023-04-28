import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const Comments = ({ comment, userId, deleteComment, postId }) => {
  const { user, avatar, text, name, _id, date } = comment;
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
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {userId === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(postId, _id)}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
};

export default connect(null, { deleteComment })(Comments);
