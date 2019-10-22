import { writable } from "svelte/store";
import { TAB_FOUND_TRACKS } from "../constants";

const SELECTED_PANEL_KEY = "sp";

const selectedPanel = writable(
  localStorage.getItem(SELECTED_PANEL_KEY) || TAB_FOUND_TRACKS
);
selectedPanel.subscribe(panel =>
  localStorage.setItem(SELECTED_PANEL_KEY, panel)
);

export default selectedPanel;
