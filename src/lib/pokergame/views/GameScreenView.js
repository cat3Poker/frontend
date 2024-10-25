import AnimateViewBase from "./AnimateViewBase.js";
import { GameScreenLayoutView } from "./GameScreenLayoutView.js";

// Game screen view

export class GameScreenView extends AnimateViewBase {
  constructor(options, gameplayLogic, arenaAPI) {
    super("GameScreenView");
    this.options = options;
    this._gameplayLogic = gameplayLogic;
    this._arenaAPI = arenaAPI;
    this._isNewGame = true;
    this._isNewGame = this.options.isNewGame;
  }

  // Get the view configuration
  getConfiguration() {
    return {
      childViews: {
        GameScreenLayout: {
          movieClipName: "GameScreenLayoutInstance",
          view: GameScreenLayoutView,
          model: this.$model,
          options: { isNewGame: this._isNewGame }
        }
      },
      sounds: [
        {
          id: SoundConstants.CARD_FLIP,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CARD_DEAL,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIP_SMALL_BET,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.BET_INCREASE_BOOP,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.BET_DECREASE_BOOP,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIP_MED_BET,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIP_BIG_BET,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIP_DEALER_BUTTON_MOVE,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.AUDIENCE_CLAP_1,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.AUDIENCE_GASP,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.AUDIENCE_CLAP_HAPPY,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIME_ALL_IN,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIME_CALL,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIME_CHECK,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIME_DONE,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIME_FOLD,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIME_RAISE,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIME_START,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.CHIME_YOUR_TURN,
          type: SoundType.SFX
        },
        {
          id: SoundConstants.GAMEPLAY_MUSIC,
          type: SoundType.Music
        }
      ]
    };
  }

  // Update game logic and time played
  onUpdate(deltaTime) {
    if (!this.options.mainMenuModel.isPaused &&
      !this.$model.isPaused &&
      !this.$model.pausedByArena) {
      this.gameLogic.update(deltaTime);
      this.$model.timePlayed += deltaTime;
    }
  }

  // Initialize the view
  onInitialize() {
    this.gameLogic.startGame(this.options.isNewGame);
  }

  // Destroy the view
  onDestroy() { }

  // Start the view
  onStart() { }
}
