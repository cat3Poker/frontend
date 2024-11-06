<script>
  import "../styles/global.css";
  import "../styles/navbar.css";
  import "../styles/menubar.css";
  import { Toaster } from "svelte-sonner";
  import { navigating } from "$app/stores";
  import { socketData } from "$lib/store/socket";
  import { pokerGames } from "$lib/store/poker";
  import SocketManager from "$lib/socket/Socketmanager";
  import { app } from "$lib/store/activities";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  // import Loader from "$lib/loader.svelte";

  let previous;
  let start;
  let end;

  $: if ($navigating) {
    start = Date.now();
    end = null;
    previous = $navigating;
  } else {
    end = Date.now();
  }

  onMount(() => {
    if (browser) {
      const io = SocketManager.socket($app.url);
      io.on("poker-games", ({ games }) => {
        console.log("Games => ", games);
        pokerGames.set(games || []);
      });
      io.on("connect", () => {
        socketData.set({
          io,
          request: SocketManager.socketRequestBind(io),
        });
      });
    }
  });
</script>

<div>
  <Toaster position="bottom-left" expand={true} richColors />
  <slot></slot>
  <!-- {#if previous && end}
        <div style="height: 100vh;">
            <Loader />
        </div>
       
        <p>navigated from {previous.from.url.pathname} to {previous.to.url.pathname} in <strong>{end - start}ms</strong></p>
    {/if} -->
</div>
