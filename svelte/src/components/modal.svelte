<script>
  import modal, { closeModal } from "../stores/modal";

  export let title;

  let displayModal = true;

  modal.subscribe(({ visible }) => {
    displayModal = visible;
  });
</script>

<style>
  h1 {
    text-align: center;
  }
  .shadow {
    display: none;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
  }

  .shadow.visible {
    display: flex;
  }

  .content {
    position: relative;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0.5rem;
    width: 40rem;
    margin: auto;
    padding: 1rem;
  }
</style>

<div class="shadow" class:visible={displayModal}>
  <div class="content">
    <h1>{title}</h1>
    <slot />
    <span class="close" on:click={closeModal}>X</span>
  </div>
</div>
