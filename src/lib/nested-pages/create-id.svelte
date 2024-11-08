<script>
    import { user } from "$lib/store/profile.js";
    import {app} from "$lib/store/activities.js";
    import Loader from "$lib/loader.svelte";
    import { toast } from "svelte-sonner";
    import { onMount } from "svelte";

    function generateGameId() {
        return Math.random().toString(36).substring(2, 15);
    }

    let game = {}
    $: load = false
    $: track = !game?.gameId || !game?.buyIn || !game?.players 
    const handleSumbit = (async()=>{
        load = true
        if(game?.buyIn){
            if($user?.balance < game?.buyIn){
                toast.error("Insufficient Funds")
                load = false
                return
            }
            if(game?.players < 2){
                toast.error("Minimum Players is 2")
                load = false
                return
            }
            if(game?.players > 9){
                toast.error("Maximum Players is 9")
                load = false
                return
            }
            if(!game.gameId){
                toast.error("Game ID is required")
                load = false
                return
            }
        }
        console.log(game)
   
    })

    function handleInput(event) {
        game.buyIn = event.target.value.replace(/[^0-9.]/g, '');
    }
    function handleInput1(event) {
        game.players = event.target.value.replace(/[^0-9.]/g, '');
    }
    onMount(()=>{
        game.gameId = generateGameId()
    })
</script>


<div class="KJkjdkp">
    <div class="totally-infolded">
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Game ID</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                 <input type="text" bind:value={game.gameId} tabindex="1" autocomplete="off" placeholder="Game ID" >
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Buy-in amount (SOL) </div>
            <div class="input-control" >
                <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" on:input={handleInput} bind:value={game.buyIn} placeholder="1.0000" >
            </div>
            <div>Available bal: <span>{$user?.balance}</span></div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Max players</div>
            <div class="input-control" >
                <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1" on:input={handleInput1} bind:value={game.players} autocomplete="off" placeholder="6" >
            </div>
        </div>
    </div>

    <div class="buttons">
        <button disabled={track} on:click={handleSumbit} class="sc-iqseJM sc-bqiRlB cBmlor fnKcEH button button-big">
            <div class="button-inner">
                {#if load}
                    <Loader color="white"/>
                {:else}
                 Save
                {/if}
            </div>
        </button>
    </div>
</div>

<style>
.KJkjdkp{
    background: #CBD7FF08;
    padding: 10px;
    margin: 20px;
    border-radius: 12px;
    height: 100%;
    overflow: scroll;
}
.KJkjdkp::-webkit-scrollbar{
    display: none;
}
.KJkjdkp{
      scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
.kDuLvp .input-control {
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 8px;
    background-color: #0F111A8C;
    height: 3.5rem;
    padding: 0px 1.25rem;
    opacity: 1;
}
.fnKcEH.button {
    color: rgb(245, 246, 247);
    box-shadow: rgba(29, 34, 37, 0.1) 0px 4px 8px 0px;
    background-color: #1E7929;
    /* background-image: conic-gradient(from 1turn, var(--primary-color), #be0ec7); */
}
.buttons{
    margin: 20px 0;
}
.totally-infolded{
    display: grid;
    grid-auto-flow: dense;
    gap: 1rem 0.2375rem;
}
</style>