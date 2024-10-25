// Base class for a poker table

export class TableModel {
  constructor() {
    this.playerObj = null;
    this.opponentList = null;
    this.currentDealer = 0;
    this.currentActivePlayer = 0;
    this.currentActivePlayerDealerOffset = 0;
  }

  // Reset the table model to its initial state
  reset() {
    (this.currentDealer = 0),
      (this.currentActivePlayer = 0),
      (this.currentActivePlayerDealerOffset = 0);
  }
}
