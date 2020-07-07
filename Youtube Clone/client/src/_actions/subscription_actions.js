import axios from "axios";
import {
  GET_NUMBER_SUBSCRIPTION,
  GET_STATUS_SUBSCRIPTION,
  SUBSCRIBE_SUBSCRIPTION,
  UNSUBSCRIBE_SUBSCRIPTION,
} from "./types";
import { SUBSCRIPTION_SERVER } from "../components/Config.js";

export async function getSubscriptionNumber(dispatchData) {
  const request = await axios
    .post(`${SUBSCRIPTION_SERVER}/subscriber-number`, dispatchData)
    .then((response) => response.data);

  return {
    type: GET_NUMBER_SUBSCRIPTION,
    payload: request,
  };
}

export async function getSubscriptionStatus(dispatchData) {
  const request = await axios
    .post(`${SUBSCRIPTION_SERVER}/subscription-status`, dispatchData)
    .then((response) => response.data);

  return {
    type: GET_STATUS_SUBSCRIPTION,
    payload: request,
  };
}

export async function subscribe(dispatchData) {
  const request = await axios
    .post(`${SUBSCRIPTION_SERVER}/subscribe`, dispatchData)
    .then((response) => response.data);

  return {
    type: SUBSCRIBE_SUBSCRIPTION,
    payload: request,
  };
}

export async function unsubscribe(dispatchData) {
  const request = await axios
    .post(`${SUBSCRIPTION_SERVER}/unsubscribe`, dispatchData)
    .then((response) => response.data);

  return {
    type: UNSUBSCRIBE_SUBSCRIPTION,
    payload: request,
  };
}
