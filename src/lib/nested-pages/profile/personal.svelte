<script>
    import { user } from "$lib/store/profile.js";
    import {app} from "$lib/store/activities.js";
    import Loader from "$lib/loader.svelte";
    import { page } from "$app/stores";
    let personal = {}
    $: load = false
    $: track = !personal?.nickname || !personal?.dob || !personal?.firstname || !personal?.city || !personal?.address || !personal?.zipcode
    const handleSumbit = (async()=>{
        load = true
        const { status} = await $app.setProfileDetails(personal)
        if(status === "success"){
            window.location.href = $page.url.pathname; 
        }
        load = false
    })
</script>


<div class="KJkjdkp">
    <div class="title-idp">User information</div>
    <div class="detailed-infor">Please fill in the following information to let us know about you. Thank you!</div>
    <div class="totally-infolded">
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Nickname</div>
            <div class="input-control" >
                {#if $user?.details?.nickname}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                    <input type="text" readonly value={$user?.details?.nickname} placeholder="Enter Nickname" >
                {:else}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                    <input type="text" tabindex="1" autocomplete="off" bind:value={personal.nickname} placeholder="Enter Nickname" >
                {/if}
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Date of Birth</div>
            <div class="input-control" >
                {#if $user?.details?.dob}
                 <!-- svelte-ignore a11y-positive-tabindex -->
                 <input type="date" readonly value={$user?.details?.dob} placeholder="19/09/2000" >
                {:else}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                    <input type="date" tabindex="1" max="2006-12-31" bind:value={personal.dob} autocomplete="off" placeholder="19/09/2000" >
                {/if}
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">First name</div>
            <div class="input-control" >
                {#if $user?.details?.firstname}
                 <!-- svelte-ignore a11y-positive-tabindex -->
                 <input type="text" readonly value={$user?.details?.firstname} >
               {:else}
                 <!-- svelte-ignore a11y-positive-tabindex -->
                 <input type="text" bind:value={personal.firstname} tabindex="1" autocomplete="off" placeholder="Enter First name" >
               {/if}
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Last name</div>
            <div class="input-control" >
                {#if $user?.details?.lastname}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                    <input type="text" readonly value={$user?.details?.lastname} >
                {:else}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                    <input type="text" bind:value={personal.lastname} tabindex="1" autocomplete="off" placeholder="Enter Last name" >
                {/if}
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Country</div>
            <div class="input-control" >
                <!-- svelte-ignore a11y-positive-tabindex -->
                <input type="text" readonly value={$user?.country} >
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">ZIP/Postal Code</div>
            <div class="input-control" >
                {#if $user?.details?.zipcode}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                    <input type="text" readonly value={$user?.details?.zipcode} >
                {:else}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                    <input type="text" tabindex="1" bind:value={personal.zipcode} autocomplete="off" placeholder="203300" >
                {/if}
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">City</div>
            <div class="input-control" >
                {#if $user?.details?.city}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                    <input type="text" readonly value={$user?.details?.city} >
                {:else}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                     <input type="text" tabindex="1" bind:value={personal.city} autocomplete="off" placeholder="City" >
                {/if}
            </div>
        </div>
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">Address</div>
            <div class="input-control" >
                {#if $user?.details?.address}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                    <input type="text" value={$user?.details?.address} >
                {:else}
                    <!-- svelte-ignore a11y-positive-tabindex -->
                    <input type="text" tabindex="1" bind:value={personal.address} autocomplete="off" placeholder="Address" >
                {/if}
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
.title-idp{
    color: #fff;
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
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: dense;
    gap: 1rem 0.2375rem;
}
</style>