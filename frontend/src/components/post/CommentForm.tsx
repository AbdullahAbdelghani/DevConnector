import { useState, FC, JSX } from "react";

const CommentForm: FC<{
  postId: string;
  submit: (arg0: string, arg1: string) => void;
}> = ({ postId, submit }): JSX.Element => {
  const [text, setText] = useState<string>("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          submit(postId, text);
          setText("");
        }}>
        <textarea
          name="text"
          cols={parseInt("30")}
          rows={parseInt("5")}
          placeholder="Comment on this post"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
