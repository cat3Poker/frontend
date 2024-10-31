<script>
    export let data;
    import CloseButton from "$lib/components/close-button.svelte";
    import "../../styles/auth/login.css"
    const img = new URL('$lib/images/8ea3fdf49d12611dcb55fd40afa5ee21-removebg-preview.png', import.meta.url).href
    $: Login = "Login to CAT³ Poker"
    $: SignUp = "Create an account with CAT³ Poker"
    $: forget = "Lost your password?"
    $: reset = "Reset your password"

    $: display = data.url === "/login" ? Login : data.url === "/signup" ? SignUp : (data.url).includes("reset-password") ? reset : forget

</script>

<div class="auth-page">
    <div class="auth-container">
        <div class="sc-bkkeKt kBjSXI" style="opacity: 1;">
            <div class="dialog sc-hRnpUl gA-DObP">
                {#if data.url === "/forget"}
                    <button on:click={()=> history.back()} class="dialog-back" style="opacity: 1; transform: none;">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hdEoGl con">
                            <use xlink:href="#icon_Arrow"></use>
                        </svg>
                    </button>
                {/if}
                <div class="dialog-head has-close">
                    <!-- <img alt="" src="{$app.smallLagos}" class="sc-faIbUi jUOgyY"> -->
                </div>
                <CloseButton theme="btn"/>
                <div class="dialog-body no-style sc-hRnpUl gA-DObP" >
                    <div class="welcome">
                        <div class="msg1">{display} </div>
                        <img alt="" src="{img}">
                    </div>
                    <div class="sc-dkPtRN jScFby scroll-view hide-bar sc-hCwLRM gVXbPg">
                        <slot></slot>
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
        background-image: url(../../lib/images/8ea3fdf49d12611dcb55fd40afa5ee21.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100vh;
    }
</style>