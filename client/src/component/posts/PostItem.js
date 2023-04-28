import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { likePost, unlikePost, deletePost } from "../../actions/post";

const PostItem = ({ post, userId, likePost, unlikePost, deletePost }) => {
  const { name, avatar, user, text, _id, likes, date, comments } = post;
  const liked =
    likes.filter((like) => like.user.toString() === userId).length > 0
      ? true
      : false;
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
          <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        <button
          type="button"
          className={`btn btn-${liked ? "dark" : "light"}`}
          onClick={() => {
            liked === true ? unlikePost(_id) : likePost(_id);
          }}>
          <i className="far fa-thumbs-up"></i>
          {likes !== null && likes.length > 0 ? (
            <span>{likes.length}</span>
          ) : null}
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments !== null && comments.length > 0 ? (
            <span className="comment-count">{comments.length}</span>
          ) : null}
        </Link>
        {userId === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deletePost(_id)}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default connect(null, { likePost, unlikePost, deletePost })(PostItem);
