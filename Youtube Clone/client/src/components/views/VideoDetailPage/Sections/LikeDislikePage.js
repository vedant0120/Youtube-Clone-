import React, { useState, useEffect } from "react";
import { LIKEDISLIKE_SERVER } from "../../../Config";
import { Tooltip } from "antd";
import {
  DislikeFilled,
  LikeFilled,
  DislikeOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import Axios from "axios";

function LikeDislikePage(props) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);

  let variable = {};

  if (props.videoId) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post(`${LIKEDISLIKE_SERVER}/like-info`, variable).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes.length);

        response.data.likes.forEach((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      }
    });

    Axios.post(`${LIKEDISLIKE_SERVER}/dislike-info`, variable).then(
      (response) => {
        if (response.data.success) {
          setDislikes(response.data.dislikes.length);

          response.data.dislikes.forEach((dislike) => {
            if (dislike.userId === props.userId) {
              setDislikeAction("disliked");
            }
          });
        }
      }
    );
  }, [variable, props.userId]);

  const onLike = (e) => {
    if (likeAction === null) {
      Axios.post(`${LIKEDISLIKE_SERVER}/upLike`, variable).then((response) => {
        if (response.data.success) {
          setLikes(likes + 1);
          setLikeAction("liked");

          if (dislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(dislikes - 1);
          }
        }
      });
    } else {
      Axios.post(`${LIKEDISLIKE_SERVER}/unLike`, variable).then((response) => {
        if (response.data.success) {
          setLikes(likes - 1);
          setLikeAction(null);
        }
      });
    }
  };

  const onDislike = (e) => {
    if (dislikeAction !== null) {
      Axios.post(`${LIKEDISLIKE_SERVER}/unDisLike`, variable).then(
        (response) => {
          if (response.data.success) {
            setDislikes(dislikes - 1);
            setDislikeAction(null);
          }
        }
      );
    } else {
      Axios.post(`${LIKEDISLIKE_SERVER}/upDisLike`, variable).then(
        (response) => {
          if (response.data.success) {
            setDislikes(dislikes + 1);
            setDislikeAction("disliked");

            if (likeAction !== null) {
              setLikeAction(null);
              setLikes(likes - 1);
            }
          }
        }
      );
    }
  };

  return (
    <div
      style={{ position: "relative", top: props.commentId ? "0" : "-1.5rem" }}
    >
      <span>
        <Tooltip title="Like">
          {likeAction ? (
            <LikeFilled onClick={onLike} style={{ fontSize: "1rem" }} />
          ) : (
            <LikeOutlined onClick={onLike} style={{ fontSize: "1rem" }} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          {dislikeAction ? (
            <DislikeFilled onClick={onDislike} style={{ fontSize: "1rem" }} />
          ) : (
            <DislikeOutlined onClick={onDislike} style={{ fontSize: "1rem" }} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislikePage;
