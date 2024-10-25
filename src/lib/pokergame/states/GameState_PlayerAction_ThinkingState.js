// Game state for handling the player action of thinking

export class GameState_PlayerAction_ThinkingState extends GameStateBase {
  constructor() {
    super(6);
    this._gameplayModel = null;
    this.MAX_THINK_TIME = 15;
    this.currentTime = this.MAX_THINK_TIME;
    this.uiMessage = "";
    this.uiParam = "";
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    (this._gameplayModel = gameplayModel),
      (this._gameplayModel.GameButtons.Button_Continue.visible &&
        (this._gameplayModel.GameButtons.hideAll(),
          (this._gameplayModel.GameButtons.Button_Continue.visible = false)));
    let gameModel = gameplayModel;
    gameModel.CurrentTable
      .getActivePlayer()
      .logicController.onGameStart(gameModel, gameModel.CurrentTable.getActivePlayer());
    gameModel.CurrentTable.getActivePlayer().isHighlit = true;
    this.MAX_THINK_TIME = 15 / gameModel.currentGameSpeed;
    this.currentTime = this.MAX_THINK_TIME;
    (this.uiMessage = ""), (this.uiParam = ""), (GameStateMachine.currentState = 6);
    this.gameplayModel.savedStateIsValid = false;
    this.gameplayModel.saveToStorage();
  }

  // End the state
  endState(gameplayModel) {
    let gameModel = gameplayModel;
    return (
      gameModel.CurrentTable
        .getActivePlayer()
        .logicController.onTurnEnd(gameModel, gameModel.CurrentTable.getActivePlayer()),
      (gameplayModel.CurrentTable.houseCardDealer.adviceVisible = true),
      this._lastDecision
    );
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    let gameModel = gameplayModel;
    gameModel.CurrentTable
      .getActivePlayer()
      .logicController.update(
        this.uiMessage,
        this.uiParam
      );
    this.uiMessage = "";
    this.uiParam = "";
    (this.currentTime -= deltaTime),
      (this.currentTime <= 0 && (this.currentTime = 0));
    let currentPlayer = gameplayModel.CurrentTable.getActivePlayer(), currentDecision = currentPlayer.logicController.playerThinking(
      this.currentTime / this.MAX_THINK_TIME,
      deltaTime,
      gameModel,
      currentPlayer
    );
    switch (((this.currentTime <= 0 && (this.currentTime = 0)),
      (gameplayModel.CurrentTable.getActivePlayer().actionId =
        currentDecision),
      currentDecision)) {
      case 0:
        return 7;
      case 1:
        return 8;
      case 2:
        return 9;
      case 3:
        return (
          (this._lastDecision =
            gameplayModel.CurrentTable.getActivePlayer().logicController.getBetAmount()),
          10
        );
      case 4:
        return 11;
      case 5:
        return 12;
      case 6:
        return 13;
    }
    return 0;
  }

  // Handle messages from UI elements
  handleMessage(message, param) {
    (this.uiMessage = message), (this.uiParam = param);
  }
}
