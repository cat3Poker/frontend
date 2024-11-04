<script>
    import CloseButton from "$lib/components/close-button.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import {app} from "$lib/store/activities.js";
    import Loader from "$lib/loader.svelte";
    import { toast } from "svelte-sonner";
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
            toast.success("Google is turned on")
            goto($page.url.pathname)
        }
    })

</script>
<div class="dialog " >
    <button on:click={()=> history.back()} class="dialog-back" style="opacity: 1; transform: none;">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
            <use xlink:href="#icon_Arrow"></use>
        </svg>
    </button>
    <div class="dialog-head has-back has-close">
        <div class="dialog-title">Security-2FA</div>
    </div>
    <CloseButton theme={false} from=""/>
    <div class="dialog-body default-style " style="z-index: 2; transform: none;">
        <div class="sc-dkPtRN jScFby scroll-view sc-hiEfMO eTKISx">
            {#if !load}
                <div class="sc-eYoysV kjoSeQ">
                    <div class="google-step-summary-top">Download and install <a target="_blank" href="https://support.google.com/accounts/answer/1066447?hl=en&amp;rd=1">Google Authenticator</a>. Enable Two-factor Authentication to protect your account from unauthorized access.</div>
                    <div class="google-step-summary-top two">Scan the QR code with your Google Authenticator App or enter the secret key manually.</div>
                    <div class="qrcode-warp">
                        <img src="{codeEl?.qrCode}" alt="qrcode">
                    </div>
                    <div class="copy-input">
                        <div class="sc-ezbkAF gcQjQT input sc-fbyfCU fWAvBM">
                            <div class="input-label">Your secret key</div>
                            <div class="input-control">
                                <input type="text" readonly value="{codeEl?.secret}">
                                <button on:click={()=> $app.copyToClipboard(codeEl?.secret)} class="sc-iqseJM cBmlor button button-normal copy-button">
                                    <div class="button-inner">
                                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                                            <use xlink:href="#icon_Copy"></use>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <p class="twofa-alert">Write down this code, never reveal it to others. You can use it to regain access to your account if there is no access to the authenticator.</p>
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
                                Enable
                            {/if}
                        </div>
                    </button>
                </div>
                {:else}
                <Loader color={"white"}/>
            {/if}
        </div>
    </div>
</div>

<style>
.dialog {
    background-color: #131620;
    color: rgba(153,164,176,.8);
}
.default-style {
    padding-top: 3.75rem;
    background-color: #131620;
}
.dialog-body {
    position: absolute;
    inset: 0px;
    display: flex;
    overflow: hidden;
}
.dialog-back {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 11;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 3.75rem;
    height: 3.75rem;
}
.dialog-head.has-back {
    margin-left: 3.125rem;
}
.dialog-head.has-close {
    margin-right: 3.75rem;
}
.dialog-head {
    position: relative;
    z-index: 10;
    flex: 0 0 auto;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 3.75rem;
    margin-left: 1.125rem;
    transition: 0.5s;
}
.dialog-head .dialog-title {
    font-size: 1rem;
    margin: 0px;
    font-weight: bold;
    flex: 1 1 0%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(245, 246, 247);
}
.default-style > div {
    border-radius: 20px;
    background-color: #CBD7FF08;
    padding: 1.25rem 1.25rem 0px;
}
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
.dialog-body > div {
    flex: 1 1 0%;
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
.kjoSeQ .google-step-summary-top a {
    text-decoration: underline;
    margin-left: 0.25rem;
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
.eTKISx .qrcode-warp img {
    width: 8rem;
    height: 8rem;
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
.gcQjQT .input-label {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    line-height: 1em;
    height: 1.25rem;
    margin: 0px 1.125rem 0.375rem;
    color: rgba(153, 164, 176, 0.6);
}
.eTKISx .copy-input .input-label {
    margin-left: 0.625rem;
}
.gcQjQT .input-control {
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border: 1px solid rgb(45, 48, 53);
    background-color: rgba(45, 48, 53, 0.5);
    opacity: 1;
    height: 2.75rem;
    border-radius: 1.5rem;
    padding: 0px 1.375rem;
}
.eTKISx .input .input-control {
    height: 3.5rem;
}
.gcQjQT .input-control input {
    flex: 1 1 0%;
    width: 100%;
    height: 100%;
    min-width: 1rem;
    padding: 0px;
    border: none;
    background-color: transparent;
    color: rgb(245, 246, 247);
}
.eTKISx .copy-input .input-control input[readonly] {
    opacity: 1;
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
    margin-top: 1.5rem;
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