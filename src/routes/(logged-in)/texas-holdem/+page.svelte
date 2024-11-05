<script>
    import { goto } from "$app/navigation";


</script>

<div class="KkkIOIUWbs">
  <div class="kJEIMSDKL">
    <img class="kiierkkld" src="/assets/banner1.png" alt="" />
    <div class="pinningde">
      <div class="game-page">
          <div class="Lkooee">Play POKER HOLD’EM with your friends</div>
          <button class="bhsleejj" on:click={() => goto("/texas-holdem/123456789")}
            >START NEW GAME</button >
          <div class="or-section">Or</div>
          <div class="Lkooee">Play with the CAT POKER community clubs</div>
          <button class="bhsleejj find">FIND A GAME/CLUB</button>
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
