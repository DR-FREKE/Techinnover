import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./ReduxStore/configureStore";
import * as serviceWorker from "./serviceWorker";

const MainApp = () => (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

ReactDOM.render(<MainApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
