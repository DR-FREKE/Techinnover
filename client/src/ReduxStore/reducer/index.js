import { combineReducers } from "redux";
import { customerReducer } from "./customerReducer";

const reducer = combineReducers({
  customers: customerReducer,
});

export default reducer;
