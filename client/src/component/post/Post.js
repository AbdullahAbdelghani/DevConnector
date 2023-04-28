import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostContent from "./PostContent";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import Alert from "../layout/Alert";
import { useParams, Link } from "react-router-dom";
import { getPostById, addComment } from "../../actions/post";

const Post = ({
  getPostById,
  post: { post, loading },
  auth: {
    user: { _id },
  },
  addComment,
}) => {
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
          <Alert />
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <PostContent post={post} />
          <CommentForm postId={post._id} userId={_id} submit={submit} />
          {post.comments.length > 0 ? (
            <div className="comments">
              {post.comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  userId={_id}
                  postId={post._id}
                />
              ))}
            </div>
          ) : (
            <h4>No comments</h4>
          )}
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
