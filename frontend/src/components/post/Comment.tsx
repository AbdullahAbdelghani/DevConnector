import { FC, JSX } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { WithId } from "../../utiles/models";
import { CommentType } from "../../../../models/Post";
import { deleteCommentAsync } from "../../reducers/post";
import { useAppDispatch } from "../../config/GlobalStateConfig";

const Comments: FC<{
  comment: WithId<CommentType>;
  userId: string;
  postId: string;
}> = ({ comment, userId, postId }): JSX.Element => {
  const dsipatch = useAppDispatch();
  const { user, avatar, text, name, id, date } = comment;
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
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {userId === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() =>
              dsipatch(deleteCommentAsync({ postId, commentId: id }))
            }>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Comments;
