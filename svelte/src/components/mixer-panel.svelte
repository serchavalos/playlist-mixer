<script>
  import Track from "../components/track.svelte";
  import selectedPanel from "../stores/selected-panel";
  import { TAB_FOUND_TRACKS, TAB_SELECTED_TRACKS } from "../constants";
  import selectedTracks from "../stores/selected-tracks";
  import modal, { openModal } from "../stores/modal";

  export let trackList;

  let selectedTrackIds;

  selectedTracks.subscribe(tracks => {
    selectedTrackIds = $selectedTracks.map(({ id }) => id);
  });

  const onTabClick = key => {
    selectedPanel.set(key);
  };

  const selectTrack = evt => {
    const { track } = evt.detail;
    selectedTracks.update(tracks => [
      ...tracks.filter(({ id }) => id !== track.id),
      track
    ]);
  };

  const removeTrack = evt => {
    const { track } = evt.detail;
    selectedTracks.update(tracks => tracks.filter(({ id }) => id !== track.id));
  };
</script>

<style>
  ul {
    display: flex;
    margin: 1rem 0 0 0;
    padding: 0;
    list-style: none;
  }

  ol {
    list-style: none;
    margin: 1rem 0;
    padding: 0;
  }

  li {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid;
    flex-grow: 1;
    text-align: center;
    text-transform: capitalize;
  }

  li.selected {
    border: 1px solid;
    border-bottom: 0;
  }

  .tab-content > div {
    display: none;
  }

  .tab-content > .visible {
    display: block;
    padding: 2rem 0;
  }
</style>

<ul>
  <li
    class:selected={TAB_FOUND_TRACKS === $selectedPanel}
    role="button"
    on:click={() => onTabClick(TAB_FOUND_TRACKS)}>
    found tracks
  </li>
  <li
    class:selected={TAB_SELECTED_TRACKS === $selectedPanel}
    role="button"
    on:click={() => onTabClick(TAB_SELECTED_TRACKS)}>
    selected tracks {$selectedTracks ? `(${$selectedTracks.length})` : ''}
  </li>
</ul>

<div class="tab-content">

  <div class:visible={$selectedPanel === TAB_FOUND_TRACKS}>
    <ol>
      {#each trackList as track}
        <Track
          icon="+"
          selected={selectedTrackIds.includes(track.id)}
          {track}
          on:click={selectTrack} />
      {/each}
    </ol>
  </div>

  <div class:visible={$selectedPanel === TAB_SELECTED_TRACKS}>
    <ol>
      {#each $selectedTracks as track}
        <Track icon="-" {track} on:click={removeTrack} />
      {/each}
    </ol>
    <div>
      <a class="btn" href="javascript:void(0);" on:click={openModal}>
        create playlist
      </a>
    </div>
  </div>
</div>
