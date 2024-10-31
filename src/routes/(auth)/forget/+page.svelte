<script>
    import Loader from "$lib/loader.svelte";
    import { auth } from "$lib/store/activities.js";
    let email = ""
    $: load = false
    const handleSubmit = (async()=>{
        load = true
        const { status, loading } = await $auth.resetPassword(email )
        if(status === "success"){
            history.back()
        }
        load = loading
    })
</script>


<div id="login" class="sc-bZSZLb iyEiUf jOrhkb">
    <div class="box">
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Email Address</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1" autocomplete="off" placeholder="Email" bind:value={email}>
            </div>
        </div>

    </div>
    <div class="buttons">
        <button on:click={()=> handleSubmit()} class="sc-iqseJM sc-bqiRlB cBmlor fnKcEH button button-big long">
            <div class="button-inner">
                {#if load}
                <Loader color="white" />
            {:else}
                Get new password
            {/if}
            </div>
        </button>
    </div>
</div>

<style>
.kDuLvp .input-control input {
    flex: 1 1 0%;
    width: 100%;
    height: 100%;
    min-width: 1rem;
    padding: 0px;
    border: none;
    background-color: transparent;
    color: black;
}
</style>