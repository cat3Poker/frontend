<script>
    import { balanceFormat } from "$lib/utils/balanceFormat.js";
    import { user } from "$lib/store/profile.js"
    const logo = new URL('$lib/images/catLogo.png', import.meta.url).href
    const profile = new URL('$lib/images/defaultProfile.jpg', import.meta.url).href
</script>

<div id="header" class="sc-gVkuDy gAvMHL kCKrbU">
    <div class="header-wrap">
        <div class="header">
            <div class="sc-hGnimi ftyLxH left">
                <img src="{logo}" alt="">
            </div>
            <div class="sc-DtmNo euzHLF right">
                <div class="sc-gjNHFA juteh wallet-enter">
                    <button class="balance">
                        <img src="https://cryptologos.cc/logos/thumbs/solana.png?v=034" class="img-coin" alt="">
                        <span> {balanceFormat($user?.balance)}</span>
                    </button>
                    <button class="deposit-contss">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Wallet"></use>
                        </svg>
                        Deposit
                    </button>
                    <div class="Jow-sKJke withdraw-3zddcd">
                        <button class="withdrawal-coloeswjk">
                            Withdrawal
                        </button>
                    </div>
                    <div class="djksl filingde niehn">
                        <div class="jkemOjek">
                            <img src="{$user?.profile_image ? $user?.profile_image : profile}" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>

</style>