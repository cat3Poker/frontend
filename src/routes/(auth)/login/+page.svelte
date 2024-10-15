<script>
    import { goto } from "$app/navigation";
    import { auth } from "$lib/store/activities.js";
    import Loader from "$lib/loader.svelte";
     let password = ""
     let email = ""
    $: load = false
    $: isView = false

    $: track = !password || !email || load

    const handleSubmit = (async()=>{
        load = true
        const {status} = await $auth.handleLogin({
            password, email
        })
        if(status === "success"){
            window.location.href = "/"
        }
        load = false
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
        <div class="sc-ezbkAF kDuLvp input sc-bYoBSM ixxYMF">
            <div class="input-label">
                <div style="flex: 1 1 0%;">Login Password</div>
                <a class="forget" href="/forget">Forgot password?</a>
            </div>
            <div class="input-control" >
                 <!-- svelte-ignore a11y-positive-tabindex -->
                  {#if isView}
                    <input type="text" autocomplete="off" tabindex="2"   
                    placeholder="Login Password" bind:value={password}>
                {:else}
                    <input type="password" autocomplete="off" tabindex="2"   
                    placeholder="Login Password" bind:value={password}>
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
</style>