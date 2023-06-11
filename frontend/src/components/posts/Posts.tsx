import React, { Fragment, useEffect, FC, JSX } from "react";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import Alert from "../layout/Alert";
import { getPostsAsync } from "../../reducers/post";
import { useAppDispatch, useAppSelector } from "../../config/GlobalStateConfig";
import { Post, WithId } from "../../utiles/models";

const Posts: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.auth.user?.id);
  const { loading, posts } = useAppSelector((state) => state.post);
  const postsWithId = posts as WithId<Post>[];
  useEffect(() => {
    dispatch(getPostsAsync());
  }, [dispatch]);
  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Alert />
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Welcome to the community!
          </p>
          <PostForm id={id ? id : ""} />
          <div className="posts">
            {postsWithId.length > 0 ? (
              postsWithId.map((post) => (
                <PostItem key={post.id} post={post} userId={id} />
              ))
            ) : (
              <h4>No posts found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Posts;
