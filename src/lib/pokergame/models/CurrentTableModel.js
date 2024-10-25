import { AvatarAvalibilityIDs } from "../Constants.js";
import { MobileChips } from "../MobileChips.js";
import { TableModel } from "./TableModel.js";
import { AvatarModel } from "./AvatarModel.js";
import { HouseDealerModel } from "./HouseDealerModel.js";
import { PlayingCardModel } from "./PlayingCardModel.js";

// Model for the current table
class CurrentTableModel extends TableModel {
  constructor() {
    super();
    (this.houseCardDealer = new HouseDealerModel()),
      (this.currentRound = 0),
      (this.currentRoundNumber = 0),
      (this.currentHandNumber = 0),
      (this.playerStartingMonies = 1500),
      (this.potX = 0),
      (this.potY = 0),
      (this.tableCard_Flop1 = new PlayingCardModel()),
      (this.tableCard_Flop2 = new PlayingCardModel()),
      (this.tableCard_Flop3 = new PlayingCardModel()),
      (this.tableCard_Turn = new PlayingCardModel()),
      (this.tableCard_River = new PlayingCardModel()),
      (this.playerObj = new AvatarModel("PLACEHOLDER", 0)),
      (this.opponentList = new Array()),
      (this.currentDealer = 0),
      (this.currentActivePlayer = 0),
      (this.currentActivePlayerDealerOffset = 0),
      (this.mobileCardObj = new PlayingCardModel()),
      (this.mobileChips = new MobileChips());
  }

  // Get the maximum number of players at the table
  getMaxPlayersAtTable() {
    return 7;
  }

  // Get the dealer-based player index
  getDealerBasedPlayerIndex() {
    return (
      (this.currentActivePlayerDealerOffset + this.currentDealer) %
      this.getMaxPlayersAtTable()
    );
  }

  // Get the active player
  getActivePlayer() {
    return this.getPlayer(
      this.currentActivePlayer + this.currentActivePlayerDealerOffset
    );
  }

  // Get a player at a specific index
  getPlayer(playerIndex) {
    let adjustedPlayerIndex = playerIndex % this.getMaxPlayersAtTable();
    return 0 === adjustedPlayerIndex
      ? this.playerObj
      : --adjustedPlayerIndex >= this.opponentList.length
        ? void 0
        : this.opponentList[adjustedPlayerIndex];
  }

  // Get the dealer-based player
  getDealerBasedPlayer(playerIndex) {
    return this.getPlayer(playerIndex + this.currentDealer);
  }

  // Increment the dealer position
  incrementDealer() {
    let validDealerIndexes = [];
    for (let i = 0; i < this.getMaxPlayersAtTable(); ++i) {
      let dealerIndex = (i + 1) % this.getMaxPlayersAtTable();
      if (this.getDealerBasedPlayer(dealerIndex).availability ===
        AvatarAvalibilityIDs.ACTIVE) {
        validDealerIndexes.push(dealerIndex);
      }
    }
    this.currentDealer =
      (this.currentDealer + validDealerIndexes[0]) %
      this.getMaxPlayersAtTable();
  }

  // Check if the user is playing
  isUserPlaying() {
    return this.playerObj.availability === AvatarAvalibilityIDs.ACTIVE;
  }

  // Free generated elements in the table
  freeGeneratedElements() {
    (this.opponentList = new Array()),
      (this.currentDealer = 0),
      (this.currentActivePlayer = 0),
      (this.currentActivePlayerDealerOffset = 0);
  }
}
