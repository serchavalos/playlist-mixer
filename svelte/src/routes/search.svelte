<script>
  import debounce from "lodash.debounce";
  import SpotifyWebApi from "spotify-web-api-js";
  import MixerPanel from "../components/mixer-panel.svelte";
  import Modal from "../components/modal.svelte";
  import accessToken from "../stores/access-token.js";
  import selectedTracks from "../stores/selected-tracks";
  import { closeModal } from "../stores/modal";
  import { LC_KEY } from "../constants.js";

  let trackList = [];
  const spotifyClient = new SpotifyWebApi();
  spotifyClient.setAccessToken($accessToken);

  const searchTrack = debounce(query => {
    spotifyClient
      .search(query, ["track"])
      .then(response => {
        if (typeof response.tracks === "undefined") {
          trackList = [];
          return;
        }
        trackList = response.tracks.items.map(i => ({
          id: i.id,
          name: i.name,
          artistName: i.artists[0].name,
          albumName: i.album.name,
          durationMs: i.duration_ms
        }));
      })
      .catch(e => {
        const { error } = JSON.parse(e.response);
        if (error.status === 401) {
          accessToken.set(0);
        }
      });
  }, 500);

  let newPlaylistName = "";
  const createPlaylist = evt => {
    evt.preventDefault();
    const trackSpotifyUris = $selectedTracks.map(
      ({ id }) => `spotify:track:${id}`
    );

    spotifyClient
      .getMe()
      .then(({ id }) => Promise.resolve(id))
      .then(userId =>
        spotifyClient.createPlaylist(userId, {
          name: newPlaylistName,
          public: false
        })
      )
      .then(({ id }) => Promise.resolve(id))
      .then(playlistId =>
        spotifyClient.addTracksToPlaylist(playlistId, trackSpotifyUris)
      )
      .then(() => {
        alert("Playlist created!");
        closeModal();
        selectedTracks.set([]);
      });
  };
</script>

<style>
  input[type="text"] {
    border-radius: 2rem;
    border: 1px solid #aaa;
    display: block;
    padding: 0.5rem 1rem;
    margin: auto;
    font-size: 1.2rem;
    min-width: 20rem;
    outline: none;
  }
</style>

<article>
  <form>
    <input
      type="text"
      placeholder="Type the name of your playlist"
      on:keyup={e => searchTrack(e.target.value)} />
  </form>

  <div>
    <MixerPanel {trackList} />
  </div>
</article>

<Modal title="Create a playlist">
  <form on:submit={createPlaylist}>
    <p>
      <input
        type="text"
        placeholder="Name of your playlist"
        bind:value={newPlaylistName} />
    </p>
    <input class="btn" type="submit" value="Create" />
  </form>
</Modal>
