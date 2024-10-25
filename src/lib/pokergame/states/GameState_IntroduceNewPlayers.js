import { AvatarAvalibilityIDs } from "../Constants.js";

// Game state for introducing new players

export class GameState_IntroduceNewPlayers extends GameStateBase {
  constructor() {
    super(21);
    this.currentTime = 0;
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    for (let i = 0; i < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
      let currentPlayer = gameplayModel.CurrentTable.getPlayer(i);
      if (currentPlayer.availability === AvatarAvalibilityIDs.HIDDEN) {
        (currentPlayer.moneyPool.value =
          64 *
          Math.floor(gameplayModel.CurrentTable.playerObj.moneyPool.value / 64) +
          10 * Math.floor(100 * Math.random())),
          gameplayModel.returnAvatarToPool(currentPlayer.currentPoolIndex),
          (currentPlayer.currentPoolIndex = gameplayModel.getNewAvatarIndex()),
          (currentPlayer.currentPortrait.faceImage =
            gameplayModel.avatarDictionary[currentPlayer.currentPoolIndex]
              .image_default),
          (currentPlayer.name.value =
            gameplayModel.avatarDictionary[currentPlayer.currentPoolIndex].name),
          currentPlayer.setLogic(
            gameplayModel.avatarDictionary[currentPlayer.currentPoolIndex]
              .logic,
            gameplayModel
          ),
          (currentPlayer.availability = AvatarAvalibilityIDs.FOLDED),
          i++;
      }
    }
    i > 0 &&
      ((gameplayModel.CurrentTable.houseCardDealer.adviceText =
        gameplayModel._localizationHandler.getText(
          "staticPokerDealer.newPlayers"
        )),
        (gameplayModel.CurrentTable.houseCardDealer.adviceVisible = false)),
      (this.currentTime = i > 0 ? 1.5 : 0);
  }

  // End the state
  endState(gameplayModel) {
    return (
      gameplayModel.CurrentTable.houseCardDealer.adviceVisible = true
    ),
      0;
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    return (
      (this.currentTime -= deltaTime), this.currentTime <= 0 ? 22 : 0
    );
  }

  // Handle message
  handleMessage(message, param) { }
}
