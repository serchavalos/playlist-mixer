import { writable } from "svelte/store";

const SELECTED_TRACK_KEY = "st";

let cached = localStorage.getItem(SELECTED_TRACK_KEY);
try {
  cached = JSON.parse(cached) || [];
} catch (_) {
  cached = [];
}
const selectedTracks = writable(cached);

selectedTracks.subscribe(tracks =>
  localStorage.setItem(SELECTED_TRACK_KEY, JSON.stringify(tracks))
);

export default selectedTracks;
