<script>
    export let route
    import { goto } from "$app/navigation";

    let Menu = [
        {icon: "icon_Home", route: "home"},
        {icon: "icon_leaderboard", route: "leaderboard"},
        {icon: "icon_transaction", route: "transactions"},
        {icon: "icon_staking", route: "staking"},
        {icon: "icon_gaming", route: "gaming"},
        {icon: "icon_affiliate", route: "affiliate"},
        {icon: "icon_daily-reward", route: "daily-reward"},
        {icon: "icon_Setting", route: "game-settings"},
    ]
    const handleRoutes = ((e)=> {
        goto(`/${e}`)
    })
    $: routeEl = (route.url).replace("/", "")
</script>

<div class="menu-bar">
    <div class="menu-bar-container">
        {#each Menu as me}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={()=> handleRoutes(me.route)} class="content {me.route === routeEl ? "active" : ""}">
                <div class="item-icon">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                        <use xlink:href="#{me.icon}"></use>
                    </svg>
                </div>
                <div class="item-text">
                    {(me.route).replace("-", " ")}
                </div>
            </div>
        {/each}
    </div>
</div>