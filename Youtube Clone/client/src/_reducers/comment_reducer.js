import { SAVE_COMMENT, LIST_COMMENT } from "../_actions/types";

export default function (state = { list: [] }, action) {
  switch (action.type) {
    case SAVE_COMMENT:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case LIST_COMMENT:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
}
