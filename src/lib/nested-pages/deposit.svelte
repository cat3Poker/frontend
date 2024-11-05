<script>
    import {app} from "$lib/store/activities.js";
    import { balanceFormat } from "$lib/utils/balanceFormat.js";
    import { onMount } from "svelte";
    import QRCode from '@castlenine/svelte-qrcode';
    import Loader from "$lib/loader.svelte";
    let load = true
    let truncatedAddress
    let address = ""

    onMount(async()=>{
        const {response} = await $app.depostAddress()
        address = response.data?.address
        truncatedAddress = address.substring(0, 4) + "...." + address.substring(address.length - 5, address.length);
        load = false
    })

</script>

{#if !load}
    <div class="sc-dkPtRN jScFby scroll-view hide-bar sc-hCwLRM gVXbPg">
        <div class="sc-lcDUFh kakHxb">
            <div id="deposit" class="sc-gmQyQr iTFxbf">
                <div class="sc-ezbkAF kDuLvp input ">
                    <div class="input-label">
                        <div style="flex: 1 1 0%;">Deposit Currency</div>
                        <!-- <a href="/transactions/deposit/SOL">Record</a> -->
                    </div>
                    <div class="sc-ePIFMk ieqRur input-control">
                        <div class="sc-iNpzLj dbclKc">
                            <div class="wrap">
                                <img class="coin-icon" alt="" src="/assets/solana.png">
                                <span class="currency">SOL</span>
                                <!-- <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                                    <use xlink:href="#icon_Arrow"></use>
                                </svg> -->
                            </div>
                        </div>
                        <div class="sc-iyyVIK fKpjfd">
                            <div class="wrap">
                                <div class="tit">Balance : </div>
                                <div class="amount">{balanceFormat(0)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sc-cnTVOG dRkVfn">
                    <div class="sc-cCKzRf gpjOyl">
                        <div class="label">
                            <div>Deposit Address&nbsp;( Note: Only <span class="cl-primary"> SOLANA </span> )</div>
                            <div class="notranslate">{truncatedAddress}</div>
                        </div>
                        <div class="box">
                            <div class="cont">
                            <input class="address" readonly value="{address}">
                            <button on:click={()=> $app.copyToClipboard(address)} class="sc-iqseJM cBmlor button button-normal copy-button">
                                <div class="button-inner">
                                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                                        <use xlink:href="#icon_Copy"></use>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="sc-jTycuM fKyATD">
                    <QRCode data={address} isResponsive  />
                </div>
                <div class="sc-jSYIrd jtZICR">
                    <p><span class="cl-primary">NOTICE:</span> Send only SOL to this deposit address. Coins will be deposited automatically after 6 network confirmations. Smart contract addresses are not supported(Contact us).</p>
                </div>
            </div>
        </div>
    </div>
</div>
{:else}
    <Loader color="white"/>
{/if}
