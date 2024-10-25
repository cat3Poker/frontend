// Game state for dealing the first cards

export class GameState_DealFirstCards extends GameStateBase {
  constructor() {
    super(3);
    this._validPlayerIndex = -1;
    this._cardIndex = 0;
    this._cardsToDeal = [];
    this._workingCard = null;
    this._gameplayModel = null;
    this.CARD_ANIM_TIME = 1 / 3;
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    this._gameplayModel = gameplayModel;
    this._cardsToDeal = [];
    for (let playerIndex = 1; playerIndex <= gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++playerIndex) {
      let dealerBasedPlayerIndex = playerIndex % gameplayModel.CurrentTable.getMaxPlayersAtTable();
      if (gameplayModel.CurrentTable.getDealerBasedPlayer(
        dealerBasedPlayerIndex
      ).isPlayerActive()) {
        this._cardsToDeal.push(dealerBasedPlayerIndex);
      }
    }
    this.currentTime = 0;
    gameplayModel.CurrentTable.currentRound = 1;
    this._validPlayerIndex = -1;
    this._cardIndex = 0;
    this._workingCard = null;
  }

  // End the state
  endState(gameplayModel) {
    return 0;
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    if (this._workingCard && !this._workingCard.visible) {
      return 0;
    }
    (this._workingCard = null), ++this._validPlayerIndex;
    if (this._validPlayerIndex >= this._cardsToDeal.length) {
      this._validPlayerIndex = 0;
      ++this._cardIndex;
    }
    if (this._cardIndex >= 2) {
      return (
        gameplayModel.CurrentTable.houseCardDealer.adviceVisible = true);

      4;
    }
    let currentPlayer = gameplayModel.CurrentTable.getDealerBasedPlayer(
      this._cardsToDeal[this._validPlayerIndex]
    );
    let nextCard = gameplayModel.CurrentTable.houseCardDealer.currentDeck.getNextCard();
    if (currentPlayer.logicController.isLocalPlayer() &&
      gameplayModel.CurrentTable.playerObj.isAuthorized) {
      gameplayModel.CurrentTable.playerObj.currentPortrait.fading = false;
    }
    (this._workingCard = currentPlayer.currentHand.Card1),
      (1 === this._cardIndex &&
        (this._workingCard = currentPlayer.currentHand.Card2),
        (this._workingCard.cardIndex = nextCard),
        (this._workingCard.visible = true),
        (gameplayModel.CurrentTable.mobileCardObj.moveTo = [
          0,
          -1,
          this._workingCard.TablePositionX,
          this._workingCard.TablePositionY,
          0.85 * this.CARD_ANIM_TIME
        ]),
        (gameplayModel.CurrentTable.mobileCardObj.visible = false),
        (gameplayModel.CurrentTable.mobileCardObj.startLerp = false),
        (gameplayModel.CurrentTable.mobileCardObj.linkedCard =
          this._workingCard),
        (gameplayModel.CurrentTable.mobileCardObj.startLerp = true),
        this._soundManager.play(
          SoundConstants.CARD_DEAL,
          0,
          0.5
        )),
      (3 === this._validPlayerIndex
        ? (gameplayModel.CurrentTable.houseCardDealer.adviceText =
          "staticPokerDealer.hereAreYourCards")
        : 10 === this._validPlayerIndex &&
        (gameplayModel.CurrentTable.houseCardDealer.adviceVisible = true),
        (gameplayModel.CurrentTable.houseCardDealer.adviceVisible = false));
    return 0;
  }

  // Handle message
  handleMessage(message, param) { }
}
