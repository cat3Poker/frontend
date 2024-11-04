<script>

    import { balanceFormat } from "$lib/utils/balanceFormat.js";

</script>
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
                            <img class="coin-icon" alt="" src="https://cryptologos.cc/logos/thumbs/solana.png?v=034">
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
                        <div class="notranslate">0x35...EC88e</div>
                    </div>
                    <div class="box">
                        <div class="cont">
                        <input class="address" readonly="" value="0x351455346d88ee6FE927c79f23395143662EC88e">
                        <button class="sc-iqseJM cBmlor button button-normal copy-button">
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
                <img src="https://nanogames.io/api/game/support/qrcode/320/?text=0x351455346d88ee6FE927c79f23395143662EC88e" alt="qr.png">
            </div>
            <div class="sc-jSYIrd jtZICR">
                <p><span class="cl-primary">NOTICE:</span> Send only SOL to this deposit address. Coins will be deposited automatically after 6 network confirmations. Smart contract addresses are not supported(Contact us).</p>
            </div>
        </div>
    </div>
</div>

</div>