<script>
    import { goto } from "$app/navigation";
    // import Loader from "$lib/component/loader.svelte";
    // import { app, api_script } from "$lib/store/screen.js";
     let password = ""
     let email = ""
    $: load = false

    const handleSubmit = (async()=>{
        // load = true
        // const { status, loading } = await $api_script.login(email, password )
        // if(status === "success"){
        //     window.location.href = $app.url; 
        // }
        // load = loading
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
                <input type="password" autocomplete="off" tabindex="2"   
                placeholder="Login Password" bind:value={password}>
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                    <use xlink:href="#icon_View"></use>
                </svg>
            </div>
        </div>
    </div>
    <hr>
    <div class="buttons">
        <button on:click={()=> handleSubmit()} class="sc-iqseJM sc-bqiRlB cBmlor fnKcEH button button-big">
            <div class="button-inner">
                {#if load}
                loading...
                <!-- <Loader btn={true} /> -->
            {:else}
                Sign in
            {/if}
            </div>
        </button>
        <button on:click={()=> goto("/signup")} class="sc-iqseJM sc-crHmcD cBmlor gEBngo button button-big signup oskks">
            <div class="button-inner">
                <span>Sign up</span>
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                    <use xlink:href="#icon_Arrow"></use>
                </svg>
            </div>
        </button>
    </div>
</div>