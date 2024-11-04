<script>
    export let route
    import { goto } from "$app/navigation";
    export let isCollabs 
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    let Menu = [
        {icon: "icon_Home", route: "home"},
        {icon: "icon_leaderboard", route: "leaderboard"},
        {icon: "icon_Transaction", route: "transactions"},
        {icon: "icon_staking", route: "staking"},
        {icon: "icon_gaming", route: "gaming"},
        {icon: "icon_Affiliate", route: "affiliate"},
        {icon: "icon_daily-reward", route: "daily-reward"},
        {icon: "icon_Setting", route: "game-settings"},
    ]
    
    const handleRoutes = ((e)=> {
        goto(`/${e}`)
    })
    $: routeEl = (route.url).replace("/", "")
</script>

<div class="menu-bar {isCollabs ? "collabs" : ""}">
    <div class="menu-bar-container">
        <button on:click={()=> dispatch("change")} class="hONeioks">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                <use xlink:href="#icon_collabse"></use>
            </svg>
        </button>
        <div class="Kjieoijos">
            {#each Menu as me}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={()=> handleRoutes(me.route)} class="content {me.route === routeEl ? "active" : ""}">
                <div class="item-icon">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                        <use xlink:href="#{me.icon}"></use>
                    </svg>
                </div>
                {#if !isCollabs}
                    <div class="item-text">
                        {(me.route).replace("-", " ")}
                    </div>
                {/if}
            </div>
        {/each}
        </div>
    </div>
</div>
