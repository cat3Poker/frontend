// Game state for the beginning of a round

export class GameState_BeginRound extends GameStateBase {
  constructor() {
    super(4);
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    let table = gameplayModel.CurrentTable;
    for (let i = 0; i < table.getMaxPlayersAtTable(); ++i) {
      table.getPlayer(i).actionId = -1;
    }
    table.houseCardDealer.updatePot(table);
    for (let i = 0; i < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
      gameplayModel.CurrentTable.getPlayer(i).actionId = -1;
    }
  }

  // End the state
  endState(gameplayModel) {
    return 0;
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    for (let i = 0; i < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
      gameplayModel.CurrentTable.getPlayer(i).currentBet.value = 0;
    }
    return 5;
  }

  // Handle message
  handleMessage(message, param) { }
}
