class SoundConstants {
  static BUTTON_CLICK = "button_click";
  static BUTTON_ROLLOVER = "button_rollover";
  static BET_DECREASE_BOOP = "bet_decrease_boop";
  static BET_INCREASE_BOOP = "bet_increase_boop";
  static CARD_DEAL = "card_deal";
  static CARD_FLIP = "card_flip";
  static CHIP_SMALL_BET = "chip_smallBet";
  static CHIP_DEALER_BUTTON_MOVE = "chip_dealerButtonMove";
  static CHIP_BIG_BET = "chip_bigBet";
  static CHIP_MED_BET = "chip_medBet";
  static CHIP_LARGE_BET = "chip_largeBet";
  static AUDIENCE_GASP = "Audience-Gasp";
  static AUDIENCE_CLAP_1 = "Audience-Clap1";
  static AUDIENCE_CLAP_HAPPY = "Audience-ClapHappy";
  static CHIME_ALL_IN = "Chime_All-In";
  static CHIME_CALL = "Chime_Call";
  static CHIME_CHECK = "Chime_Check";
  static CHIME_DONE = "Chime_Done";
  static CHIME_FOLD = "Chime_Fold";
  static CHIME_RAISE = "Chime_Raise";
  static CHIME_START = "Chime_Start";
  static CHIME_YOUR_TURN = "Chime_Your-Turn";
  static GAMEPLAY_MUSIC = "Gameplay_Music";

  // Volume settings
  static BUTTON_CLICK_VOLUME = 0.25;
  static BUTTON_ROLLOVER_VOLUME = 0.1;
  static BET_INCREASE_VOLUME = 0.1;
  static BET_DECREASE_VOLUME = 0.1;
  static CHIP_BET_CLINK_VOLUME = 0.1;
  static DEALER_BUTTON_VOLUME = 0.25;
  static CHIPS_MOVE_VOLUME = 0.1;

  // Cooldown for applause sound
  static _applauseCooldown = 0;

  // Get all sound definitions
  static getSoundDefinitions() {
    return [
      { id: this.BUTTON_CLICK, path: "sounds/poker/ui/button_click.mp3" },
      { id: this.BUTTON_ROLLOVER, path: "sounds/poker/ui/Card_Shuffle.mp3" },
      { id: this.CARD_DEAL, path: "sounds/poker/game/MB_Card_Down_15_edit.mp3" },
      { id: this.CARD_FLIP, path: "sounds/poker/game/MB_Card_Flick_07_edit.mp3" },
      { id: this.CHIP_SMALL_BET, path: "sounds/poker/game/Poker-BetDown.mp3" },
      { id: this.CHIP_DEALER_BUTTON_MOVE, path: "sounds/poker/game/DealerButton-Move.mp3" },
      { id: this.CHIP_BIG_BET, path: "sounds/poker/game/Chips_BigBet.mp3" },
      { id: this.CHIP_MED_BET, path: "sounds/poker/game/Chips_MediumBet.mp3" },
      { id: this.CHIP_LARGE_BET, path: "sounds/poker/game/Chips_BigBet.mp3" },
      { id: this.AUDIENCE_GASP, path: "sounds/poker/game/AudienceGasps.mp3" },
      { id: this.AUDIENCE_CLAP_1, path: "sounds/poker/game/AudienceStartHandClaps.mp3" },
      { id: this.AUDIENCE_CLAP_HAPPY, path: "sounds/poker/game/AudienceEndPlayerWinsClaps.mp3" },
      { id: this.CHIME_ALL_IN, path: "sounds/poker/game/PokerAllIn.mp3" },
      { id: this.CHIME_CALL, path: "sounds/poker/game/PokerCall.mp3" },
      { id: this.CHIME_CHECK, path: "sounds/poker/game/PokerCheck.mp3" },
      { id: this.CHIME_DONE, path: "sounds/poker/game/PokerDone.mp3" },
      { id: this.CHIME_FOLD, path: "sounds/poker/game/PokerFold.mp3" },
      { id: this.CHIME_RAISE, path: "sounds/poker/game/PokerRaise.mp3" },
      { id: this.CHIME_START, path: "sounds/poker/game/PokerStart.mp3" },
      { id: this.CHIME_YOUR_TURN, path: "sounds/poker/game/PokerYourTurn.mp3" },
      { id: this.GAMEPLAY_MUSIC, path: "sounds/poker/game/bg_music.mp3" }
    ];
  }

  // Update applause sound cooldown
  static updateCooldowns(deltaTime) {
    this._applauseCooldown -= deltaTime;
    if (this._applauseCooldown <= 0) {
      this._applauseCooldown = 0;
    }
  }

  // Play applause sound with cooldown
  static playApplause(soundManager, soundId, volume) {
    if (soundManager && this._applauseCooldown <= 0) {
      soundManager.play(soundId, 0, volume);
      this._applauseCooldown = 3;
    }
  }
}