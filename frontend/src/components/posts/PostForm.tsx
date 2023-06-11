import { useState, FC, JSX } from "react";
import { createPostAsync } from "../../reducers/post";
import { useAppDispatch } from "../../config/GlobalStateConfig";

const PostForm: FC<{ id: string }> = ({ id }): JSX.Element => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(createPostAsync({ text, id }));
          setText("");
        }}>
        <textarea
          name="text"
          cols={parseInt("30")}
          rows={parseInt("5")}
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
