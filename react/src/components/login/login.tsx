import * as React from "react";
import { stringify } from "qs";
import { clientID, redirectUri, scope } from "../../config";
import { generateRandomString } from "../../utils/string";

export const Login = () => {
  const handleLogin = (evt: React.MouseEvent) => {
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

  return (
    <a href="/#" onClick={handleLogin}>
      Login
    </a>
  );
};
