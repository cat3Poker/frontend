<script>
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

    </div>
    <div class="buttons">
        <button on:click={()=> handleSubmit()} class="sc-iqseJM sc-bqiRlB cBmlor fnKcEH button button-big long">
            <div class="button-inner">
                {#if load}
                loading...
                <!-- <Loader btn={true} /> -->
            {:else}
                Get new password
            {/if}
            </div>
        </button>
    </div>
</div>