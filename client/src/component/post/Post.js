import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostContent from "./PostContent";
import CommentForm from "./CommentForm";
import { useParams, Link } from "react-router-dom";
import { getPostById, addComment } from "../../actions/post";

const Post = ({ getPostById, post: { post, loading }, auth, addComment }) => {
  const submit = (postId, text) => {
    addComment(postId, text);
  };
  let { id } = useParams();
  useEffect(() => {
    getPostById(id);
  }, [getPostById, id]);
  return (
    <div className="container">
      {post === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <PostContent post={post} />
          <CommentForm
            postId={post._id}
            userId={auth.user._id}
            submit={submit}
          />
        </Fragment>
      )}
    </div>
  );
};

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getPostById, addComment })(Post);
