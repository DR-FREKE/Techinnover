import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootRuducer from "./reducer";

let composeEnhancer = compose;

composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootRuducer,
  composeEnhancer(applyMiddleware(thunk))
);
