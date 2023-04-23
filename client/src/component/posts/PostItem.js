import React from "react";
import { Link } from "react-router-dom";

export default function ({ post }) {
  const { name, avatar, user, text, _id, likes, date, comments } = post;
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
        <p className="post-date">{date}</p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          {likes !== null && likes.length > 0 ? (
            <span>{likes.length}</span>
          ) : null}
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments !== null && comments.length > 0 ? (
            <span className="comment-count">{comments.length}</span>
          ) : null}
        </Link>
        <button type="button" className="btn btn-danger">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}