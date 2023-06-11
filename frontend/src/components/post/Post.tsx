import { Fragment, useEffect, FC, JSX } from "react";
import Spinner from "../layout/Spinner";
import PostContent from "./PostContent";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import Alert from "../layout/Alert";
import { useParams, Link } from "react-router-dom";
import { addCommentAsync, getPostByIdAsync } from "../../reducers/post";
import { useAppDispatch, useAppSelector } from "../../config/GlobalStateConfig";
import { transformComment } from "../../utiles/models";

const Post: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { post, loading } = useAppSelector((state) => state.post);
  const userId = useAppSelector((state) => state.auth.user?.id);
  let { id } = useParams();
  const submit = (postId: string, text: string): void => {
    dispatch(addCommentAsync({ postId, text }));
  };
  useEffect(() => {
    dispatch(getPostByIdAsync({ postId: id ? id : "" }));
  }, [dispatch, id]);
  if (post) {
    const commentsWithId = post.comments.map((com) => transformComment(com));
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
            <CommentForm postId={post.id} submit={submit} />
            {commentsWithId.length > 0 ? (
              <div className="comments">
                {commentsWithId.map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      userId={userId ? userId : ""}
                      postId={post.id}
                    />
                  );
                })}
              </div>
            ) : (
              <h4>No comments</h4>
            )}
          </Fragment>
        )}
      </div>
    );
  }
  return <></>;
};

export default Post;
