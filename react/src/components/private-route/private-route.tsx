import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export const PrivateRoute = ({ component, ...rest }: RouteProps) => (
  <Route
    {...rest}
    render={props => {
      const accessToken = localStorage.getItem("access-token");
      if (!component || !accessToken) {
        return <Redirect to="/login" />;
      }
      // TODO: Replace this "any" and add an interface "PrivateComponent"
      const PrivateComponent: React.ComponentType<any> = component;
      return <PrivateComponent {...props} accessToken={accessToken} />;
    }}
  />
);
