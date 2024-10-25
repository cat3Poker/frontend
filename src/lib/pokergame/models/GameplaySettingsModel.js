import { ActionInfoModel } from "./ActionInfoModel.js";
import { AvatarModel } from "./AvatarModel.js";
import { SidePotModel } from "./SidePotModel.js";

// Gameplay settings model
class GameplaySettingsModel {
  constructor() {
    this.playerStartingMonies = 1500;
    this.blind_baseVal = 0;
    this.blind_increment = 0;
    this.blindIncrementTournamentStyle = true;
    this.smState = -1;
    this.roundsForSitGo = 10;
    this.handsPrInterstitial = 7;
    this.useSequentialAvatarSelection = false;
    this.aiClassDefs = null;
    this.avatarDictionary = null;
    this.avatarDictionarySize = 0;
    this.savedStateIsValid = false;
    this.numberOfWins = 0;
  }

  // Reset the game to initial state
  reset() {
    this.CurrentTable.reset();
    this.CurrentTable.currentRound = 0;
    this.currentRoundNumber = 0;
    this.numberOfWins = 0;
    this.timePlayed = 0;
    this.CurrentTable.houseCardDealer.winningHandName.value = "";
    this.CurrentTable.mobileCardObj.visible = true;
    for (let i = 0; i < this.CurrentTable.opponentList.length; ++i) {
      this.CurrentTable.opponentList[i].resetPlayer(this);
    }
    this.CurrentTable.playerObj.resetPlayer(this);
    this.CurrentTable.houseCardDealer.currentPot.clear();
    this.CurrentTable.houseCardDealer.displayPot.value = 0;
    this.CurrentTable.currentActivePlayer = 0;
    this.CurrentTable.currentHandNumber = 0;
    this.timePlayed = 0;
  }

  // Initialize the game model
  initialize(isNewGame) {
    return __awaiter(this, void 0, void 0, function* () {
      this._resetAvatarPool();
      if (isNewGame) {
        this.CurrentTable.freeGeneratedElements();
        for (let i = 0; i < 6; ++i) {
          let _tempAvatar = new AvatarModel(
            this.avatarDictionary[this._getNewAvatarIndex()].name,
            i
          );
          (_tempAvatar.currentPoolIndex = this._getNewAvatarIndex()),
            (_tempAvatar.currentPortrait.faceImage =
              this.avatarDictionary[_tempAvatar.currentPoolIndex]
                .image_default),
            _tempAvatar.setLogic(
              this.avatarDictionary[_tempAvatar.currentPoolIndex].logic,
              this
            ),
            this.CurrentTable.opponentList.push(_tempAvatar);
        }
      } else {
        yield this._getSavedProgress();
      }
    });
  }

  // Free generated elements in the current table
  freeGeneratedElements() {
    this.CurrentTable.freeGeneratedElements();
  }

  // Get a card model
  getCard(cardPosition, forPlayer = null) {
    switch (cardPosition) {
      case 0:
        if (forPlayer) {
          return forPlayer.currentHand.Card1;
        }
        break;
      case 1:
        if (forPlayer) {
          return forPlayer.currentHand.Card2;
        }
        break;
      case 2:
        return this.CurrentTable.tableCard_Flop1;
      case 3:
        return this.CurrentTable.tableCard_Flop2;
      case 4:
        return this.CurrentTable.tableCard_Flop3;
      case 5:
        return this.CurrentTable.tableCard_Turn;
      case 6:
        return this.CurrentTable.tableCard_River;
    }
  }

  // Highlight a card
  highlightCard(cardIndex, player, scale = 1) {
    let playingCard = this.getCard(cardIndex, player);
    if (playingCard) {
      (playingCard.brightness = 1),
        (playingCard.isHighlighted = false),
        (player.isCardsReversed = player !== this.CurrentTable.getPlayer(0));
      !playingCard.isCardFaceDown && (playingCard.overScale = scale);
    }
  }

  // Reset all card highlights
  resetCardHighlights(player = null) {
    if ((this.CurrentTable.tableCard_Flop1.highlight = true),
      (this.CurrentTable.tableCard_Flop1.overScale = 1),
      (this.CurrentTable.tableCard_Flop2.isHighlighted = true),
      (this.CurrentTable.tableCard_Flop2.overScale = 1),
      (this.CurrentTable.tableCard_Flop3.highlight = true),
      (this.CurrentTable.tableCard_Flop3.overScale = 1),
      (this.CurrentTable.tableCard_Turn.isHighlighted = true),
      (this.CurrentTable.tableCard_Turn.overScale = 1),
      (this.CurrentTable.tableCard_River.isHighlighted = true),
      (this.CurrentTable.tableCard_River.overScale = 1),
      player) {
      (player.currentHand.Card1.isHighlighted = true),
        (player.currentHand.Card1.overScale = 1),
        (player.currentHand.Card2.isHighlighted = true),
        (player.currentHand.Card2.overScale = 1),
        (player.isCardsReversed = false);
    } else {
      for (let i = 0; i < this.CurrentTable.getMaxPlayersAtTable(); ++i) {
        (this.CurrentTable.getPlayer(i).currentHand.Card1
          .isHighlighted = true),
          (this.CurrentTable.getPlayer(i).currentHand.Card1.overScale = 1),
          (this.CurrentTable.getPlayer(i).currentHand.Card2
            .isHighlighted = true),
          (this.CurrentTable.getPlayer(i).currentHand.Card2.overScale = 1),
          (this.CurrentTable.getPlayer(i).resetCardOrder = false);
      }
    }
  }

  // Set the brightness of all table and player cards
  setTableCardsBrightness(brightness, fadeSpeed) {
    (this.CurrentTable.tableCard_Flop1.brightness = brightness),
      (this.CurrentTable.tableCard_Flop1.brightnessFadeSpeed = fadeSpeed),
      (this.CurrentTable.tableCard_Flop2.brightness = brightness),
      (this.CurrentTable.tableCard_Flop2.brightnessFadeSpeed = fadeSpeed),
      (this.CurrentTable.tableCard_Flop3.brightness = brightness),
      (this.CurrentTable.tableCard_Flop3.brightnessFadeSpeed = fadeSpeed),
      (this.CurrentTable.tableCard_Turn.brightness = brightness),
      (this.CurrentTable.tableCard_Turn.brightnessFadeSpeed = fadeSpeed),
      (this.CurrentTable.tableCard_River.brightness = brightness),
      (this.CurrentTable.tableCard_River.brightnessFadeSpeed = fadeSpeed);
    for (let i = 0; i < this.CurrentTable.getMaxPlayersAtTable(); ++i) {
      (this.CurrentTable.getPlayer(i).currentHand.Card1.brightness =
        brightness),
        (this.CurrentTable.getPlayer(i).currentHand.Card1
          .brightnessFadeSpeed = fadeSpeed),
        (this.CurrentTable.getPlayer(i).currentHand.Card2.brightness =
          brightness),
        (this.CurrentTable.getPlayer(i).currentHand.Card2
          .brightnessFadeSpeed = fadeSpeed);
    }
  }

  // Reset the available avatar indexes pool
  _resetAvatarPool() {
    this._availableAvatarIndexes = new Array();
    for (let i = 0; i < this.avatarDictionarySize; ++i) {
      this._availableAvatarIndexes.push(i);
    }
  }

  // Get a random avatar from the pool
  _getRandomAvatarFromPool() {
    return this._getAndRemoveAvatarByIndex(
      Math.floor(Math.random() * this._availableAvatarIndexes.length)
    );
  }

  // Get the first available avatar from the pool
  _getFirstAvailableAvatarFromPool() {
    return this._getAndRemoveAvatarByIndex(0);
  }

  // Get and remove an avatar from the pool at the specified index
  _getAndRemoveAvatarByIndex(index) {
    let avatarIndex = this._availableAvatarIndexes[index];
    return this._removeAvatarFromPool(avatarIndex), avatarIndex;
  }

  // Remove an avatar from the pool
  _removeAvatarFromPool(index) {
    let poolIndex = this._availableAvatarIndexes.indexOf(index);
    poolIndex >= 0 && this._availableAvatarIndexes.splice(poolIndex, 1);
  }

  // Return an avatar to the pool
  _returnAvatarToPool(index) {
    this._availableAvatarIndexes.push(index);
  }

  // Get a new avatar index based on the selection method
  _getNewAvatarIndex() {
    return this.useSequentialAvatarSelection
      ? this._getFirstAvailableAvatarFromPool()
      : this._getRandomAvatarFromPool();
  }

  // Generate save data for the game
  _generateSaveData() {
    for (let i = 0; i < this.CurrentTable.houseCardDealer.currentPot.count; ++i) {
      let sidePotPlayers = [];
      for (let j = 0; j <
        this.CurrentTable.houseCardDealer.currentPot.peekAt(i).sidePotPlayers
          .length; ++j) {
        sidePotPlayers[j] =
          this.CurrentTable.houseCardDealer.currentPot.peekAt(i).sidePotPlayers[j];
      }
      potData.push({
        value: this.CurrentTable.houseCardDealer.currentPot.peekAt(i).value,
        stableValue: this.CurrentTable.houseCardDealer.currentPot.peekAt(i).stableValue,
        sidePotPlayers: this.CurrentTable.houseCardDealer.currentPot.peekAt(i)
          .sidePotPlayers.length,
        sidePotPlayersAmount: sidePotPlayers
      });
    }
    let players = [];
    for (let i = 0; i < this.CurrentTable.getMaxPlayersAtTable(); ++i) {
      let tempPlayer = this.CurrentTable.getPlayer(i);
      players[i] = {
        actionId: tempPlayer.actionId,
        actionTaken: tempPlayer.actionTaken.value,
        availability: tempPlayer.availability,
        biggestWin: tempPlayer.biggestWin,
        card1: tempPlayer.currentHand.Card1.cardIndex,
        card2: tempPlayer.currentHand.Card2.cardIndex,
        currentBet: tempPlayer.currentBet.value,
        currentPoolIndex: tempPlayer.currentPoolIndex,
        moneyPool: tempPlayer.moneyPool.value,
        name: tempPlayer.getName()
      };
    }
    return {
      baseBetAmount: this.CurrentTable.houseCardDealer.baseBetAmount,
      currentActivePlayer: this.CurrentTable.currentActivePlayer,
      currentActivePlayerDealerOffset: this.CurrentTable.currentActivePlayerDealerOffset,
      currentDealer: this.CurrentTable.currentDealer,
      currentHandNumber: this.CurrentTable.currentHandNumber,
      currentHighBetPlayerIndex: this.CurrentTable.houseCardDealer.currentHighBetPlayerIndex,
      currentHighBetValue: this.CurrentTable.houseCardDealer.currentHighBetValue,
      currentPotCount: this.CurrentTable.houseCardDealer.currentPot.count,
      currentRound: this.CurrentTable.currentRound,
      currentRoundNumber: this.CurrentTable.currentRoundNumber,
      gameplayType: this.gameplayType,
      numberOfWins: this.numberOfWins,
      playerCount: this.CurrentTable.getMaxPlayersAtTable(),
      players: players,
      savedStateIsValid: this.savedStateIsValid,
      smState: this.smState,
      table: potData,
      tableCard_Flop1: this.CurrentTable.tableCard_Flop1.cardIndex,
      tableCard_Flop2: this.CurrentTable.tableCard_Flop2.cardIndex,
      tableCard_Flop3: this.CurrentTable.tableCard_Flop3.cardIndex,
      tableCard_Turn: this.CurrentTable.tableCard_Turn.cardIndex,
      tableCard_River: this.CurrentTable.tableCard_River.cardIndex,
      timePlayed: this.timePlayed
    };
  }

  // Load game data from a save file
  _loadFromSaveData(saveData, isNewGame) {
    (this.savedStateIsValid = saveData.savedStateIsValid),
      this.savedStateIsValid &&
      (this.CurrentTable.houseCardDealer.currentPot.peek() ||
        this.CurrentTable.houseCardDealer.currentPot.enqueue(
          new SidePotModel()
        ),
        (this.gameplayType = saveData.gameplayType),
        (this.CurrentTable.houseCardDealer.baseBetAmount =
          saveData.baseBetAmount),
        (this.CurrentTable.currentRound = saveData.currentRound),
        (this.CurrentTable.currentRoundNumber = saveData.currentRoundNumber),
        (this.CurrentTable.currentHandNumber = saveData.currentHandNumber),
        (this.CurrentTable.currentActivePlayer =
          saveData.currentActivePlayer),
        (this.CurrentTable.currentActivePlayerDealerOffset =
          saveData.currentActivePlayerDealerOffset),
        (this.CurrentTable.currentDealer = saveData.currentDealer),
        (this.CurrentTable.tableCard_Flop1.cardIndex =
          saveData.tableCard_Flop1),
        (this.CurrentTable.tableCard_Flop2.cardIndex =
          saveData.tableCard_Flop2),
        (this.CurrentTable.tableCard_Flop3.cardIndex =
          saveData.tableCard_Flop3),
        (this.CurrentTable.tableCard_Turn.cardIndex =
          saveData.tableCard_Turn),
        (this.CurrentTable.tableCard_River.cardIndex =
          saveData.tableCard_River),
        (this.CurrentTable.houseCardDealer.currentHighBetPlayerIndex =
          saveData.currentHighBetPlayerIndex),
        (this.CurrentTable.houseCardDealer.currentHighBetValue =
          saveData.currentHighBetValue),
        (this.timePlayed = saveData.timePlayed),
        (this.smState = saveData.smState),
        (potCount = saveData.table.length),
        this.CurrentTable.houseCardDealer.currentPot.clear());
    for (let i = 0; i < potCount; ++i) {
      let potEntry = saveData.table[i];
      this.CurrentTable.houseCardDealer.currentPot.enqueue(
        new SidePotModel()
      ),
        (this.CurrentTable.houseCardDealer.currentPot.peek().value =
          potEntry.value),
        (this.CurrentTable.houseCardDealer.currentPot.peek().stableValue =
          potEntry.stableValue);
      let sidePotPlayers = potEntry.sidePotPlayersAmount;
      (this.CurrentTable.houseCardDealer.currentPot.peek().sidePotPlayers =
        []),
        (j = 0);
      for (; j < sidePotPlayers.length; ++j) {
        this.CurrentTable.houseCardDealer.currentPot.peek().sidePotPlayers[j] = potEntry.sidePotPlayersAmount[j];
      }
    }
    if (!isNewGame) {
      let playerCount = saveData.players.length;
      this._resetAvatarPool();
      let playerData = saveData.players;
      for (let i = 0; i < playerCount; ++i) {
        let name = playerData[i].name, playerIndex = i, tempAvatar = 0 === i && this.CurrentTable.playerObj.isAuthorized
          ? this.CurrentTable.playerObj
          : new AvatarModel(name, playerIndex), j = void 0;
        if (0 === playerIndex) {
          tempAvatar.setupPlayer(
            this,
            new HumanPlayer(),
            this.playerStartingMonies
          );
          (tempAvatar.currentHand.Card1.cardFaceUp = false),
            (tempAvatar.currentHand.Card2.cardFaceUp = false),
            (this.CurrentTable.playerObj = tempAvatar);
        } else {
          tempAvatar.setupPlayer(
            this,
            this.avatarDictionary[tempAvatar.currentPoolIndex].logic,
            this.playerStartingMonies
          );
          this.CurrentTable.opponentList.push(tempAvatar);
        }
        (tempAvatar.currentPoolIndex = playerData[i].currentPoolIndex),
          this._removeAvatarFromPool(tempAvatar.currentPoolIndex),
          !tempAvatar.logicController.isLocalPlayer() &&
          ((tempAvatar.currentPortrait.faceImage =
            this.avatarDictionary[tempAvatar.currentPoolIndex]
              .image_default),
            (tempAvatar.name.value =
              this.avatarDictionary[tempAvatar.currentPoolIndex].name)),
          (tempAvatar.availability = playerData[i].availibility),
          (tempAvatar.biggestWin = playerData[i].biggestWin),
          (tempAvatar.moneyPool.value = playerData[i].moneyPool),
          (tempAvatar.currentHand.Card1.cardIndex = playerData[i].card1),
          (tempAvatar.currentHand.Card2.cardIndex = playerData[i].card2),
          (tempAvatar.currentBet.value = playerData[i].currentBet),
          (tempAvatar.actionId = playerData[i].actionId),
          (tempAvatar.actionTaken = new ActionInfoModel(
            playerData[i].actionTaken
          ));
        2 !== tempAvatar.actionId &&
          ((tempAvatar.currentHand.Card1.visible = false),
            (tempAvatar.currentHand.Card2.visible = false));
      }
      for (let i = 0; i < this.CurrentTable.getMaxPlayersAtTable(); ++i) {
        let currentPlayer = this.CurrentTable.getPlayer(i);
        (currentPlayer.refreshVisuals = false),
          !currentPlayer.isPlayerActive() &&
          currentPlayer.currentHand.Card1.resetToNULL(),
          !currentPlayer.isPlayerActive() &&
          currentPlayer.currentHand.Card2.resetToNULL();
      }
      switch (this.CurrentTable.currentRound) {
        case 5:
          this.CurrentTable.tableCard_River.showCard();
        case 4:
          this.CurrentTable.tableCard_Turn.showCard();
        case 3:
          this.CurrentTable.tableCard_Flop1.showCard(),
            this.CurrentTable.tableCard_Flop2.showCard(),
            this.CurrentTable.tableCard_Flop3.showCard();
      }
      this.CurrentTable.houseCardDealer.displayPot.stableValue > 0 &&
        ((tempPotValue =
          this.CurrentTable.houseCardDealer.displayPot.stableValue),
          (this.CurrentTable.houseCardDealer.displayPot.stableValue = 0),
          (this.CurrentTable.houseCardDealer.displayPot.stableValue =
            tempPotValue));
    }
  }

  // Get saved progress from local storage
  _getSavedProgress() {
    return __awaiter(this, void 0, void 0, function* () {
      let savedProgress = yield this._storageController.loadProgress();
      savedProgress && this._loadFromSaveData(savedProgress, false);
    });
  }

  // Save current progress to local storage
  saveToStorage() {
    return __awaiter(this, void 0, void 0, function* () {
      let save;
      Use; code; with (caution.
        JavaScript)
      User;
      continue from; exactly; where; you; left; off;


      Model;
      255.1; s;
      Data = this._generateSaveData();
      yield this._storageController.saveProgress(saveData);
    });
  }

  // Reset player bets
  resetPlayerBets() {
    for (let i = 0; i < this.CurrentTable.getMaxPlayersAtTable(); ++i) {
      this.CurrentTable.getPlayer(i).currentBet.value = 0;
    }
  }
}
