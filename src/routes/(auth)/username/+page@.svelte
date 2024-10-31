
<script>
    import { browser } from "$app/environment";
    import { auth } from "$lib/store/activities.js";
    import { toast } from "svelte-sonner";
    export let data
    import CloseButton from "$lib/components/close-button.svelte";
    import { onMount } from "svelte";
    import Loader from "$lib/loader.svelte";
    const emptyImg = new URL('$lib/images/empty.png', import.meta.url).href
    let defaultImg = new URL('$lib/images/default.png', import.meta.url).href
    let username = ""
    let incomingValue = ""
    let country = ""
    let _country = ""
    $: load = false

    $: track = load || !country || !username || !defaultImg

    onMount(async()=>{
        if(data._preLogin){
            browser ? incomingValue = data._preLogin : location.href = "signup" 
        }
        const letJh = await $auth.fetchCountry()
        let regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
        if(letJh?.country){
             let res = letJh?.country
             _country = regionNamesInEnglish?.of(res)
            country = _country
        }
    })

    let image;
    let imageUrl = '';
    const previewImage = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl = e.target.result;
            defaultImg = imageUrl
        };
        reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (async()=>{
        load = true
        if(!username || username.length <= 2){
            return toast.error("Username is invalid")
        }
        let daat = {
            username, 
            image:defaultImg,
            country,  
            auth: data._preLogin
        }
        const {status} = await $auth.setUserName(daat)
        if(status === "success"){
            window.location.href = "/"
        }
        load = false
    })

</script>


<div class="auth-page">
    <div class="auth-container">
        <div class="sc-bkkeKt kBjSXI" style="opacity: 1;">
            <div class="dialog sc-hRnpUl gA-DObP">
                <div class="dialog-head has-close">
                    Last Step
                </div>
                <CloseButton theme="btn"/>
                <div class="dialog-body no-style sc-hRnpUl gA-DObP" >
                    <div class="sc-dkPtRN jScFby scroll-view hide-bar sc-hCwLRM gVXbPg">
                        To make CAT³ POKER a better place, we would love to know more about you. Thanks a lot for your patience!
                        <div class="sc-ezbkAF kDuLvp input ">
                            <div class="input-label">Choose Your Username</div>
                            <div class="input-control">
                                <!-- svelte-ignore a11y-positive-tabindex -->
                                <input type="text" tabindex="2" autocomplete="off" placeholder="Enter Username" bind:value={username}>
                                <img class="empty-username" src="{emptyImg}" alt="">
                            </div>
                        </div>
                        
                        <div class="change-section">
                            <div class="change-section-sOPmms">
                                <div class="change-imgskksIee">
                                    <img src="{defaultImg}" alt="">
                                    <button class="update-avartar">
                                        Upload Avatar
                                     </button>
                                     <input type="file" on:change={previewImage} bind:this={image}>
                                </div>
                            </div>
                        </div>

                        <div class="settings">
                            <div class="title">
                                Settings
                            </div>
                            <div class="sc-ezbkAF kDuLvp input ">
                                <div class="input-label">Country</div>
                                <div class="input-control">
                                    <!-- svelte-ignore a11y-positive-tabindex -->
                                    <input type="text" tabindex="2" autocomplete="off" bind:value={country} placeholder="Enter Country" >
                                </div>
                            </div>
                        </div>


                        <div class="buttons">
                            <button disabled={track} on:click={handleSubmit} class="sc-iqseJM sc-bqiRlB cBmlor fnKcEH button button-big long">
                                <div class="button-inner">
                                    {#if load}
                                        <Loader />
                                    {:else}
                                        Save
                                    {/if}
                                </div>
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .auth-page{
        position: relative;
        width: 100%;
        height: 100vh;
        gap: 0px;
        background: linear-gradient(180deg, #BCFF6F 0%, #6B078B 100%);
    }
    .auth-container{
        background-image: url(../../../lib/images/8ea3fdf49d12611dcb55fd40afa5ee21.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100vh;
    }
    .dialog-body{
        padding:60px  20px;
    }
    .dialog-head{
        font-weight: 800;
        font-size: 19px;
    }
    .empty-username{
        width: 80px;
        position: absolute;
        right: 5px;
        top: -23px;
    }
    .change-section{
        position: relative;
        margin: 25px 0;
        background-color: var(--input-bg);
        border-radius: 12px;
    }
    .change-imgskksIee{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: 200px;
        height: 200px;
        position: relative;
    }
    .change-imgskksIee img{
        width: 100%;
        background: #8BBC02;
        border-radius: 50%;
    }
    .update-avartar{
        position: absolute;
        bottom: 5px;
        background: #1E7929;
        color: #fff;
        padding: 9px 20px;
        border-radius: 30px;
    }
    .change-imgskksIee input{
        opacity: 0;
        background-color: #6B078B;
        position: absolute;
        left: 0px;
        cursor: pointer;
        bottom: 12px;
    }
    .change-section-sOPmms{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 10px;
    }
    .buttons{
        margin-top: 20px ;
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