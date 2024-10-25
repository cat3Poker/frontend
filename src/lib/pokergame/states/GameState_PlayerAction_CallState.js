// Game state for handling the player action of calling

export class GameState_PlayerAction_CallState extends GameStateBase {
  constructor() {
    super(8);
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    gameplayModel.CurrentTable.getActivePlayer().callBet();
    (this.currentTime = gameplayModel.CurrentTable.isUserPlaying() ? 0.5 : 0.25),
      gameplayModel.soundManager.play(
        SoundConstants.CHIME_CALL,
        0.5,
        SoundConstants.CHIME_VOLUME
      ),
      gameplayModel.soundManager.play(
        SoundConstants.CHIP_MED_BET,
        0,
        SoundConstants.CHIPS_MOVE_VOLUME
      );
  }

  // End the state
  endState(gameplayModel) {
    return 0;
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    return (
      (this.currentTime -= deltaTime), this.currentTime <= 0 ? 14 : 0
    );
  }

  // Handle message
  handleMessage(message, param) { }
}
