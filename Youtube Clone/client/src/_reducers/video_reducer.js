import {
  UPLOAD_VIDEO,
  ADD_KEYWORD_VIDEO,
  LIST_VIDEO,
  LOAD_MORE_VIDEO,
  SINGLE_VIDEO,
  RESET_SKIP_VIDEO,
} from "../_actions/types";

export default function (
  state = { isLoading: true, skip: 0, limit: 4, loadMore: false },
  action
) {
  switch (action.type) {
    case UPLOAD_VIDEO:
      return { ...state, upload: action.payload };
    case ADD_KEYWORD_VIDEO:
      return { ...state, searchKeyword: action.payload, skip: 0 };
    case LIST_VIDEO:
      let videos = [];
      if (state.loadMore === false) {
        // videos = [...action.payload.videos];
        videos = action.payload.videos;
      } else {
        if (state.list !== undefined) {
          videos = [...state.list, ...action.payload.videos];
        }
      }

      return {
        ...state,
        list: videos,
        isLoading: false,
        loadMore: false,
      };
    case LOAD_MORE_VIDEO:
      return {
        ...state,
        skip: action.payload.skip + action.payload.limit,
        loadMore: action.payload.loadMore,
      };
    case SINGLE_VIDEO:
      return {
        ...state,
        singleVideo: action.payload.video,
        skip: 0,
      };
    case RESET_SKIP_VIDEO:
      return {
        ...state,
        skip: 0,
      };
    default:
      return state;
  }
}
