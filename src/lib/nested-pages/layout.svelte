<script>
    export let route
    import CloseButton from "$lib/components/close-button.svelte";
    const logo = new URL('$lib/images/catLogo.png', import.meta.url).href
    import "../../styles/wallet.css"
    import { balanceFormat } from "$lib/utils/balanceFormat.js";
    import Deposit from "./deposit.svelte";
    import Withdraw from "./withdraw.svelte";

</script>
<div class="sc-bkkeKt kBjSXI" style="opacity: 1;">
    <div class="dialog sc-hRnpUl gA-DObP">
        <div class="dialog-head has-close">
            <img alt="" src="{logo}" class="sc-faIbUi jUOgyY">
        </div>
        <CloseButton from="nested" theme={null} />
        <div class="dialog-body no-style sc-hRnpUl gA-DObP" >
            <div id="wallet" class="sc-eMHfQD jMKwQa">
                <div class="sc-kkIjYy brDMDr">
                    {#if route.modal === "deposit"}
                        <Deposit />
                    {:else if route.modal === "withdraw"}
                        <Withdraw />
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .dialog, .no-style{
        background-color: #131620;
    }
    .jUOgyY{
        height: 1.875rem;
        margin: 1rem 0px;
    }
</style>