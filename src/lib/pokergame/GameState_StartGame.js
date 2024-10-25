import { AvatarAvalibilityIDs } from "./views/DummyObjView.js";

// Game state for handling game start

export class GameState_StartGame extends GameStateBase {
  constructor() {
    super(1);
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    for (let i = 0; i < gameplayModel.CurrentTable.opponentList.length; ++i) {
      gameplayModel.CurrentTable.opponentList[i].availability =
        AvatarAvalibilityIDs.REMOVED;
    }
    gameplayModel.CurrentTable.playerObj.availability =
      AvatarAvalibilityIDs.HIDDEN;
    gameplayModel.CurrentTable.playerObj.currentPortrait.isFading = true;
    gameplayModel.CurrentTable.houseCardDealer.reset();
    gameplayModel.CurrentTable.houseCardDealer.winningHandName.value = "";
    gameplayModel.CurrentTable.mobileCardObj.visible = true;
    gameplayModel.CurrentTable.houseCardDealer.adviceVisible = true;
    gameplayModel.CurrentTable.currentDealer = 0;
    gameplayModel.CurrentTable.playerObj.isDealer = false;
    this.currentTime = 0.5;
  }

  // End the state
  endState(gameplayModel) {
    gameplayModel.CurrentTable.houseCardDealer.adviceVisible = true;
    return 0;
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    this.currentTime -= deltaTime;
    if (this.currentTime > 0) {
      return 0;
    }
    gameplayModel.currentRoundNumber = 0;
    gameplayModel.numberOfWins = 0;
    gameplayModel.timePlayed = 0;
    gameplayModel.CurrentTable.houseCardDealer.winningHandName.value = "";
    gameplayModel.CurrentTable.mobileCardObj.visible = true;
    for (let i = 0; i < gameplayModel.CurrentTable.opponentList.length; ++i) {
      gameplayModel.CurrentTable.opponentList[i].resetPlayer(gameplayModel);
    }
    if ((gameplayModel.CurrentTable.playerObj.resetPlayer(gameplayModel),
      (gameplayModel.CurrentTable.playerObj.currentPortrait.visible =
        gameplayModel.CurrentTable.playerObj.isAuthorized &&
        ([0, 1].indexOf(gameplayModel.CurrentTable.currentRound) >= 0 ||
          gameplayModel.CurrentTable.playerObj.availability ===
          AvatarAvalibilityIDs.FOLDED)),
      (gameplayModel.CurrentTable.playerObj.currentPortrait.fading =
        !gameplayModel.CurrentTable.playerObj.currentPortrait.visible),
      (gameplayModel.CurrentTable.playerObj.currentHand.Card1
        .isCardFaceDown = false),
      (gameplayModel.CurrentTable.playerObj.currentHand.Card2
        .isCardFaceDown = false),
      gameplayModel.initialize(true))) {
      for (let i = 0; i < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
        let currentPlayer = gameplayModel.CurrentTable.getPlayer(i);
        currentPlayer.refreshVisuals = false;
        if (!currentPlayer.isPlayerActive()) {
          currentPlayer.currentHand.Card1.resetToNULL();
        }
        if (!currentPlayer.isPlayerActive()) {
          currentPlayer.currentHand.Card2.resetToNULL();
        }
      }
      switch (gameplayModel.CurrentTable.currentRound) {
        case 5:
          gameplayModel.CurrentTable.tableCard_River.showCard();
        case 4:
          gameplayModel.CurrentTable.tableCard_Turn.showCard();
        case 3:
          gameplayModel.CurrentTable.tableCard_Flop1.showCard();
          gameplayModel.CurrentTable.tableCard_Flop2.showCard();
          gameplayModel.CurrentTable.tableCard_Flop3.showCard();
      }
      if (gameplayModel.CurrentTable.houseCardDealer.displayPot.stableValue > 0) {
        let tempPotValue = gameplayModel.CurrentTable.houseCardDealer.displayPot.stableValue;
        gameplayModel.CurrentTable.houseCardDealer.displayPot.stableValue = 0;
        gameplayModel.CurrentTable.houseCardDealer.displayPot.stableValue =
          tempPotValue;
      }
    }
    return gameplayModel.CurrentTable.houseCardDealer.currentPot.clear(),
      (gameplayModel.CurrentTable.houseCardDealer.displayPot.value = 0),
      (gameplayModel.CurrentTable.currentActivePlayer = 0),
      (gameplayModel.CurrentTable.currentHandNumber = 0),
      (gameplayModel.timePlayed = 0),
      2;
  }

  // Handle message
  handleMessage(message, param) { }
}
