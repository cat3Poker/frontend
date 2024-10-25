// Game state for handling the player action of all-in

export class GameState_PlayerAction_AllInState extends GameStateBase {
  constructor() {
    super(11);
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    for (let i = 0; i < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
      gameplayModel.CurrentTable.getPlayer(i).actionId = -1;
    }
    let activePlayer = gameplayModel.CurrentTable.getActivePlayer();
    if ((activePlayer.callBet(),
      activePlayer.currentBet.value >
      gameplayModel.CurrentTable.houseCardDealer.currentBet)) {
      gameplayModel.CurrentTable.houseCardDealer.currentBet =
        activePlayer.placeBet(activePlayer.moneyPool.value);
      gameplayModel.CurrentTable.currentActivePlayerDealerOffset =
        (gameplayModel.CurrentTable.currentActivePlayerDealerOffset +
          gameplayModel.CurrentTable.currentActivePlayer) %
        gameplayModel.CurrentTable.getMaxPlayersAtTable();
      gameplayModel.CurrentTable.currentActivePlayer = 0;
      ++gameplayModel.CurrentTable.houseCardDealer.currentNumberOfRaises;
    }
    (this.currentTime = gameplayModel.CurrentTable.isUserPlaying() ? 0.5 : 0.25),
      (gameplayModel.soundManager.play(
        SoundConstants.CHIME_ALL_IN,
        0.25,
        SoundConstants.CHIME_VOLUME
      ),
        gameplayModel.soundManager.play(
          SoundConstants.CHIP_BIG_BET,
          0,
          SoundConstants.CHIPS_MOVE_VOLUME
        ),
        gameplayModel.soundManager.playSound(
          SoundConstants.AUDIENCE_GASP,
          0.75,
          0.25
        ));
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
