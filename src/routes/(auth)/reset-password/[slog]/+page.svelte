<script>
    export let data
    import { goto } from "$app/navigation";
    import { auth } from "$lib/store/activities.js";
    import Loader from "$lib/loader.svelte";
     let password = ""
     let newPassword = ""
    $: load = false
    $: isView = false

    $: email = data?.slog

    $: email ? "" : goto("/login")

    $: track = !newPassword || password !== newPassword || load

    const handleSubmit = (async()=>{
        load = true
        const {status} = await $auth.changePassword({
            password, email
        })
        if(status === "success"){
            goto("/login")
        }
        load = false
    })

</script>


<div id="login" class="sc-bZSZLb iyEiUf jOrhkb">
    <div class="box">
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">New Password</div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
            {#if isView}
                 <input type="text" autocomplete="off" tabindex="2"   
                 placeholder="Password" bind:value={newPassword}>
             {:else}
                 <input type="password" autocomplete="off" tabindex="2"   
                 placeholder="Password" bind:value={newPassword}>
               {/if}
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <svg on:click={()=> isView =! isView} xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                    <use xlink:href="#{!isView ? "icon_View" : "icon_Hide"}"></use>
                </svg>
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input sc-bYoBSM ixxYMF">
            <div class="input-label">
                <div style="flex: 1 1 0%;">Confirm Password</div>
            </div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                  {#if isView}
                    <input type="text" autocomplete="off" tabindex="2"   
                    placeholder="Password" bind:value={password}>
                {:else}
                    <input type="password" autocomplete="off" tabindex="2"   
                    placeholder="Password" bind:value={password}>
                  {/if}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <svg on:click={()=> isView =! isView} xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                    <use xlink:href="#{!isView ? "icon_View" : "icon_Hide"}"></use>
                </svg>
            </div>
        </div>
    </div>
    <hr>
    <div class="buttons">
        <button disabled={track} on:click={()=> handleSubmit()} class="sc-iqseJM sc-bqiRlB cBmlor fnKcEH button button-big">
            <div class="button-inner">
            {#if load}
                <Loader btn={true} />
            {:else}
                Sign In
            {/if}
            </div>
        </button>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={()=> goto("/signup")} class="sc-iqseJM sc-crHmcD cBmlor gEBngo button button-big signup oskks">
            <div class="button-inner">
                <span>Sign up</span>
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                    <use xlink:href="#icon_Arrow"></use>
                </svg>
            </div>
        </div>
    </div>
</div>


<style>
.iyEiUf .button {
    flex: 2 1 0%;
}
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