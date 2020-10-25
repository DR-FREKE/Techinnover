import { SET_CUSTOMER_FAILED, SET_CUSTOMER_SUCCESS } from "./action.types";
import { CustomerRequest } from "../../API";

export const setCustomer = (userInfo) => async (dispatch) => {
  dispatch({ type: "SENDING" });
  try {
    const { success, response_message } = await CustomerRequest(userInfo);
    dispatch({
      type: SET_CUSTOMER_SUCCESS,
      payload: { success, response_message },
    });
  } catch (error) {
    alert(error);
    // dispatch({ type: SET_CUSTOMER_FAILED, payload: error });
  }
};
