<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import Poker from "./Poker.js";
  import { app } from "$lib/store/activities.js";

  export let gameId;

  let gameContainer;
  let poker;
  
  const dispatch= createEventDispatcher();

  const players = [
    {name: 'Gabriel', avatar: 'Gabriel', local: true},
    {name: 'Emma', avatar: 'Emma'},
    {name: 'Benson', avatar: 'Samuel'},
    {name: 'Jackson', avatar: 'Gabriel'},
    {name: 'David', avatar: 'David'},
    {name: 'Maria', avatar: 'Maria'},
    {name: 'Isabella', avatar: 'Isabella'},
  ]

  const loadPlayers = async () => {
    for (const player of players) {
      
      await poker.addPlayer(player.name, player.avatar)
      await new Promise(resolve => {
        setTimeout(resolve, 100)
      })
    }
  }
  
  onMount(() => {
   

    return () => {
      poker?.destroy();
    }
  });
  $: if (gameContainer && !poker) {
    poker = new Poker(gameContainer, (message) => {
      console.log('on End => ', message)
      dispatch('onExit')
    });

    if (!gameId)poker.createGame($app.user.user_id)
    else poker.joinGame(gameId, $app.user.user_id)

    // poker.initialize(gameContainer).then(() => {
    //    loadPlayers(); // Test
    // });
  }
</script>

<div style="height: 100%;" bind:this={gameContainer}></div>
