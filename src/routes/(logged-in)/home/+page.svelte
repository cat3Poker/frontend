<script>
    import { goto } from "$app/navigation";
    import "../../../styles/home.css"
    const banner1 = new URL('$lib/images/banner1.png', import.meta.url).href
    const banner2 = new URL('$lib/images/banner2.png', import.meta.url).href
    const depsO = new URL('$lib/images/defaultProfile.jpg', import.meta.url).href

    let Oms = [1,2,3,4,,5,6,7,8,9,0,8,7,6]
</script>

<div class="home-page">
    <div class="hoIUe PkeKJle">
        <div class="banner-container defsuKJH">
            <div class="banner-contents">
                <img src="{banner1}" alt="">
                <div class="img-footer fieKJBW">
                    <div class="name-foemsse">
                        texas Holdem
                    </div>
                    <div class="button">
                        <button on:click={()=> goto("/texas-holdem")}>play</button>
                    </div>
                </div>
            </div>
            <div class="banner-contents">
                <img src="{banner2}" alt="">
                <div class="img-footer KN22jkH">
                    <div class="name-foemsse">
                        omaha
                    </div>
                    <div class="button">
                        <button>play</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="welcome-section KiJEo">
            <div class="KJHELnd"> Welcome, <span>Gamblify</span></div>
            <div class="KskoNJKej switch">
                <div class="JKJkejnn">
                    Monthly
                </div>
                <div class="JKJkejnn active">
                    Daily
                </div>
            </div>
        </div>

        <div class="JHKHeobui335">
            <div class="tjekos">Top 3</div>
            <div class="KJineionw Oikwks _1st">
                <div class="img-pro">
                    <img src="{depsO}" alt="">
                    <div class="detaie-onstKKke">
                        <div class="name">Hidden User</div>
                        <div class="wager">$1,236,456 wagered</div>
                    </div>
                </div>
                <div class="totalsel">
                    $4,345.99
                </div>
            </div>

            <div class="KJineionw Oikwks _2nd">
                <div class="img-pro">
                    <img src="{depsO}" alt="">
                    <div class="detaie-onstKKke">
                        <div class="name">Hidden User</div>
                        <div class="wager">$1,236,456 wagered</div>
                    </div>
                </div>
                <div class="totalsel">
                    $4,345.99
                </div>
            </div>

            <div class="KJineionw Oikwks _3rd">
                <div class="img-pro">
                    <img src="{depsO}" alt="">
                    <div class="detaie-onstKKke">
                        <div class="name">Hidden User</div>
                        <div class="wager">$1,236,456 wagered</div>
                    </div>
                </div>
                <div class="totalsel">
                    $4,345.99
                </div>
            </div>
        </div>

        <div class="JHKHeobui335">
            <div class="tjekos">All Players</div>
            {#each Oms as w}
                <div class="KJineionw Oikwks all">
                    <div class="img-pro">
                        <img src="{depsO}" alt="">
                        <div class="detaie-onstKKke">
                            <div class="name">Hidden User</div>
                        </div>
                    </div>
                    <div class="totalsel">
                        $4,345.99
                    </div>
                </div>
            {/each}
         

        </div>

    </div>
</div>