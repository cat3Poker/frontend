<script>
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import {app} from "$lib/store/activities.js";
    import Loader from "$lib/loader.svelte";
    const dispatch = createEventDispatcher()
    $: load = false
    $: codeEl = ""
    $: focued = ""
    let codes = ""

    $: track = codes.length !== 6 

    onMount(async()=>{
        load = true
        const {response} = await $app.generate2FAsecrete()
        codeEl = response
        load = false
    })

    function addFocusClass() {
        focued = "focus-list"
    }

    function removeFocusClass() {
        focued = ""
    }

    const verification = (async()=>{
        const { status } = await $app.handleverifyFA_Token({token:codes , secret : codeEl.secret})
        if(status === "success"){
            dispatch("confirm", status)
        }
    })

</script>


    <div class="sc-dkPtRN jScFby scroll-view sc-hiEfMO eTKISx">
        <div class="sc-eYoysV kjoSeQ">
            <div class="codes">
                <p>Verification code</p>
                <div class="sc-cvZCdy hooaaA">
                    <div class="google-input">
                        <input autocomplete="new-password" maxlength="6" on:focus={addFocusClass} on:blur={removeFocusClass} type="password" bind:value={codes}>
                        <ul class="{focued}">
                            <li class="{!codes.length ? "active" : ""}">{codes ? codes[0] : ""}</li>
                            <li class="{codes.length === 1 ? "active" : ""}">{codes[1] ? codes[1] : ""}</li>
                            <li class="{codes.length === 2 ? "active" : ""}">{codes[2] ? codes[2] : ""}</li>
                            <li class="{codes.length === 3 ? "active" : ""}">{codes[3] ? codes[3] : ""}</li>
                            <li class="{codes.length === 4 ? "active" : ""}">{codes[4] ? codes[4] : ""}</li>
                            <li class="{codes.length === 5 ? "active" : ""}">{codes[5] ? codes[5] : ""}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <button disabled={track} on:click={verification} class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal">
                <div class="button-inner">
                    {#if load}
                        <Loader />
                    {:else}
                        Verify
                    {/if}
                </div>
            </button>
        </div>
    </div>

<style>

.jScFby {
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    touch-action: pan-y;
    overscroll-behavior: contain;
}
.jScFby::-webkit-scrollbar{
    display: none;
}
.jScFby{
      scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
.eTKISx > div {
    padding-bottom: 2rem;
    margin-top: 0.5rem;
}
.kjoSeQ .google-step-summary-top {
    font-size: 0.75rem;
    line-height: 1.25rem;
}
.eTKISx .google-step-summary-top {
    padding: 1rem 1.25rem;
    border-radius: 0.625rem;
    border: 1px solid rgb(45, 48, 53);
    background-color: rgba(45, 48, 53, 0.5);
}
.eTKISx .google-step-summary-top.two {
    background-color: transparent;
    border: none;
    padding: 0px 1.25rem;
    margin-top: 0.75rem;
}
.kjoSeQ .qrcode-warp {
    padding: 0.3125rem;
    background: rgb(255, 255, 255);
    border-radius: 0.75rem;
    font-size: 0px;
    width: 8.125rem;
    margin: 1.25rem auto 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}
.eTKISx .qrcode-warp {
    margin-top: 0.75rem;
    background: rgb(245, 246, 247);
    width: 8.625rem;
    height: 8.625rem;
}
.hooaaA .google-input > ul.focus-list .active {
    border: 1px solid rgb(67, 179, 9);
}
.eTKISx .copy-input {
    margin-top: 0.75rem;
}
.eTKISx .input {
    margin-top: 1.5rem;
}
.eTKISx .copy-input .input-label {
    margin-left: 0.625rem;
}
.eTKISx .input .input-control {
    height: 3.5rem;
}
.kjoSeQ .copy-input .input-control .copy-button {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 0.125rem;
}
.kjoSeQ .twofa-alert {
    font-size: 0.75rem;
    line-height: 1.25rem;
    margin-top: 0.75rem;
}
.eTKISx .twofa-alert {
    margin: 1.125rem 0px 0px;
    padding: 0px 1.25rem 2.25rem;
    border-bottom: 1px solid rgba(176, 179, 191, 0.1);
}
.eTKISx .codes {
    margin: 1.5rem;
}
.hooaaA {
    width: 100%;
    text-align: center;
}
.eTKISx .codes .google-input {
    margin-top: 0.875rem;
}
.hooaaA .google-input {
    position: relative;
    display: inline-block;
    width: auto;
}
.hooaaA .google-input > input {
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    color: transparent;
    caret-color: transparent;
}
.hooaaA .google-input > ul {
    padding: 0px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin: 0px auto;
}
.hooaaA .google-input > ul li {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    margin-right: 0.375rem;
    border-radius: 0.625rem;
    font-size: 1rem;
    background-color: rgba(30, 32, 36, 0.6);
    border: 1px solid transparent;
    font-weight: bold;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}
.eTKISx .codes .google-input ul li {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 1.25rem;
    margin-right: 0.625rem;
    border: 1px solid rgb(45, 48, 53);
    background-color: rgba(45, 48, 53, 0.5);
    color: rgb(245, 246, 247);
}
.eTKISx > div > button {
    margin-top: 2rem;
}
.kjoSeQ > button {
    width: 11.25rem;
    height: 3rem;
    margin: 1.25rem auto 0px;
}
</style>