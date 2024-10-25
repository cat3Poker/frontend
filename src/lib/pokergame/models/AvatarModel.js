import { AvatarAvalibilityIDs } from "../Constants.js";
import { PlayerCards } from "../PlayerCards.js";
import { ActionInfoModel } from "./ActionInfoModel.js";
import { MoneyPoolModel } from "./MoneyPoolModel.js";

// Avatar model



export class AvatarModel {
  constructor(name, playerIndex) {
    this.isShowingDefault = true;
    this.refreshVisuals = true;
    this.resetCardOrder = true;
    this.concurrentAllIns = -1;
    this.availability = AvatarAvalibilityIDs.INACTIVE;
    this.dealerButtonPosition = new DummyObjectModel();
    this.chipPoolPosition = new DummyObjectModel();
    this.betPosition = new DummyObjectModel();
    this.name = new TextWidgetValueModel();
    this.isAuthorized = true;
    this.currentPoolIndex = 0;
    this.currentPortrait = new AvatarPortraitModel();
    this.currentHand = new PlayerCards();
    this.moneyPool = new MoneyPoolModel(10000);
    this.currentBet = new MoneyPoolModel(0);
    this.biggestWin = 0;
    this.finalScore = 0;
    this.isDealer = true;
    this.actionTaken = new ActionInfoModel("");
    this.actionId = -1;
    this.isHighlit = true;
    this.concurrentAllIns = 0;
    this.logicController = null;
    (this.name.value = name), (this.index = playerIndex);
  }

  // Set the avatar's name
  setName(name) {
    let truncatedName = name.length > 15
      ? name.substring(0, 15) + "..."
      : name;
    this.name.value = truncatedName;
  }

  // Get the avatar's name
  getName() {
    return this.name.value;
  }

  // Set the avatar image
  setAvatar(avatarImage) {
    this.currentPortrait.faceImage =
      "" !== avatarImage && avatarImage
        ? AvatarModel.linkToAvatarStorage + avatarImage
        : "images/poker/Avatar_Guest.png";
  }

  // Get the total amount of money the player has
  getTotalMoneys() {
    return this.moneyPool.value + this.currentBet.value;
  }

  // Check if the player has enough money to place a bet
  hasEnoughMoney(betAmount) {
    return this.getTotalMoneys() >= betAmount;
  }

  // Predict the bet value based on the desired bet amount
  predictBetValue(betAmount) {
    let remainingMoney = this.getTotalMoneys() - betAmount;
    if (remainingMoney < 0) {
      betAmount += remainingMoney;
    }
    return betAmount;
  }

  // Update the player's bet
  updateBet(betAmount) {
    return (
      (this.moneyPool.value = this.getTotalMoneys()),
      (this.currentBet.value = 0),
      (this.currentBet.value = this.predictBetValue(betAmount)),
      (this.moneyPool.value -= this.currentBet.value),
      this.currentBet.value
    );
  }

  // Place a blind bet
  placeBlind(betAmount) {
    this.updateBet(betAmount);
  }

  // Call the current bet
  callBet() {
    let currentTotalBet = this.getTotalMoneys();
    this.updateBet(currentTotalBet);
  }

  // Place a bet
  placeBet(betAmount) {
    return this.updateBet(betAmount);
  }

  // Setup the player with a logic controller and initial money
  setupPlayer(gameplayModel, logicController, moneyPool) {
    (this.moneyPool.value =
      moneyPool <= 0 ? 1000 + 10 * Math.floor(100 * Math.random()) : moneyPool),
      (this.availability = this.isShowingDefault
        ? AvatarAvalibilityIDs.ACTIVE
        : AvatarAvalibilityIDs.REMOVED),
      (this.logicController = logicController),
      this.prepareForNewRound(gameplayModel);
  }

  // Reset the player for a new round
  resetPlayer(gameplayModel) {
    (this.currentHand.Card1.resetToNULL(),
      (this.currentHand.Card1.alpha = 1),
      this.currentHand.Card2.resetToNULL(),
      (this.currentHand.Card2.alpha = 1),
      (this.currentBet.value = 0),
      this.logicController &&
      this.logicController.prepareForNewRound(gameplayModel, this));
  }

  // Set the player's logic controller
  setLogic(logicClassName, gameplayModel) {
    if ("HumanPlayer" !== logicClassName.toString()) {
      let logicClass = null;
      for (let i = 0; i < gameplayModel.aiClassDefs.length; ++i) {
        gameplayModel.aiClassDefs[i].name === logicClassName &&
          (logicClass = gameplayModel.aiClassDefs[i]);
      }
      if (logicClass) {
        if ("AiPokerPlayer_Dumb" === logicClass.logic.toString()) {
          this.logicController = new AiPokerPlayer_Dumb();
        } else {
          this.logicController = new HumanPlayer();
        }
        this.logicController.setProperties(logicClass);
      }
    } else {
      this.logicController = new HumanPlayer();
    }
  }

  // Check if the player is active
  isPlayerActive() {
    return (
      this.availability === AvatarAvalibilityIDs.ACTIVE ||
      this.availability === AvatarAvalibilityIDs.ALL_IN
    );
  }

  // Check if the player is active and still playing
  isPlayerActiveAndPlaying() {
    return this.availability === AvatarAvalibilityIDs.ACTIVE;
  }

  // Get the player's availability status
  getAvailability() {
    return this.availability;
  }

  // Static property for storing the link to the avatar storage
  static linkToAvatarStorage = "https://arenacloud.cdn.arkadiumhosted.com/arenaxstorage-blob/arenax-index/_arena-shared-content_/arkadium-avatars/1x/";
}
