import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { saveComment } from "../../../../_actions/comment_actions";
import LikeDislikePage from "./LikeDislikePage";
const { TextArea } = Input;

function SingleComment(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [openReply, setOpenReply] = useState(false);

  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: userState.userData._id,
      videoId: props.videoId,
      responseTo: props.comment._id,
      content: comment,
      image: userState.userData.image,
    };

    dispatch(saveComment(variables));

    setComment("");
    setOpenReply(!openReply);
  };

  const actions = [
    <LikeDislikePage
      commentId={props.comment._id}
      userId={userState.userData._id}
    />,
    <span onClick={handleOpenReply} style={{ marginLeft: "2rem" }}>
      Reply to{" "}
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={
          <Avatar
            src={`http://localhost:5000/${props.comment.image}`}
            alt="image"
          />
        }
        content={
          <p style={{ marginBottom: "2rem" }}>{props.comment.content}</p>
        }
      ></Comment>

      {openReply && (
        <form style={{ display: "flex" }}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={comment}
            placeholder="write some comments"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
