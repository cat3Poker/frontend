<script>
  let startGameClicked = false;
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { socketData } from "$lib/store/socket";
  import { pokerGames } from "$lib/store/poker";
  import { page } from "$app/stores";

  $: url = $page.url.pathname
  $: availableGames = $pokerGames.reverse().slice(0, 5);

  const handleRouteNav = (( route)=>{
      goto(`${!url ? "/" : url === "/" ? "" : url}?modal=${route}`)
      if(browser){
          document.body.style.overflow = 'hidden';
      } 
  })

</script>

  <div class="texas-page">
    <div class="sc-bOtlzW ftobkw welcome">
      <div class="container">
        <div class="section">
          <button  class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal button">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="button-inner" on:click={() => handleRouteNav("texas-create-id")}>
              Create New Game
            </div>
          </button>
          <div class="title ttu">Available Games to Join</div>
          <div class="content">
            <div class="flex">
              <div class="flex-left">
                <div class="sc-jFkwbb kJxGxs">
                  <div class="table">
                    <div class="thead">
                      <div class="tr fc">
                        <div class="th">Game ID</div>
                        <div class="th">Bet Amount</div>
                      </div>
                    </div>
                    <div class="tbody">
                      {#each availableGames as gam}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="tr fc" on:click={() => goto(`/texas-holdem/`+ gam.gameId)}>
                          <div class="td fc player">
                            <span class="nickname">{gam.gameId}</span>
                          </div>
                          <div class="td fc commission">
                            <div class="sc-Galmp erPQzq coin notranslate">
                              <img
                                class="coin-icon"
                                alt=""
                                src="/assets/solana.png"
                              />
                              <div class="amount">
                                <span class="amount-str"
                                  >{gam.betAmount
                                    .toFixed(8)
                                    .substring(
                                      0,
                                      gam.betAmount.toFixed(8).indexOf("."),
                                    )}.<span class="suffix"
                                    >{gam.betAmount
                                      .toFixed(8)
                                      .substring(
                                        gam.betAmount.toFixed(8).indexOf("."),
                                      )}</span
                                  ></span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      {/each}
                      {#if !availableGames.length}
                        <div style="color: white; width: 100%; padding: 10px;display: flex; align-items: center; justify-content: center">
                          <div style="width: fit-content">No Games available</div>
                        </div>
                      {/if}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


<style>

  .texas-page {
    overflow: auto;
    padding: 0px 20px;
    margin-bottom: 200px;
  }
  .ftobkw {
    overflow: auto;
    padding: 0px 20px;
  }
  .ftobkw > .container {
    max-width: 1328px;
    margin: 0px auto;
    padding-bottom: 120px;
    background: rgb(36, 38, 43);
    padding: 30px;
    width: 800px;
  }
  .ftobkw .section > .title {
    font-size: 24px;
    font-weight: 600;
    color: rgb(245, 246, 247);
    margin-bottom: 40px;
    margin-top: 60px;
    text-align: center;
  }
  .ftobkw .section > .content > .flex {
    margin-top: -0.625rem;
  }
  .flex {
    display: flex;
  }
  .ftobkw .section > .content > .flex .flex-left {
    flex: 1 1 49%;
  }
  .kJxGxs .fc {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    cursor: pointer;
  }
  .kJxGxs .tbody .tr:hover {
    background: rgb(42, 45, 50);
    border-radius: 1.25rem;
  }
  .kJxGxs .tbody .tr:nth-child(2n-1):hover {
    background: rgb(42, 45, 50);
    border-radius: 1.25rem;
  }
  .kJxGxs .tr {
    padding: 0px 46px;
  }
  .kJxGxs .th,
  .kJxGxs .td {
    color: rgb(245, 246, 247);
    overflow: hidden;
  }
  .kJxGxs .th {
    color: rgba(153, 164, 176, 0.6);
  }
  .kJxGxs .th:last-child,
  .kJxGxs .td:last-child {
    text-align: right;
  }
  .ftobkw .button {
    width: 370px;
    height: 70px;
    display: block;
    margin: 0px auto;
    font-size: 20px;
    font-weight: 600;
    font-family: inherit;
  }
  .kJxGxs .tbody .tr:nth-child(2n-1) {
    background: rgb(30, 32, 36);
    border-radius: 1.25rem;
  }
  .kJxGxs .tbody .tr {
    height: 3.5rem;
    font-weight: 600;
  }
  .kJxGxs .tr {
    padding: 0px 46px;
  }
  .kJxGxs .fc {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }
  .kJxGxs .nickname {
    padding-right: 10px;
  }
  .kJxGxs .nickname {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .erPQzq {
    display: inline-flex;
    vertical-align: middle;
    -webkit-box-align: center;
    align-items: center;
    white-space: nowrap;
  }
  .erPQzq .coin-icon {
    width: 1.4em;
    height: 1.4em;
    margin-right: 0.25em;
  }
  .erPQzq .amount-str {
    width: 7em;
    display: inline-block;
  }
  .ftobkw > .container > .section {
    margin-bottom: 70px;
  }
</style>