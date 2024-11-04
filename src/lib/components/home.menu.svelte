<script>
    import { user } from "$lib/store/profile.js"
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()

   export async function logout() {
        const res = await fetch('/logout', { method: 'POST' });
        if (res.ok) {
            window.location.href = $page.url.pathname; 
        }
    }

</script>

<div class="setting-wrap" style="opacity: 1; transform: none;">
    <div class="sc-cjrPHo emGYim">
        <div class="user-info">
            <div class="left" >
                <img class="avatar " alt="" src="{$user?.profile_image}">
                <div class="name-level">
                    <p>{$user?.username}</p>
                    <div class="level">
                        <div class="sc-jQrDum jouJMO user-level type-0">
                            <div class="level-wrap">
                                <span>L</span>
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={()=> goto("/game-settings")} class="right">
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                    <use xlink:href="#icon_Setting"></use>
                </svg>
                <p>Game Settings</p>
            </div>
        </div>
        <div class="vip-info notranslate">
            <div class="num">
                <p>Level 0</p>
                <p><span>Need 1 xp</span>Level 1</p>
            </div>
            <div class="vip-bg">
                <div class="bg">
                    <div class="status" style="width: 2%; background: rgb(145, 150, 168);"></div>
                </div>
                <div class="bg_status" style="color: rgb(145, 150, 168);">0%</div>
            </div>
        </div>
        <div class="link-info">
            <div class="link-item">
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div on:click={()=> dispatch("route", "deposit")} class="hover">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                        <use xlink:href="#icon_UserProfile"></use>
                    </svg>
                    Deposit
                </div>
            </div>
            <div class="link-item">
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=> dispatch("route", "withdraw")} class="hover">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Wallet"></use>
                        </svg>
                        Withdraw
                    </div>
                </div>
                <div class="link-item">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=> goto("/leaderboard")} class="hover">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_leaderboard"></use>
                        </svg>
                        Leaderboard
                    </div>
                </div>
                <div class="link-item">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=> goto("/staking")} class="hover">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_leaderboard"></use>
                        </svg>
                        Staking
                    </div>
                </div>
                <div class="link-item">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=> goto("/transactions")} class="hover">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Transaction"></use>
                        </svg>
                        Transactions
                    </div>
                </div>
                <div class="link-item">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div  class="hover">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Support"></use>
                        </svg>
                        Live Support
                    </div>
                </div>
                <div class="link-item">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=> goto("/daily-reward")} class="hover">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Reward"></use>
                        </svg>
                      Daily  Reward
                    </div>
                </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div on:click={()=> goto("/affiliate")} class="link-item">
                    <div class="hover">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Affiliate"></use>
                        </svg>
                        Affiliate
                    </div>
                </div>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={logout} class="logout">
                <span>
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                        <use xlink:href="#icon_Logout"></use>
                    </svg>
                    Logout
                </span>
            </div>
        </div>
</div>

<style>

 .setting-wrap {
    position: absolute;
    right: 0px;
    top: 100%;
    z-index: 100000;
    padding-top: 0.75rem;
}
.emGYim .user-info .right:hover p {
    color: rgb(245, 246, 247);
}
.emGYim .user-info .right:hover svg {
    fill: rgb(245, 246, 247);
}
.emGYim {
    cursor: auto;
    height: 23.625rem;
    width: 30.5rem;
    background-color: #131620;
    border-radius: 1.25rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 8px 0px;
    padding: 1rem 0px;
}
.emGYim .user-info {
    width: 100%;
    height: 2.625rem;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 0px 1.125rem;
}
.emGYim .user-info .left {
    display: flex;
}
.emGYim .user-info .left {
    display: flex;
}
.emGYim .user-info .left > img {
    width: 2.625rem;
    height: 2.625rem;
    border-radius: 50%;
}
.emGYim .user-info .left > img {
    width: 2.625rem;
    height: 2.625rem;
    border-radius: 50%;
}
.emGYim .user-info .left .name-level p {
    margin: 0px;
    font-size: 1rem;
    color: rgb(245, 246, 247);
    line-height: 1.25rem;
    font-weight: bold;
}
.emGYim .user-info .right {
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-top: 0.25rem;
    height: 1.25rem;
}
.emGYim .user-info .right svg {
    margin-right: 0.25rem;
    fill: rgba(153, 164, 176, 0.7);
}
.emGYim .user-info .right p {
    margin: 0px;
    line-height: 1.25rem;
    color: rgba(153, 164, 176, 0.7);
}
.emGYim .user-info .right p {
    margin: 0px;
    line-height: 1.25rem;
    color: rgba(153, 164, 176, 0.7);
}
.emGYim .vip-info .num {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    height: 1rem;
    margin: 0px 1.25rem;
}
.emGYim .vip-info .num > p {
    font-size: 0.75rem;
    margin: 0px;
    color: rgb(245, 246, 247);
}
.emGYim .vip-info .num > p span {
    color: rgba(153, 164, 176, 0.7);
    margin-right: 1rem;
}
.emGYim .vip-info .vip-bg {
    height: 2.25rem;
    margin-top: 0.3125rem;
    position: relative;
    background: #22232F;
    border-radius: 1.125rem;
    font-size: 0px;
    padding: 0px 1.5rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}
.emGYim .vip-info .vip-bg .bg {
    width: 92%;
    height: 0.5rem;
    background-color: rgb(67, 74, 85);
    border-radius: 0.25rem;
}
.emGYim .vip-info .vip-bg .bg .status {
    z-index: 2;
    height: 0.5rem;
    border-radius: 0.25rem;
}
.emGYim .vip-info .vip-bg .bg_status {
    width: 4%;
    height: auto;
    font-size: 0.75rem;
    text-align: center;
    white-space: nowrap;
    margin-left: 4%;
    margin-top: -0.125rem;
}

.emGYim .link-info {
    margin: 0.625rem 1.125rem;
    padding: 0.75rem 0.5rem;
    display: flex;
    flex-wrap: wrap;
    border-radius: 1.25rem;
    color: rgba(153, 164, 176, 0.7);
    background-color: #22232F;
}
.emGYim .link-info .link-item {
    height: 2.25rem;
    width: 50%;
}
.emGYim .link-info .link-item .hover {
    width: 13.65rem;
    height: 100%;
    border-radius: 1.125rem;
    padding-left: 1rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
}
.emGYim .link-info .link-item .hover .icon {
    margin-right: 0.875rem;
}
.emGYim .link-info .link-item .hover:hover svg {
    fill: rgb(245, 246, 247);
}
.emGYim .link-info .link-item .hover:hover {
    background-color: rgba(49, 52, 60, 0.3);
    color: rgb(245, 246, 247);
}
.emGYim .logout {
    height: 1.25rem;
    line-height: 1.25rem;
    margin-top: 1rem;
    margin-left: 1.125rem;
    color: rgba(153, 164, 176, 0.6);
}
.emGYim .logout span {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-left: 1.5rem;
    cursor: pointer;
    width: 7.5rem;
    white-space: nowrap;
}
.emGYim .logout span .icon {
    margin-right: 0.875rem;
}
.emGYim .logout:hover {
    color: rgb(245, 246, 247);
}
.emGYim .logout:hover svg {
    fill: rgb(245, 246, 247);
}
@media screen and (max-width: 621px) {
    .emGYim {
        width: 100%;
        left: 0px;
        border-radius: 0px 0px 1.25rem 1.25rem;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 6px 16px 0px;
    }
}
@media screen and (max-width: 621px) {
    .setting-wrap {
        padding-top: 0px;
    }
}

</style>