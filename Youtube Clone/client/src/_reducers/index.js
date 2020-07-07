import { combineReducers } from "redux";
import user from "./user_reducer";
import video from "./video_reducer";
import subscription from "./subscription_reducer";
import comment from "./comment_reducer";

const rootReducer = combineReducers({
  user,
  video,
  subscription,
  comment,
});

export default rootReducer;
