// Class for representing a side pot

export class SidePotModel {
  constructor() {
    this.value = 0;
    this.prevStableValue = 0;
    this.stableValue = 0;
    this.sidePotOwner = -1;
    this.sidePotPlayers = [];
  }
}
