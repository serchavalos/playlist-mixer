import React, { useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyClient = new SpotifyWebApi();

type OwnProps = {
  accessToken: string;
}

export const Search = ({accessToken}: OwnProps) => {
  const [trackName, setTrackName] = useState<string | null>(null);
  const [trackList, setTrackList] = useState<string[] | null>(null);

  spotifyClient.setAccessToken(accessToken);

  if (!trackName) {
    spotifyClient
      .getMyCurrentPlayingTrack()
      .then(({ item }: SpotifyApi.CurrentlyPlayingResponse) => {
        if (!item) {
          return;
        }
        setTrackName(item.name);
      });
  }

  const searchTrack = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const query = evt.currentTarget.value;

    if (query === "") {
      return;
    }

    spotifyClient
      .search(query, ["track"])
      .then(response => {
        if (typeof response.tracks === "undefined") {
          setTrackList([]);
          return;
        }
        const trackList = response.tracks.items.map(i => i.name);
        setTrackList(trackList);
      });

  }

  return (
    <React.Fragment>
      <article>
        <h3>You are listening <i>{trackName}</i></h3>
        <form>
          Search: <input type="text" onChange={(evt) => searchTrack(evt)} />
        </form>
      </article>
      {trackList && (
        <ul>
          {trackList.map((track, i) => <li key={`track-id-${i}`}>{track }</li>)}
        </ul>
      )}
    </React.Fragment>
  );
}
