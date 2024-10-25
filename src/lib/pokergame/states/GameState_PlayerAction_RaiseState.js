// Game state for handling the player action of raising

export class GameState_PlayerAction_RaiseState extends GameStateBase {
  constructor() {
    super(10);
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    for (let i = 0; i < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
      gameplayModel.CurrentTable.getPlayer(i).actionId = -1;
    }
    let activePlayer = gameplayModel.CurrentTable.getActivePlayer();
    activePlayer.callBet();
    activePlayer.currentBet.value >
      gameplayModel.CurrentTable.houseCardDealer.currentBet &&
      ((gameplayModel.CurrentTable.houseCardDealer.currentBet =
        activePlayer.placeBet(previousStatePayload)),
        (gameplayModel.CurrentTable.currentActivePlayerDealerOffset =
          (gameplayModel.CurrentTable.currentActivePlayerDealerOffset +
            gameplayModel.CurrentTable.currentActivePlayer) %
          gameplayModel.CurrentTable.getMaxPlayersAtTable()),
        (gameplayModel.CurrentTable.currentActivePlayer = 0),
        ++gameplayModel.CurrentTable.houseCardDealer.currentNumberOfRaises),
      (this.currentTime =
        gameplayModel.CurrentTable.isUserPlaying() ? 0.5 : 0.25),
      gameplayModel.soundManager.play(
        SoundConstants.CHIME_RAISE,
        0.5,
        SoundConstants.CHIME_VOLUME
      ),
      gameplayModel.soundManager.play(
        SoundConstants.CHIP_MED_BET,
        0,
        SoundConstants.CHIPS_MOVE_VOLUME
      );
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
