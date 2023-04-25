import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CommentForm = ({ postId, submit }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          submit(postId, text);
        }}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

export default CommentForm;
