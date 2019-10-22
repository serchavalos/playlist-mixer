<script>
  import { stringify } from "qs";
  import { clientID, scope, redirectUri } from "../config";
  import { generateRandomString } from "../utils.js";

  const handleClick = event => {
    event.preventDefault();
    window.location.href =
      "https://accounts.spotify.com/authorize?" +
      stringify({
        response_type: "code",
        client_id: clientID,
        scope,
        redirect_uri: redirectUri,
        state: generateRandomString(20)
      });
  };
</script>

<style>
  article {
    text-align: center;
  }
</style>

<article>
  <a href="javascript:void(0)" class="btn" on:click={handleClick}>Login</a>
</article>
