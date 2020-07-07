import {
  GET_NUMBER_SUBSCRIPTION,
  GET_STATUS_SUBSCRIPTION,
  SUBSCRIBE_SUBSCRIPTION,
  UNSUBSCRIBE_SUBSCRIPTION,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_NUMBER_SUBSCRIPTION:
      return { ...state, subscriptionNumber: action.payload.length };
    case GET_STATUS_SUBSCRIPTION:
      let isSubscribing = false;
      if (action.payload.length > 0) {
        isSubscribing = true;
      }
      return { ...state, subscriptionStatus: isSubscribing };
    case SUBSCRIBE_SUBSCRIPTION:
      return {
        subscribe: action.payload,
        subscriptionNumber: state.subscriptionNumber + 1,
        subscriptionStatus: !state.subscriptionStatus,
      };
    case UNSUBSCRIBE_SUBSCRIPTION:
      return {
        subscribe: action.payload,
        subscriptionNumber: state.subscriptionNumber - 1,
        subscriptionStatus: !state.subscriptionStatus,
      };
    default:
      return state;
  }
}
