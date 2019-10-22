import { writable } from "svelte/store";

const modal = writable({
  visible: false
});

export default modal;

export const openModal = () => {
  modal.set({ ...modal, visible: true });
};

export const closeModal = () => {
  modal.set({ ...modal, visible: false });
};
