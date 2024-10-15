<script>
    import { goto } from "$app/navigation";
    import { auth } from "$lib/store/activities.js";
    import Loader from "$lib/loader.svelte";
    // import { app, api_script } from "$lib/store/screen.js";
     let password = ""
     let email = ""
     let agree = false
    $: load = false
    $: track = !password || !email  || !agree || load

    const handleSubmit = (async()=>{
        load = true
        const {status} = await $auth.handleSignUp({
            password, email
        })
        if(status === "success"){
            window.location.href = "/username"
        }
        load = false
    })


</script>
, 
<div id="regist" class="sc-hrJsxi jOrhkb">
    <div class="box">
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Email Address</div>
            <div class="input-control">
                <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" tabindex="1"  placeholder="Registered Email Address." bind:value={email}>
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Login Password</div>
            <div class="input-control">
                <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="password" tabindex="2" autocomplete="off" placeholder="Login Password" bind:value={password}>
            </div>
        </div>
    </div>
    <hr>
    <div class="box">
        <div class="argument-check">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={()=> agree =! agree} class="sc-iJKOTD kdCtGQ checkbox ">
                {#if agree}
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon dot">
                        <use xlink:href="#icon_Check"></use>
                    </svg>
                {/if}
            </div>
            <div class="label">I agree with <a href="/help/agreement" class="argument">user agreement</a>, and confirm that I am at least 18 years old!</div>
        </div>
        <div class="buttons">
            <button  on:click={()=> goto("/login")} class="sc-iqseJM sc-crHmcD cBmlor gEBngo button button-big signin">
                <div class="button-inner">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                        <use xlink:href="#icon_Arrow"></use>
                    </svg>
                    <span>Sign in</span>
                </div>
            </button>
            <button disabled={track} on:click={()=> handleSubmit()} class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-big">
                <div class="button-inner">
                    {#if load}
                        <Loader btn={true} />
                    {:else}
                        Sign Up
                    {/if}
                   </div>
            </button>
        </div>
    </div>
</div>
