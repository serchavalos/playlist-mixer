import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from "./components/login/login";
import { Search } from "./components/search/search";
import { Auth } from "./components/auth/auth";
import { PrivateRoute } from "./components/private-route/private-route";

const AppRouter = () => (
  <Router>
    <Route path="/login" component={Login} />
    <Route path="/auth" component={Auth} />
    <PrivateRoute path="/" exact component={Search} />
  </Router>
);

export default AppRouter;
