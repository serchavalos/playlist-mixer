import { parse } from "qs";

export const getAccessTokenFromUrl = () => {
  const queryString = window.location.search.substr(1);
  if (!queryString) {
    return null;
  }
  const { a: accessToken } = parse(queryString);
  return accessToken;
};

export const generateRandomString = length => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const formatInSec = ms => {
  const d = new Date(ms);
  const m = d.getMinutes();
  const s = d.getSeconds();
  return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
};
