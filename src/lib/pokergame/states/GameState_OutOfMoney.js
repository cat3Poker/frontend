// Game state for when a player runs out of money

export class GameState_OutOfMoney extends GameStateBase {
  constructor() {
    super(19);
    this._gameplayModel = null;
    this.savedStateIsValid = false;
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    this._gameplayModel = gameplayModel;
    let gameModel = gameplayModel;
    let currentPlayerName = gameplayModel._localizationHandler.getText(
      gameModel.CurrentTable.getPlayer(0).name.value
    );
    if ((currentPlayerName ===
      gameplayModel._localizationHandler.getText("PLACEHOLDER") &&
      (gameModel.CurrentTable.houseCardDealer.adviceText =
        gameModel._localizationHandler.getText(
          "staticPoker.endingOutOfMoney2"
        )),
      gameModel.CurrentTable.houseCardDealer.adviceText =
      gameModel._localizationHandler
        .getText("staticPoker.endingOutOfMoney1")
        .replace(/PLAYER_NAME/gi, currentPlayerName),
      (gameModel.CurrentTable.houseCardDealer.adviceVisible = false),
      (gameModel.savedStateIsValid = true),
      this._gameplayModel._analytics.trackGameplay(
        "Out_of_Money",
        gameplayModel.CurrentTable.currentHandNumber.toString(),
        gameplayModel.CurrentTable.playerObj.moneyPool.value.toString(),
        gameplayModel.timePlayed.toString()
      ),
      (this.currentTime = 1.5),
      (GameStateMachine.currentState = 19),
      (this._gameplayModel.savedStateIsValid = false),
      this._gameplayModel.saveToStorage())) {
      return;
    }
  }

  // End the state
  endState(gameplayModel) {
    return 0;
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    let gameModel = gameplayModel;
    return (
      (this.currentTime -= deltaTime),
      this.currentTime <= 0 &&
      ((gameplayModel.isPaused = false),
        (gameplayModel.loadingAnimationData.screenFadeInfo.fadeSpeed = 4)),
      0
    );
  }

  // Handle message
  handleMessage(message, param
  ) { }
}
