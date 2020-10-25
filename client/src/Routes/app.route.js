import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customer from "../Pages/CustomerPage/Customer";

const AppRoute = () => {
  const Show = () => <div>Hello There</div>;
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Show} />
        <Route exact path="/customer" component={Customer} />
      </Switch>
    </Router>
  );
};
export default AppRoute;
