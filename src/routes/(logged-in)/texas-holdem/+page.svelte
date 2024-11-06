<script>
  import Gameview from "$lib/components/texas-holdem/gameview.svelte";
  const banner1 = new URL("$lib/images/banner1.png", import.meta.url).href;
  let startGameClicked = false
</script>

<div class="KkkIOIUWbs">
  <div class="kJEIMSDKL">
    <img class="kiierkkld" src={banner1} alt="" />
    <div class="pinningde">
      <div class="game-page">
        {#if startGameClicked}
          <Gameview on:onExit={() => (startGameClicked = false)}/>
        {:else}
          <div class="Lkooee">Play POKER HOLD’EM with your friends</div>
          <button class="bhsleejj" on:click={() => (startGameClicked = true)}
            >START NEW GAME</button
          >
          <div class="or-section">Or</div>
          <div class="Lkooee">Play with the CAT POKER community clubs</div>
          <button class="bhsleejj find">FIND A GAME/CLUB</button>
        {/if}
      </div>
    </div>
  </div>
</div>

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
    text-align: center;
    border-radius: 10px;
  }
  .pinningde {
    top: 0;
    position: absolute;
    background: linear-gradient(
        0deg,
        rgba(198, 0, 107, 0.17),
        rgba(198, 0, 107, 0.17)
      ),
      linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
    width: 100%;
    height: 100%;
    border-radius: 10px;
    backdrop-filter: blur(2px);
  }
  .Lkooee {
    font-size: 18px;
  }
  .bhsleejj {
    margin: 20px 0;
    background: #1e7929;
    color: #fff;
    padding: 15px 25px;
  }
  .bhsleejj.find {
    background: #6b078b;
  }
</style>
