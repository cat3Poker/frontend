
<script>
    import { onMount } from "svelte";
    import { Poker } from "./poker";
   let gameContainer

    onMount(async()=>{
        if(gameContainer){
            let poker = new Poker()
            await poker.initLoadingScreen(gameContainer)
        }   
    })

</script>


<div style="height: 100%;" bind:this={gameContainer}></div>