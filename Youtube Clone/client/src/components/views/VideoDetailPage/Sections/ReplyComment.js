import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import { useSelector } from "react-redux";

function ReplyComment(props) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReply, setOpenReply] = useState(false);
  const commentState = useSelector((state) => state.comment);

  useEffect(() => {
    let commentNumber = 0;
    commentState.list.forEach((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.parentCommentId, commentState]);

  let renderReplyComment = (parentCommentId) =>
    commentState.list.map((comment) => (
      <React.Fragment key={comment._id}>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment comment={comment} videoId={props.videoId} />
            <ReplyComment
              CommentLists={props.CommentLists}
              parentCommentId={comment._id}
              videoId={props.videoId}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const handleChange = () => {
    setOpenReply(!openReply);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={handleChange}
        >
          View {childCommentNumber} more comment(s)
        </p>
      )}

      {openReply && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
