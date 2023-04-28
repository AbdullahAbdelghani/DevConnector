import React, { useState } from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions/post";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PostForm = ({ id, createPost }) => {
  let navigate = useNavigate();
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          createPost(text, id, navigate);
          setText("");
        }}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};
PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
export default connect(null, { createPost })(PostForm);
