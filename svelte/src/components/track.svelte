<script>
  export let icon;
  export let track;
  export let selected;

  import { createEventDispatcher } from "svelte";
  import { formatInSec } from "../utils";

  const dispatch = createEventDispatcher();

  const onClick = track => {
    dispatch("click", { track });
  };
</script>

<style>
  li {
    display: flex;
    align-content: center;
    padding: 5px 10px;
    cursor: pointer;
    user-select: none;
  }

  li.selected,
  li.selected:hover {
    background-color: darkcyan;
  }

  li:hover {
    background-color: cyan;
  }

  .icon {
    display: flex;
  }

  .icon > span {
    margin: 1rem;
  }

  .metadata {
    flex-grow: 2;
  }

  .duration {
    display: flex;
    align-items: center;
  }
</style>

<li class:selected on:click={() => onClick(track)}>
  <div class="icon">
    <span>{icon}</span>
  </div>
  <div class="metadata">
    <div class="title">{track.name}</div>
    <div class="subtitle">{track.artistName} &#183; {track.albumName}</div>
  </div>
  <div class="duration">
    <span>{formatInSec(track.durationMs)}</span>
  </div>
</li>
