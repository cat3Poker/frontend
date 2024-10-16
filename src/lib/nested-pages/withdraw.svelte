<script>

    import { balanceFormat } from "$lib/utils/balanceFormat.js";

</script>
<div class="sc-dkPtRN jScFby scroll-view sc-lnDqNf jVlMUR" id="deposit">
    <div class="sc-lcDUFh sc-jWULZn kakHxb cTrEXP">
        <div class="sc-ezbkAF kDuLvp input ">
            <div class="input-label">
                <div style="flex: 1 1 0%;">Withdraw Currency</div>
                <a href="/transactions/withdraw/ETH">Record</a>
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
        <div class="sc-ibkupM dxsZcP">
            <div class="sc-cCKzRf gpjOyl">
                <div class="label">
                    <div>Withdraw Address <span class="cl-primary">(Note: Only SOL)</span></div>
                </div>
                <div class="box">
                    <div class="cont">
                        <input class="address" placeholder="Fill in carefully according to the specific currency" value="">
                    </div>
                </div>
            </div>
            <div class="sc-ezbkAF kDuLvp input sc-jLuXOi eNZvEb">
                <div class="input-label">
                    <div style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
                        <div>Withdraw amount</div> 
                        <div style="font-size: 12px;">Min: 0.014</div>
                    </div>
                </div>
                <div class="input-control">
                    <input type="text" value="0.000000000">
                    <div class="btn-wrap">
                        <button>Min</button>
                        <button>25%</button>
                        <button>50%</button>
                        <button>Max</button>
                    </div>
                </div>
            </div>
            <div class="sc-fBNLhH jpBmuP">
                <div class="sc-fXNlap hYljmM">
                    <div class="sc-eCFVrV ewSbYE">Fee&nbsp;<b> 0.002 SOL</b></div>
                    <button class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal sub-btn">
                        <div class="button-inner">Confirm</div>
                    </button>
                </div>
                <div class="sc-jaskfy nrHfU">For security purposes, large or suspicious withdrawal may take 1-6 hours for audit process. We appreciate your patience!</div>
            </div>
        </div>
    </div>
</div>