import { FC, JSX } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../utiles/models";

const PostContent: FC<{ post: Post }> = ({ post }): JSX.Element => {
  const { user, avatar, name, text } = post;
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
      </div>
    </div>
  );
};

export default PostContent;
