import * as React from "react";
import { parse } from "qs";
import { Redirect } from "react-router-dom";

const getAccessTokenFromUrl = (): string | null => {
  const queryString = window.location.search.substr(1);
  if (!queryString) {
    return null;
  }
  const { a: accessToken } = parse(queryString);
  return accessToken;
};

export const Auth = () => {
  const accessToken = getAccessTokenFromUrl();

  if (!accessToken) {
    return <Redirect to="/login" />;
  }

  localStorage.setItem("access-token", accessToken);
  return <Redirect to="/" />;
};
