import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostCreation from "./PostCreation";
import { getPosts } from "../../actions/post";
import Alert from "../layout/Alert";

const Posts = ({ getPosts, id, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Welcome to the community!
          </p>
          <Alert />
          <PostCreation id={id} />
          <div className="posts">
            {posts.length > 0 ? (
              posts.map((post) => <PostItem key={post._id} post={post} />)
            ) : (
              <h4>No posts found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  id: state.auth.user._id,
});

export default connect(mapStateToProps, { getPosts })(Posts);
