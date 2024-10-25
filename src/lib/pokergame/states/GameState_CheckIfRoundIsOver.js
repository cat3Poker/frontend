import { AvatarAvalibilityIDs, GameplayModeTypeIDs } from "../Constants.js";

// Game state for handling the end of a round

export class GameState_CheckIfRoundIsOver extends GameStateBase {
  constructor() {
    super(14);
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    for (let playerIndex = 0; playerIndex < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++playerIndex) {
      let currentPlayer = gameplayModel.CurrentTable.getPlayer(playerIndex);
      if (0 !== playerIndex &&
        currentPlayer.moneyPool.value <= 0 &&
        currentPlayer.availability !== AvatarAvalibilityIDs.HIDDEN) {
        (currentPlayer.resetPlayer(gameplayModel),
          (currentPlayer.availability = AvatarAvalibilityIDs.HIDDEN),
          i++);
      }
    }
    i > 0 &&
      ((gameplayModel.CurrentTable.houseCardDealer.adviceText =
        "staticPokerDealer.leftGame"),
        (gameplayModel.CurrentTable.houseCardDealer.adviceVisible = false)),
      (this.currentTime = i > 0 ? 1.5 : 0);
  }

  // End the state
  endState(gameplayModel) {
    return (
      (gameplayModel.CurrentTable.houseCardDealer.adviceVisible = true), 0
    );
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    return (
      (this.currentTime -= deltaTime),
      this.currentTime <= 0
        ? gameplayModel.gameplayType === GameplayModeTypeIDs.SIT_AND_GO
          ? 21
          : 22
        : 0
    );
  }

  // Handle message
  handleMessage(message, param) { }
}
