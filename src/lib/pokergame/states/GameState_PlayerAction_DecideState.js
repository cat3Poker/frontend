import { AvatarAvalibilityIDs } from "../Constants.js";

// Game state for handling player decisions

export class GameState_PlayerAction_DecideState extends GameStateBase {
  constructor() {
    super(5);
    this._gameplayModel = null;
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    this._gameplayModel = gameplayModel;
    for (let i = 0; i < this._gameplayModel.CurrentTable.opponentList.length; ++i) {
      this._gameplayModel.CurrentTable.opponentList[i].concurrentAllIns = 0;
    }
    this._gameplayModel.CurrentTable.playerObj.concurrentAllIns = 0;
    this.currentTime = 0.5;
    gameplayModel.CurrentTable.houseCardDealer.currentNumberOfRaises = 0;
    gameplayModel.CurrentTable.currentActivePlayerDealerOffset =
      (gameplayModel.CurrentTable.currentActivePlayerDealerOffset +
        gameplayModel.CurrentTable.currentActivePlayer) %
      gameplayModel.CurrentTable.getMaxPlayersAtTable();
    gameplayModel.CurrentTable.currentActivePlayer = 0;
    let activePlayers = 0, i = 0;
    if (2 === gameplayModel.CurrentTable.currentRoundNumber) {
      this._gameplayModel._analytics.trackGameplay(
        gameplayModel.CurrentTable.currentHandNumber.toString()
      );
      for (let dealerIndex = gameplayModel.CurrentTable.currentDealer; dealerIndex - gameplayModel.CurrentTable.currentDealer <
        gameplayModel.CurrentTable.getMaxPlayersAtTable(); dealerIndex++) {
        let playerIndex = dealerIndex % gameplayModel.CurrentTable.getMaxPlayersAtTable();
        i++;
        let currentPlayer = gameplayModel.CurrentTable.getPlayer(playerIndex);
        if (currentPlayer.isPlayerActive() &&
          !(currentPlayer.moneyPool.value <= 0) &&
          3 === ++activePlayers) {
          break;
        }
      }
      gameplayModel.CurrentTable.currentActivePlayerDealerOffset =
        2 === activePlayers ? 0 : i;
    } else {
      gameplayModel.CurrentTable.currentActivePlayerDealerOffset = 1;
    }
    if (2 !== gameplayModel.CurrentTable.currentRoundNumber &&
      ((gameplayModel.CurrentTable.houseCardDealer.lastRaise = 0),
        !gameplayModel.CurrentTable.getActivePlayer().logicController
          .isLocalPlayer() ||
        (gameplayModel.CurrentTable.getActivePlayer().moneyPool.value <= 0 &&
          (gameplayModel.CurrentTable.getActivePlayer().availability ===
            AvatarAvalibilityIDs.ALL_IN ||
            (gameplayModel.CurrentTable.getActivePlayer().availability =
              AvatarAvalibilityIDs.INACTIVE))))) {
      return 6;
    }
  }

  // End the state
  endState(gameplayModel) {
    return 0;
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    let activePlayers = 0, i = 0;
    for (let playerIndex = 0; playerIndex < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++playerIndex) {
      gameplayModel.CurrentTable.getPlayer(playerIndex).isPlayerActiveAndPlaying() &&
        (i += gameplayModel.CurrentTable.getPlayer(playerIndex).currentBet.value),
        gameplayModel.CurrentTable.getPlayer(playerIndex).moneyPool.value <= 0 ||
        ++activePlayers;
    }
    if (activePlayers <= 1) {
      return (
        5 === gameplayModel.CurrentTable.currentRound ? 17 : (i > 0 ? 15 : 16)
      );
    }
    return 6;
  }

  // Handle message
  handleMessage(message, param) { }
}
