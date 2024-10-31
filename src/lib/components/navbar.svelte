<script>
    import { balanceFormat } from "$lib/utils/balanceFormat.js";
    import { user } from "$lib/store/profile.js"
    import { goto } from "$app/navigation";
    const profile = '/assets/defaultProfile.jpg'
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import HomeMenu from "./home.menu.svelte";
    $: url = $page.url.pathname
    $: showMenu = false
    const handleRouteNav = (( route)=>{
        goto(`${!url ? "/" : url === "/" ? "" : url}?modal=${route}`)
        if(browser){
            document.body.style.overflow = 'hidden';
        } 
    })

</script>

<div id="header" class="sc-gVkuDy gAvMHL kCKrbU">
    <div class="header-wrap">
        <div class="header">
            <div class="sc-hGnimi ftyLxH left">
                <img src="/assets/logo.png" alt="">
            </div>
            <div class="sc-DtmNo euzHLF right">
                <div class="sc-gjNHFA juteh wallet-enter">
                    <button class="balance">
                        <img src="assets/solana.png" class="img-coin" alt="">
                        <span> {balanceFormat($user?.balance)}</span>
                    </button>
                    <button on:click={()=> handleRouteNav("deposit")} class="deposit-contss">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Wallet"></use>
                        </svg>
                        Deposit
                    </button>
                    <div class="Jow-sKJke withdraw-3zddcd">
                        <button on:click={()=> handleRouteNav("withdraw")} class="withdrawal-coloeswjk">
                            Withdrawal
                        </button>
                    </div>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:mouseenter={()=> showMenu = true} on:mouseleave={()=> showMenu = false} class="djksl filingde niehn">
                        <div  class="jkemOjek">
                            <img src="{$user?.profile_image ? $user?.profile_image : profile}" alt="">
                        </div>
                        {#if showMenu}
                            <HomeMenu on:route={(e)=> handleRouteNav(e.detail)} />
                        {/if}
                    
                    </div>
                    <div class="KJlepiekd">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <svg on:click={()=> handleRouteNav("setting")} xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Setting"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.KJlepiekd{
    margin: 3px;
}
.KJlepiekd svg{
    width: 30px;
    height: 30px;
}
</style>