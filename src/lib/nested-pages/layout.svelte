<script>
    export let route
    import CloseButton from "$lib/components/close-button.svelte";
    const logo = new URL('$lib/images/catLogo.png', import.meta.url).href
    import "../../styles/wallet.css"
    import Deposit from "./deposit.svelte";
    import Settings from "./profile/layout.svelte";
    import Withdraw from "./withdraw.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    $: url = $page.url.pathname
    const handleRoute = ((route)=>{
        goto(`${!url ? "/" : url === "/" ? "" : url}?modal=setting&tab=${route}`)
    })


</script>
<div class="sc-bkkeKt kBjSXI" style="opacity: 1;">
    <div class="dialog sc-hRnpUl gA-DObP">
        <div class="dialog-head has-close">
            <!-- <img alt="" src="{logo}" class="sc-faIbUi jUOgyY"> -->
            <div class="dialog-title">Settings</div>
        </div>
        <CloseButton from="nested" theme={null} />
        <div class="dialog-body no-style sc-hRnpUl gA-DObP" >
            <div id="wallet" class="sc-eMHfQD jMKwQa">
                {#if route.modal === "setting"}
                    <div class="sc-kkIjYy brDMDr">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=> handleRoute("basic")} class="tab {route.tab === "basic" || !route.tab ? "active" : ""} ">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Setting"></use>
                        </svg>
                        <div class="title">Basic</div>
                    </div>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=>handleRoute("security")} class="tab {route.tab === "security" ? "active" : ""}">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Security"></use>
                        </svg>
                        <div class="title">Security</div>
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=>handleRoute("personal")} class="tab {route.tab === "personal" ? "active" : ""}">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_person"></use>
                        </svg>
                        <div class="title">Personal information</div>
                    </div>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=>handleRoute("upgrade")} class="tab {route.tab === "upgrade" ? "active" : ""}">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_upgrade"></use>
                        </svg>
                        <div class="title">Upgrade</div>
                    </div>
                </div>
                {/if}

                {#if route.modal === "deposit"}
                    <Deposit />
                {:else if route.modal === "withdraw"}
                    <Withdraw />
                {:else if route.modal === "setting"}
                    <Settings {route} />
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .dialog, .no-style{
        background-color: #131620;
    }
    /* .jUOgyY{
        height: 1.875rem;
        margin: 1rem 0px;
    } */
</style>