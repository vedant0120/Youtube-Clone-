import axios from "axios";
import { SAVE_COMMENT, LIST_COMMENT } from "./types";
import { COMMENT_SERVER } from "../components/Config.js";

export async function saveComment(variables) {
  const request = await axios
    .post(`${COMMENT_SERVER}/save-comment`, variables)
    .then((response) => response.data);
  return {
    type: SAVE_COMMENT,
    payload: request,
  };
}

export async function getComment(videoId) {
  let variable = { videoId: videoId };
  const request = await axios
    .post(`${COMMENT_SERVER}/list-comments`, variable)
    .then((response) => response.data);
  return {
    type: LIST_COMMENT,
    payload: request,
  };
}
