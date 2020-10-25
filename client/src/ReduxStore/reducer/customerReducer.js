import {
  SET_CUSTOMER_FAILED,
  SET_CUSTOMER_SUCCESS,
} from "../action/action.types";

const initialState = {
  message: "",
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SENDING":
      return {
        ...state,
        loading: true,
      };
    case SET_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.response_message,
      };
    case SET_CUSTOMER_FAILED:
      return {
        ...state,
        loading: false,
        fail_message: action.payload,
      };
    default:
      return state;
  }
};
