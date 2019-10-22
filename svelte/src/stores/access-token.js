import { writable } from "svelte/store";
import { LC_KEY } from "../constants";
import { getAccessTokenFromUrl } from "../utils.js";

let token = null;
const cachedToken = localStorage.getItem(LC_KEY);
const tokenFromUrl = getAccessTokenFromUrl();

if (cachedToken) {
  token = cachedToken;
} else if (tokenFromUrl) {
  token = tokenFromUrl;
  localStorage.setItem(LC_KEY, tokenFromUrl);
  document.location.href = "/";
}

const accessToken = writable(token);
export default accessToken;

accessToken.subscribe(ac => {
  if (!!ac) {
    localStorage.setItem(LC_KEY, ac);
  } else {
    localStorage.removeItem(LC_KEY);
  }
});
