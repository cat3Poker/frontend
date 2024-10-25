// Game state for handling the end of a hand

export class GameState_EndOfHand extends GameStateBase {
  constructor() {
    super(18);
    this._cardResults = {};
    this._winningPlayerList = [];
    this.shouldShowHands = true;
    this._cardCycleList = [];
    this._cycleIndex = 0;
    this._gameplayModel = null;
    this.savedStateIsValid = false;
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    this._gameplayModel = gameplayModel;
    this.uiMessage = "";
    this.uiParam = "";
    if (previousStatePayload == null || 0 === previousStatePayload.length) {
      this.shouldShowHands = true;
    } else {
      (this.cardResults = previousStatePayload[0]),
        (this.winningPlayerList = previousStatePayload[1]),
        (this.shouldShowHands = previousStatePayload[2]);
    }
    let gameModel = gameplayModel;
    this._cardCycleList = [];
    if (this.shouldShowHands) {
      for (let i = 0; i < this.winningPlayerList.length; i += 2) {
        this._cardCycleList.push([
          this.winningPlayerList[i],
          this.cardResults[this.winningPlayerList[i]][1],
          this._cardResults[this.winningPlayerList[i]][2],
          this._cardResults[this.winningPlayerList[i]][3],
          this._cardResults[this.winningPlayerList[i]][4],
          this.cardResults[this.winningPlayerList[i]][5]
        ]);
      }
    }
    gameModel.CurrentTable.playerObj.name.isVisible = true;
    this._gameplayModel.GameButtons.hideAll();
    this._gameplayModel.GameButtons.Button_Continue.visible = false;
    this.currentShownPlayer = 0;
    this.currentTime = 0;
  }

  // End the state
  endState(gameplayModel) {
    let gameModel = gameplayModel;
    return (
      (gameModel.CurrentTable.houseCardDealer.adviceVisible = true),
      gameModel.setTableCardsBrightness(1, 4),
      this.resetCardHighlights(null),
      gameplayModel.GameButtons.hideAll(),
      (gameplayModel.CurrentTable.playerObj.name.isVisible = false),
      (gameplayModel.CurrentTable.houseCardDealer.winningHandName.value = ""),
      0
    );
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    let gameModel = gameplayModel;
    if ("ButtonClick" === this.uiMessage && "CONTINUE" === this.uiParam) {
      (gameplayModel.isGameActive = true),
        (gameplayModel.isPaused = false),
        (gameplayModel.loadingAnimationData.screenFadeInfo.fadeSpeed = 4);
      return 19;
    }
    if (!this.shouldShowHands) {
      return 0;
    }
    (this.currentTime -= deltaTime),
      this.currentTime <= 0 &&
      (this.resetCardHighlights(
        gameplayModel.CurrentTable.getPlayer(
          this._cardCycleList[this.currentShownPlayer][0]
        )
      ),
        gameplayModel.setTableCardsBrightness(0.5, 10),
        this.resetCardHighlights(null),
        ++this.currentShownPlayer,
        (this._cycleIndex >= this._cardCycleList.length &&
          (this._cycleIndex = 0),
          this._cardCycleList.length > 0 &&
          this._cardCycleList[this._cycleIndex] &&
          ((gameplayModel.CurrentTable.getPlayer(
            this._cardCycleList[this._cycleIndex][0]
          ).isHighlit = true),
            this._cycleIndex++),
          (this.currentTime = 1.5)));
    return 0;
  }

  // Handle message
  handleMessage(message, param) {
    this.uiMessage = message;
    this.uiParam = param;
  }
}
