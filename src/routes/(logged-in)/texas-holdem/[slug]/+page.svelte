<script>
    import Gameview from "$lib/games/texas-holdem/gameview.svelte";
    import { pokerGames } from "$lib/store/poker";
    import {app} from "$lib/store/activities.js";
    export let data
    $: isMusic = true
    $: isCopy = false
    $: joiningGame = data?.slug
    $: availableGames = $pokerGames.reverse().slice(0, 5);
    $: isQuit = false
    let link = "https://cat3poker.netlify.app/texas-holdem/kagx13s5cds"

</script>
<div class="sc-lhMiDA ePAxUv" style="opacity: 1; transform: none;">
  <div id="game-crash" class="sc-haTkiu lmWKWf game-style1 sc-cBIieI ikZPEu">  
      <div class="game-area">
          <div class="game-main">
            <div class="game-view">
              <!-- <div class="sc-hoHwyw fIoiVG game-recent sc-bjztik kQtbd">
                <div class="recent-list-wrap">
                  <div class="recent-list" style="width: 133.333%; transform: translate(0%, 0px);">
                    <div class="game-item " style="width: 100%;">
                      <div class="issus">Share: {link}</div>
                      <svg on:click={()=> $app.copyToClipboard(link)} xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                        <use xlink:href="#icon_Copy"></use>
                      </svg>
                    </div>
                  </div>
                </div>
                <button class="sc-iLOkMM kCvsnZ flex-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                  <div>
                    Exit
                  </div>
                </button>
              </div> -->
              <div class="sc-hcupDf dqwCNK game-box sc-eZKLwX gcZuwC">
                <div class="sc-eTwdGJ dgiRGq">
                   <div style="width:1034px; height:534px;">
                      <Gameview />
                   </div>
              
                </div>
                <svg class="box-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 996 46">
                  <defs>
                    <linearGradient id="gcardBg" x1="50%" x2="50%" y1="0%" y2="100%">
                      <stop offset="0%" stop-color="#31343C"></stop>
                      <stop offset="100%" stop-color="#1E2024" stop-opacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <g opacity=".899">
                    <path fill="url(#gcardBg)" fill-rule="evenodd" d="M0 0h996L892 46H96z" opacity=".598" transform="rotate(-180 498 23)"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div class="game-actions">
              <button on:click={()=> isMusic =! isMusic} class="action-item  {isMusic ?"active" : ""}">
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                  <use xlink:href="#{isMusic ? "icon_MusicOn" : "icon_MusicOff"}"></use>
                </svg>
              </button>
              <button on:click={()=> isCopy = true} class="action-item  ">
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                  <use xlink:href="#icon_LiveStats"></use>
                </svg>
              </button>
              <button on:click={()=> isQuit = true} class="action-item  ">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
              </button>
            </div>
          </div>
      </div>
  </div>
</div>

{#if isQuit}
  <div class="sc-bkkeKt kBjSXI" style="opacity: 1;">
    <div class="sc-dlVxhl gvBCkE" style="transform: scale(1); opacity: 1;">
      <button on:click={()=> isQuit = false} class="sc-ieecCq fLASqZ close-icon dialog-close"><svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon"><use xlink:href="#icon_Close"></use></svg></button>
      <div class="pop sc-eBhrFy kAPbrV" id="">
        <div class="pop-title">Do you want quit?</div>
          <button class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal submit-btn">
            <div class="button-inner">Yes</div>
          </button>
        </div>
      </div>
    </div>
{/if}


<style>
  .gvBCkE {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 0px;
      height: 0px;
  }
  .fLASqZ {
      position: absolute;
      right: -200px;
      top: -190px;
  }
  .lmWKWf .action-item.active .icon {
      fill: rgb(67, 179, 9);
  }
  .fLASqZ:hover svg {
      transform: rotate(-90deg);
      fill: rgb(245, 246, 247);
  }
  .gvBCkE .pop {
      border-radius: 1.25rem;
      position: relative;
      overflow: hidden;
      background-color: rgb(23, 24, 27);
      font-size: 0.8125rem;
      padding: 1.25rem;
  }
  .gvBCkE .pop-title {
      color: rgb(255, 255, 255);
      font-size: 1rem;
      line-height: 1rem;
      font-weight: bold;
      text-align: center;
      padding-bottom: 70px;
      padding-top: 70px;
  }
  .gvBCkE .pop {
      transform: translate(-50%, -50%);
      min-width: 420px;
      min-height: 370px;
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 1.25rem;
      position: relative;
      overflow: hidden;
      background-color: rgb(23, 24, 27);
      font-size: 0.8125rem;
      padding: 1.25rem;
  }
  .kAPbrV .submit-btn {
      margin: 1.875rem auto 0.625rem;
      width: 13.75rem;
  }
  .lmWKWf .game-actions {
      display: flex;
      order: 10;
      -webkit-box-align: center;
      align-items: center;
      height: 4rem;
      position: relative;
  }
  .lmWKWf .action-item:hover {
      background: rgba(49, 52, 60, 0.35);
  }
  .lmWKWf .action-item:hover .icon {
      font-size: 1rem;
      fill: rgb(245, 246, 247);
  }
  .lmWKWf .game-actions::before {
      content: "";
      flex: 1 1 0%;
  }
  .lmWKWf .action-item {
      cursor: pointer;
      margin-right: 0.5rem;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
  }
  .lmWKWf .action-item .icon {
      fill: rgb(153, 164, 176);
      transition: 0.3s ease-in-out;
  }
   .lmWKWf.game-style1 {
      max-width: 1468px;
      margin: 0px auto;
      padding: 0 0 20% 0;
  }
  .lmWKWf {
      min-height: 50vh;
  }
   .lmWKWf.game-style1 .game-area {
      display: flex;
      flex-wrap: wrap;
  } .lmWKWf.game-style1 .game-area {
      display: flex;
      flex-wrap: wrap;
  }
  .ikZPEu .game-main.game-main {
      min-height: auto;
  }
   .lmWKWf.game-style1 .game-main  {
      display: flex;
      flex-direction: column;
      flex: 1 1 0%;
      overflow: hidden;
  }
  .ikZPEu .game-main.game-main {
      min-height: auto;
  }
  .lmWKWf .game-main {
      position: relative;
      border-radius: 1.25rem;
      background-color: rgb(23, 24, 27);
  }
   .lmWKWf.game-style1 .game-view {
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
  }
  
  .gcZuwC {
      position: relative;
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      padding: 0px 1.075rem 1.075rem;
  }
  .dgiRGq {
      position: relative;
      margin-top: 1.075rem;
      margin-bottom: 1.25rem;
  }
  .dgiRGq::after {
      content: "";
      display: block;
      padding-top: 0.1%;
  }
  
  </style>