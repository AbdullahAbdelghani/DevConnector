import { FC, JSX } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Post, WithId } from "../../utiles/models";
import {
  likePostAsync,
  unlikePostAsync,
  deletePostAsync,
} from "../../reducers/post";
import { useAppDispatch } from "../../config/GlobalStateConfig";

const PostItem: FC<{ post: WithId<Post>; userId?: string }> = ({
  post,
  userId,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { name, avatar, user, text, id, likes, date, comments } = post;
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
            liked === true
              ? dispatch(unlikePostAsync({ postId: id }))
              : dispatch(likePostAsync({ id }));
          }}>
          <i className="far fa-thumbs-up"></i>
          {likes !== null && likes.length > 0 ? (
            <span>{likes.length}</span>
          ) : null}
        </button>
        <Link to={`/post/${id}`} className="btn btn-primary">
          Discussion{" "}
          {comments !== null && comments.length > 0 ? (
            <span className="comment-count">{comments.length}</span>
          ) : null}
        </Link>
        {userId === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => dispatch(deletePostAsync({ postId: id }))}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
