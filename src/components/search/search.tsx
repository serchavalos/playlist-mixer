import React, { useState } from "react";
import { debounce } from "lodash";
import SpotifyWebApi from "spotify-web-api-js";
import { Track } from "../../types";
import { PrivateComponentProps } from "../../types";

const spotifyClient = new SpotifyWebApi();

export const Search = ({ accessToken }: PrivateComponentProps) => {
  const [trackName, setTrackName] = useState<string | null>(null);
  const [trackList, setTrackList] = useState<Track[] | null>(null);

  spotifyClient.setAccessToken(accessToken || "");

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

  const searchTrack = debounce(query => {
    spotifyClient.search(query, ["track"]).then(response => {
      if (typeof response.tracks === "undefined") {
        setTrackList([]);
        return;
      }
      const trackList: Track[] = response.tracks.items.map(i => ({
        name: i.name,
        artistName: i.artists[0].name,
        albumName: i.album.name
      }));
      setTrackList(trackList);
    });
  }, 500);

  return (
    <React.Fragment>
      <article>
        <h3>
          You are listening <i>{trackName}</i>
        </h3>
        <form>
          Search:
          <input type="text" onChange={evt => searchTrack(evt.target.value)} />
        </form>
      </article>
      {trackList && (
        <ul>
          {trackList.map(({ name, artistName }, i) => (
            <li key={`track-id-${i}`}>
              <i>{name}</i> by {artistName}
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};
