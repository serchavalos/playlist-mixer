<script>
  import Login from "./routes/login";
  import Search from "./routes/search";
  import { LC_KEY } from "./constants.js";
  import accessToken from "./stores/access-token";
</script>

<style>
  :global(body) {
    font-family: Arial, Helvetica, sans-serif;
  }
  :global(.btn) {
    display: block;
    padding: 0.5rem 1.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    background-color: hotpink;
    color: white;
    text-decoration: none;
    border-radius: 1rem;
    border: none;
    margin: 0 auto;
    text-align: center;
  }

  main {
    width: 40rem;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    text-transform: capitalize;
  }
</style>

<main>
  <h1>playlist mixer</h1>
  {#if $accessToken}
    <Search />
  {:else}
    <Login />
  {/if}
</main>
