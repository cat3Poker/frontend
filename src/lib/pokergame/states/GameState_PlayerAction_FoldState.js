import { AvatarAvalibilityIDs } from "../Constants.js";

// Game state for handling the player action of folding

export class GameState_PlayerAction_FoldState extends GameStateBase {
  constructor() {
    super(9);
    this.CARD_ANIM_TIME = 0.125;
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    gameplayModel.CurrentTable.getActivePlayer().availability =
      AvatarAvalibilityIDs.FOLDED;
    this.currentTime = this.CARD_ANIM_TIME;
    gameplayModel.soundManager.play(
      SoundConstants.CHIME_FOLD,
      0,
      SoundConstants.CHIME_VOLUME
    );
  }

  // End the state
  endState(gameplayModel) {
    let player = gameplayModel.CurrentTable.getActivePlayer();
    return (
      player.currentHand.Card1.resetToNULL(), player.currentHand.Card2.resetToNULL(), 0
    );
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    let activePlayer = gameplayModel.CurrentTable.getActivePlayer(), progress = this.currentTime / this.CARD_ANIM_TIME;
    return (
      progress > 1 && (progress = 1),
      (activePlayer.currentHand.Card1.alpha = progress),
      (activePlayer.currentHand.Card2.alpha = progress),
      (this.currentTime -= deltaTime),
      this.currentTime <= 0 ? 14 : 0
    );
  }

  // Handle message
  handleMessage(message, param) { }
}
