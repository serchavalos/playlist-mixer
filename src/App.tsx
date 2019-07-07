import React, { useState } from "react";
import { parse, stringify } from "qs";
import { clientID, redirectUri, scope } from "./config";
import { generateRandomString } from "./utils/string";
import SpotifyWebApi from "spotify-web-api-js";

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
const spotifyClient = new SpotifyWebApi();

const App: React.FC = () => {
  const [trackName, setTrackName] = useState<string | null>(null);
  const accessToken = getAccessTokenFromUrl();
  if (accessToken !== null) {
    spotifyClient.setAccessToken(accessToken);
    spotifyClient
      .getMyCurrentPlayingTrack()
      .then(({ item }: SpotifyApi.CurrentlyPlayingResponse) => {
        if (item) {
          setTrackName(item.name);
        }
      });
  }

  return (
    <div className="App">
      {!trackName && (
        <a href="#" onClick={login}>
          Login
        </a>
      )}
      {trackName && <h1>You are listening {trackName}</h1>}
    </div>
  );
};

export default App;
