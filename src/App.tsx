import React from "react";
import { parse, stringify } from "qs";
import { clientID, redirectUri, scope } from "./config";
import { generateRandomString } from "./utils/string";

import { Search } from "./components/search";

const login = (evt: React.MouseEvent) => {
  evt.preventDefault();

  window.location.href =
    "https://accounts.spotify.com/authorize?" +
    stringify({
      response_type: "code",
      client_id: clientID,
      scope,
      redirect_uri: redirectUri,
      state: generateRandomString(20)
    });
};

const getAccessTokenFromUrl = (): string | null => {
  const queryString = window.location.search.substr(1);
  if (!queryString) {
    return null;
  }
  const { a: accessToken } = parse(queryString);
  return accessToken;
};

const App: React.FC = () => {
  const accessToken = getAccessTokenFromUrl();

  return (
    <div className="App">
      {!accessToken && (
        <a href="/#" onClick={login}>
          Login
        </a>
      )}
      {accessToken && <Search accessToken={accessToken} />}
    </div>
  );
};

export default App;
