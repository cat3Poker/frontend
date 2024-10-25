// Game state for handling the player action of sitting in

export class GameState_PlayerAction_SitInState extends GameStateBase {
  constructor() {
    super(13);
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    this.currentTime = gameplayModel.CurrentTable.isUserPlaying() ? 0.5 : 0.25;
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
