<script>
  import Gameview from "$lib/components/texas-holdem/gameview.svelte";
  let startGameClicked = false;
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { socketData } from "$lib/store/socket";
    import { pokerGames } from "$lib/store/poker";
  let JoinGames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, , 6, 5];

  $: availableGames = $pokerGames.reverse().slice(0, 5);
  let joiningGame = ''


  const joinGame = (id) => {
    joiningGame= id;
    startGameClicked = true;
  }
</script>

{#if startGameClicked}
  <div class="KkkIOIUWbs">
    <div class="kJEIMSDKL">
      <div class="pinningde">
        <div class="game-page">
          <Gameview gameId={joiningGame} on:onExit={() => {
            joiningGame = '';
            startGameClicked = false
          }} />
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="texas-page">
    <div class="sc-bOtlzW ftobkw welcome">
      <div class="container">
        <div class="section">
          <button
            class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal button"
          >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class="button-inner"
              on:click={() => (startGameClicked = true)}
            >
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
                        <div class="tr fc" on:click={() => joinGame(gam.gameId)}>
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
{/if}

<style>
  .KkkIOIUWbs {
    position: relative;
    height: 100vh;
    width: 100%;
  }
  .kJEIMSDKL {
    position: relative;
    margin: 15px 80px;
  }
  .kiierkkld {
    width: 100%;
    border-radius: 10px;
    height: 800px;
  }
  .game-page {
    color: #fff;
    /*position: absolute;
    top: 20%;
    left: 25%;*/
    height: 100%;
  }
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