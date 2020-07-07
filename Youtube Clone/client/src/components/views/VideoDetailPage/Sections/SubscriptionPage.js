import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubscriptionNumber,
  getSubscriptionStatus,
  subscribe,
  unsubscribe,
} from "../../../../_actions/subscription_actions";

function SubscribePage(props) {
  const subscriptionState = useSelector((state) => state.subscription);
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchData = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    dispatch(getSubscriptionNumber(dispatchData));
    dispatch(getSubscriptionStatus(dispatchData));
  }, [dispatch, props.userTo, props.userFrom]);

  const onSubscribe = (e) => {
    const dispatchData = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    if (subscriptionState.subscriptionStatus) {
      dispatch(unsubscribe(dispatchData));
    } else {
      dispatch(subscribe(dispatchData));
    }
  };

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${
            subscriptionState.subscriptionStatus ? "#AAAAAA" : "#CC0000"
          }`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        {subscriptionState.subscriptionStatus ? "Subscribed" : "Subscribe"}
      </button>
      <div>{subscriptionState.subscriptionNumber} Subscribers</div>
    </div>
  );
}

export default SubscribePage;
