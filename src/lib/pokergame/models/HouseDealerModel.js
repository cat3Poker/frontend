import { AvatarAvalibilityIDs } from "../Constants.js";
import { SidePotModel } from "./SidePotModel.js";

// Dealer model

export class HouseDealerModel {
  constructor() {
    this.adviceVisible = true;
    this.adviceText = "";
    this.currentAdviceLine1 = new DealerAdviceModel(),
      (this.currentAdviceLine2 = new DealerAdviceModel()),
      (this.winningHandName = new TextWidgetValueModel()),
      (this.currentDeck = new DeckModel(1)),
      (this.currentPot = new Queue()),
      (this.displayPot = new SidePotModel()),
      (this.baseBetAmount = 0),
      (this.currentBet = 0),
      (this.currentHighBetPlayerIndex = 0),
      (this.currentNumberOfRaises = 0),
      (this.lastRaise = 0);
  }

  // Update the pot based on player bets
  updatePot(tableModel) {
    let uniqueBets = [];
    let totalContributionFromFolds = 0;
    let previousHighBetterIndex = -1;
    let betValues = [];
    let i = 0;
    for (let playerIndex = 0; playerIndex < tableModel.getMaxPlayersAtTable(); ++playerIndex) {
      let currentPlayer = tableModel.getPlayer(playerIndex);
      currentPlayer.availability === AvatarAvalibilityIDs.ACTIVE
        ? (currentPlayer.currentBet &&
          currentPlayer.currentBet.value > 0 &&
          !uniqueBets.includes(currentPlayer.currentBet.value) &&
          uniqueBets.push(currentPlayer.currentBet.value),
          betValues.push(currentPlayer.currentBet.value))
        : currentPlayer.currentBet &&
        (totalContributionFromFolds += currentPlayer.currentBet.value);
    }
    this.currentPot.peek().value += totalContributionFromFolds;
    if (0 === uniqueBets.length) {
      return i;
    }
    uniqueBets.sort(function (a, b) {
      return a - b;
    });
    let currentPotMinimum = 0;
    for (let uniqueBetIndex = 0; uniqueBetIndex < uniqueBets.length - 1; uniqueBetIndex++) {
      let playerIndexesContributing = [];
      (previousHighBetterIndex = -1);
      for (let playerIndex = 0; playerIndex < tableModel.getMaxPlayersAtTable(); ++playerIndex) {
        let currentPlayer = tableModel.getPlayer(playerIndex);
        currentPlayer.availability !== AvatarAvalibilityIDs.ACTIVE &&
          currentPlayer.availability !== AvatarAvalibilityIDs.ALL_IN ||
          (currentPlayer.currentBet &&
            currentPlayer.currentBet.value >= uniqueBets[uniqueBetIndex] &&
            playerIndexesContributing.push(playerIndex),
            previousHighBetterIndex === -1 &&
            currentPlayer.currentBet &&
            currentPlayer.currentBet.value >=
            uniqueBets[uniqueBetIndex] &&
            (previousHighBetterIndex = playerIndex),
            (currentPlayer.currentBet &&
              currentPlayer.currentBet.value === uniqueBets[uniqueBetIndex] &&
              (currentPlayer.availability =
                AvatarAvalibilityIDs.ALL_IN)));
      }
      let thisPotValue = (uniqueBets[uniqueBetIndex] - currentPotMinimum) *
        playerIndexesContributing.length;
      isNaN(thisPotValue) || (this.currentPot.peek().value += thisPotValue),
        (currentPotMinimum = uniqueBets[uniqueBetIndex]),
        (this.currentPot.peek().sidePotPlayers = playerIndexesContributing),
        (this.currentPot.peek().sidePotOwner = previousHighBetterIndex),
        this.currentPot.enqueue(new SidePotModel());
    }
    let playerIndexesContributing = [];
    for (let playerIndex = 0; playerIndex < tableModel.getMaxPlayersAtTable(); ++playerIndex) {
      let currentPlayer = tableModel.getPlayer(playerIndex);
      currentPlayer.availability === AvatarAvalibilityIDs.ACTIVE &&
        currentPlayer.currentBet &&
        currentPlayer.currentBet.value ===
        uniqueBets[uniqueBets.length - 1] &&
        playerIndexesContributing.push(playerIndex);
    }
    let lastPotValue = (uniqueBets[uniqueBets.length - 1] - currentPotMinimum) *
      playerIndexesContributing.length;
    return (
      isNaN(lastPotValue) ||
      (this.currentPot.peek().value += lastPotValue),
      (this.currentPot.peek().sidePotPlayers = playerIndexesContributing),
      (i += this.currentPot.peek().value)
    );
  }

  // Reset the dealer
  reset() {
    (this.currentAdviceLine1.value = ""),
      (this.currentAdviceLine2.value = ""),
      (this.winningHandName.value = "");
  }
}
