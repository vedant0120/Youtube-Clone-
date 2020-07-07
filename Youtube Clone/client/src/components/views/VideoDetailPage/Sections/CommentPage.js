import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { saveComment, getComment } from "../../../../_actions/comment_actions";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
const { TextArea } = Input;

function CommentPage(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const commentState = useSelector((state) => state.comment);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getComment(props.videoId));
  }, [dispatch, props.videoId]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: comment,
      writer: userState.userData._id,
      videoId: props.videoId,
      image: userState.userData.image,
    };

    dispatch(saveComment(variables));

    setComment("");
  };

  return (
    <div>
      {commentState.list ? (
        commentState.list.map(
          (comment) =>
            !comment.responseTo && (
              <React.Fragment key={comment._id}>
                <SingleComment comment={comment} videoId={props.videoId} />
                <ReplyComment
                  videoId={props.videoId}
                  parentCommentId={comment._id}
                />
              </React.Fragment>
            )
        )
      ) : (
        <></>
      )}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={comment}
          placeholder="Your comment"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CommentPage;
