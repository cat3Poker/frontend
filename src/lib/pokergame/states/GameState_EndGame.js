// Class representing the end of game state

export class GameState_EndGame extends GameStateBase {
  constructor() {
    super(20);
    this.currentTime = 0;
    this._gameplayModel = null;
    this.savedStateIsValid = false;
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    (this._gameplayModel = gameplayModel),
      (this.currentTime = 1.5),
      (GameStateMachine.currentState = 20),
      (this._gameplayModel.savedStateIsValid = false),
      this._gameplayModel.saveToStorage();
  }

  // End the state
  endState(gameplayModel) {
    return 0;
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    return (
      (this.currentTime -= deltaTime),
      this.currentTime <= 0 &&
      ((gameplayModel.isPaused = false),
        (gameplayModel.loadingAnimationData.screenFadeInfo.fadeSpeed = 4)),
      0
    );
  }

  // Handle message from other states
  handleMessage(message, param) { }
}
