import { GameState_EndOfHand } from "../states/GameState_EndOfHand.js";

// Abstract class for a poker player
class PokerPlayerBase {
  constructor() {
    this._canCheck = true;
    this._canCall = true;
    this._canFold = true;
    this._canAllIn = true;
    this._canRaise = true;
    this._betIncreaseMultiplier = 0;
    this._previousBet = 0;
    this._concurrentAllIns = 0;
  }

  // Check if the player is local
  isLocalPlayer() {
    return false;
  }

  // Get the player's bet amount
  getBetAmount() {
    return this.finalBetAmount;
  }

  // Set the player's properties
  setProperties(properties) { }

  // Prepare the player for a new round
  prepareForNewRound(gameplayModel) { }

  // Handle game start logic
  onGameStart(gameplayModel, player) { }

  // Handle turn start logic
  onTurnStart(gameplayModel, player) {
    this.currentAction = "";
    this.raiseBetAmount = 0;
    this.callBetAmount = 0;
    gameplayModel.GameButtons.Button_Continue.visible = true;
    gameplayModel.CurrentTable.playerObj.name.isVisible = true;
    (gameplayModel.GameButtons.Button_Check.visible =
      gameplayModel.CurrentTable.houseCardDealer.currentBet ===
      player.currentBet.value),
      (gameplayModel.GameButtons.Button_Call.visible =
        !gameplayModel.GameButtons.Button_Check.visible),
      (gameplayModel.GameButtons.Button_Fold.isDisabled =
        gameplayModel.GameButtons.Button_Call.visible),
      (gameplayModel.GameButtons.Button_Raise.visible = true);
    if (0 === gameplayModel.CurrentTable.houseCardDealer.currentBet) {
      gameplayModel.GameButtons.Button_Raise.mainText.value =
        "buttonPoker.bet";
    } else {
      gameplayModel.GameButtons.Button_Raise.mainText.value =
        "buttonPoker.raise";
    }
    this.callBetAmount = player.predictBetValue(
      gameplayModel.CurrentTable.houseCardDealer.currentHighBetValue
    );
    this.raiseBetAmount = player.predictBetValue(
      this.callBetAmount +
      gameplayModel.CurrentTable.houseCardDealer.lastRaise +
      this.betIncreaseMultiplier *
      gameplayModel.CurrentTable.houseCardDealer.baseBetAmount
    );
    this._updateRaiseButtonText(gameplayModel, this.raiseBetAmount);
    this._updateCallButtonText(
      gameplayModel,
      this.callBetAmount - player.currentBet.value
    );
    gameplayModel.GameButtons.Button_Raise.visible =
      this.raiseBetAmount > this.callBetAmount;
    gameplayModel.GameButtons.Button_BetIncrease.visible =
      gameplayModel.GameButtons.Button_Raise.visible;
    gameplayModel.GameButtons.Button_BetDecrease.visible =
      gameplayModel.GameButtons.Button_Raise.visible;
    gameplayModel.GameButtons.Button_BetDecrease.isDisabled =
      this.betIncreaseMultiplier <= 0;
    gameplayModel.GameButtons.Button_BetIncrease.isDisabled =
      this.raiseBetAmount > player.moneyPool.value;
    gameplayModel.GameButtons.Button_AllIn.visible = false;
    let currentHandResult = CardCombinationUtil.getCardCombination(
      player.currentHand.Card1.cardIndex,
      player.currentHand.Card2.cardIndex,
      gameplayModel.CurrentTable.currentRound >= 3
        ? gameplayModel.CurrentTable.tableCard_Flop1.cardIndex
        : -1,
      gameplayModel.CurrentTable.currentRound >= 3
        ? gameplayModel.CurrentTable.tableCard_Flop2.cardIndex
        : -1,
      gameplayModel.CurrentTable.currentRound >= 3
        ? gameplayModel.CurrentTable.tableCard_Flop3.cardIndex
        : -1,
      gameplayModel.CurrentTable.currentRound >= 4
        ? gameplayModel.CurrentTable.tableCard_Turn.cardIndex
        : -1,
      gameplayModel.CurrentTable.currentRound >= 5
        ? gameplayModel.CurrentTable.tableCard_River.cardIndex
        : -1
    );
    if (currentHandResult[0] >= CardCombinationPowersID.PAIR) {
      (gameplayModel.highlightCard(currentHandResult[1][1], player, 1),
        gameplayModel.highlightCard(currentHandResult[1][2], player, 1),
        gameplayModel.highlightCard(currentHandResult[1][3], player, 1),
        gameplayModel.highlightCard(currentHandResult[1][4], player, 1),
        gameplayModel.highlightCard(currentHandResult[1][5], player, 1));
    }
    gameplayModel.soundManager.play(
      SoundConstants.CHIME_YOUR_TURN,
      0,
      SoundConstants.BET_DECREASE_VOLUME
    );
  }

  // Handle turn end logic
  onTurnEnd(gameplayModel, player) {
    if (this._analytics.trackTurns) {
      this._analytics.trackTurns &&
        this._gameAnalytics.trackUserTurn(
          gameplayModel.CurrentTable.currentHandNumber.toString()
        );
      this._gameAnalytics.trackTurns = true;
    }
    this.resetCardHighlights(player);
    gameplayModel.GameButtons.hideAll();
    gameplayModel.CurrentTable.playerObj.name.isVisible = false;
  }

  // Handle player thinking logic
  playerThinking(thinkTimePercent, deltaTime, gameplayModel, player) {
    if (thinkTimePercent >= (gameplayModel.CurrentTable.isUserPlaying() ? 0.97 : 0.99)) {
      return -1;
    }
    for (let playerIndex = 0; playerIndex < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++playerIndex) {
      if (gameplayModel.CurrentTable.getPlayer(playerIndex)
        .concurrentAllIns >= 3 &&
        Math.random() < 0.65) {
        return (
          gameplayModel.CurrentTable.getPlayer(playerIndex)
            .concurrentAllIns -= 2
        ),
          1;
      }
    }
    let totalHandQuality = 100 * this.handQuality[0] + 4 * this.handQuality[6] + this.handQuality[7];
    let isTableCardContributing = true;
    if (this.handQuality[0] > 0) {
      for (let cardIndex = 0; cardIndex < 5; ++cardIndex) {
        isTableCardContributing =
          isTableCardContributing ||
          0 === this.handQuality[1 + cardIndex] ||
          1 === this.handQuality[1 + cardIndex];
      }
    }
    isTableCardContributing ||
      (totalHandQuality *= this.tableCardOnlyScale);
    switch (gameplayModel.CurrentTable.currentRound) {
      case 2:
        return this._tableState_PreFlop(totalHandQuality, gameplayModel, player);
      case 3:
        return this._tableState_Flop(totalHandQuality, gameplayModel, player);
      case 4:
        return this._tableState_Turn(totalHandQuality, gameplayModel, player);
      case 5:
        return this._tableState_River(totalHandQuality, gameplayModel, player);
    }
    return (
      (player.concurrentAllIns = 0),
      gameplayModel.CurrentTable.houseCardDealer.currentBet ===
        player.currentBet.value
        ? 0
        : 2
    );
  }

  // Update game state
  update(deltaTime, gameplayModel, currentPlayerIndex) { }

  // Handle messages from the UI
  handleMessage(message, param) { }

  // Get a list of winning players based on their hand strength
  _getListOfWinners(playerIndexes, handResults, powerIndex) {
    let highestValue = 0, highestIndex = playerIndexes[0], numberOfTies = 1;
    for (let i = 1; i < playerIndexes.length; ++i)
      handResults[playerIndexes[i]][powerIndex] > highestValue
        ? ((numberOfTies = 1),
          (highestValue = handResults[playerIndexes[i]][powerIndex]),
          (highestIndex = playerIndexes[i]))
        : handResults[playerIndexes[i]][powerIndex] === highestValue &&
        numberOfTies++;
    if (1 === numberOfTies) {
      return [highestIndex, 1];
    }
    if (powerIndex + 1 < (this.winningHandType === "staticPokerHand.threeOfAKind" ? 9 : 12)) {
      let tieingPlayers = [];
      if (numberOfTies >= 2) {
        for (let i = 0; i < playerIndexes.length; ++i) {
          handResults[playerIndexes[i]][powerIndex] === highestValue &&
            tieingPlayers.push(playerIndexes[i]);
        }
      }
      return this._getListOfWinners(
        tieingPlayers,
        handResults,
        powerIndex + 1
      );
    }
    let resultsArray = [];
    if (numberOfTies >= 2) {
      for (let i = 0; i < playerIndexes.length; ++i) {
        handResults[playerIndexes[i]][powerIndex] === highestValue &&
          ((resultsArray.push(playerIndexes[i]),
            resultsArray.push(1 / numberOfTies)));
      }
    }
    return resultsArray;
  }

  // Get a list of players with a specific hand combination
  _getPlayersWithHand(handResults, combination) {
    let playerIndexes = [];
    for (let i = 0; i < this.numberOfValidPlayers; ++i)
      handResults[i][0] === combination && playerIndexes.push(i);
    return playerIndexes;
  }

  // Determine the winning players and their hand type
  _calculateWinner(gameplayModel) {
    let winningPlayerIndexes;
    (winningPlayerIndexes = this._getPlayersWithHand(
      this.cardResults,
      CardCombinationPowersID.ROYAL_FLUSH
    )),
      (this.winningHandType = "staticPokerHand.royalFlush");
    1 === winningPlayerIndexes.length
      ? [winningPlayerIndexes[0], 1]
      : ((winningPlayerIndexes = this._getPlayersWithHand(
        this.cardResults,
        CardCombinationPowersID.STRAIGHT_FLUSH
      )),
        (this.winningHandType = "staticPokerHand.straightFlush"),
        1 === winningPlayerIndexes.length
          ? [winningPlayerIndexes[0], 1]
          : winningPlayerIndexes.length > 1
            ? this._getListOfWinners(winningPlayerIndexes, this.cardResults, 6)
            : ((winningPlayerIndexes = this._getPlayersWithHand(
              this.cardResults,
              CardCombinationPowersID.FOUR_OF_A_KIND
            )),
              (this.winningHandType = "staticPokerHand.fourOfAKind"),
              1 === winningPlayerIndexes.length
                ? [winningPlayerIndexes[0], 1]
                : winningPlayerIndexes.length > 1
                  ? this._getListOfWinners(
                    winningPlayerIndexes,
                    this.cardResults,
                    6
                  )
                  : ((winningPlayerIndexes = this._getPlayersWithHand(
                    this.cardResults,
                    CardCombinationPowersID.FULL_HOUSE
                  )),
                    (this.winningHandType = "staticPokerHand.fullHouse"),
                    1 === winningPlayerIndexes.length
                      ? [winningPlayerIndexes[0], 1]
                      : winningPlayerIndexes.length > 1
                        ? this._getListOfWinners(
                          winningPlayerIndexes,
                          this.cardResults,
                          6
                        )
                        : ((winningPlayerIndexes = this._getPlayersWithHand(
                          this.cardResults,
                          CardCombinationPowersID.FLUSH
                        )),
                          (this.winningHandType = "staticPokerHand.flush"),
                          1 === winningPlayerIndexes.length
                            ? [winningPlayerIndexes[0], 1]
                            : winningPlayerIndexes.length > 1
                              ? this._getListOfWinners(
                                winningPlayerIndexes,
                                this.cardResults,
                                6
                              )
                              : ((winningPlayerIndexes = this._getPlayersWithHand(
                                this.cardResults,
                                CardCombinationPowersID.STRAIGHT
                              )),
                                (this.winningHandType = "staticPokerHand.straight"),
                                1 === winningPlayerIndexes.length
                                  ? [winningPlayerIndexes[0], 1]
                                  : winningPlayerIndexes.length > 1
                                    ? this._getListOfWinners(
                                      winningPlayerIndexes,
                                      this.cardResults,
                                      6
                                    )
                                    : ((winningPlayerIndexes = this._getPlayersWithHand(
                                      this.cardResults,
                                      CardCombinationPowersID.THREE_OF_A_KIND
                                    )),
                                      (this.winningHandType =
                                        "staticPokerHand.threeOfAKind"),
                                      1 === winningPlayerIndexes.length
                                        ? [winningPlayerIndexes[0], 1]
                                        : winningPlayerIndexes.length > 1
                                          ? this._getListOfWinners(
                                            winningPlayerIndexes,
                                            this.cardResults,
                                            6
                                          )
                                          : ((winningPlayerIndexes = this._getPlayersWithHand(
                                            this.cardResults,
                                            CardCombinationPowersID.TWO_PAIR
                                          )),
                                            (this.winningHandType =
                                              "staticPokerHand.twoPair"),
                                            1 === winningPlayerIndexes.length
                                              ? [winningPlayerIndexes[0], 1]
                                              : winningPlayerIndexes.length > 1
                                                ? this._getListOfWinners(
                                                  winningPlayerIndexes,
                                                  this.cardResults,
                                                  6
                                                )
                                                : ((winningPlayerIndexes = this._getPlayersWithHand(
                                                  this.cardResults,
                                                  CardCombinationPowersID.PAIR
                                                )),
                                                  (this.winningHandType =
                                                    "staticPokerHand.pair"),
                                                  1 === winningPlayerIndexes.length
                                                    ? [winningPlayerIndexes[0], 1]
                                                    : (winningPlayerIndexes.length > 1 ||
                                                      ((winningPlayerIndexes = this._getPlayersWithHand(
                                                        this.cardResults,
                                                        CardCombinationPowersID.HIGH_CARD
                                                      )),
                                                        (this.winningHandType =
                                                          "staticPokerHand.highCard")),
                                                      this._getListOfWinners(
                                                        winningPlayerIndexes,
                                                        this.cardResults,
                                                        6
                                                      ))))))))));
  }

  // Handle chip movement for winning players
  _handleChipMovement(gameplayModel, deltaTime) {
    this._currentChipTime -= deltaTime;
    if (!(this._currentChipTime > 0 || this._launchedChips <= 0)) {
      --this._launchedChips;
      this._currentChipTime = GameState_EndOfHand.CHIP_MOVE_TIME;
      for (let i = 0; i < this.winningPlayers.length; ++i) {
        let currentPlayer = gameplayModel.CurrentTable.getPlayer(
          this.winningPlayers[i]
        );
        gameplayModel.CurrentTable.mobileChips.moveChip(
          gameplayModel.CurrentTable.potX,
          gameplayModel.CurrentTable.potY,
          currentPlayer.chipPoolPosition.x,
          currentPlayer.chipPoolPosition.y,
          GameState_EndOfHand.CHIP_MOVE_SPEED
        );
      }
    }
  }

  // Display winning hand information to the player
  _displayWinningHandMessage(gameplayModel) {
    let currentWinningPlayerName = gameplayModel._localizationHandler.getText(
      gameplayModel.CurrentTable.getPlayer(this.winningPlayerList[0]).name
        .value
    );
    let currentWinningPlayerPot = this.currentPot
      .value.toLocaleString(
        gameplayModel._localizationHandler.supportedLanguages
          .defaultLanguage
      );
    let winningHandText = this
      .localizationManager.getText(this.winningHandType);
    const playerNameRegex = /PLAYER_NAME/gi;
    const potValueRegex = /POT_VALUE/gi;
    const newlineRegex = /\\n/gi;
    let hasSidePot = gameplayModel.CurrentTable.houseCardDealer.currentPot.count > 0 &&
      gameplayModel.CurrentTable.houseCardDealer.displayPot.value > 0;
    if (0 === this.winningPlayerList.length) {
      let messageTextKey = "staticPokerDealer.potPayout1";
      hasSidePot && (messageTextKey = "staticPokerDealer.potPayout6");
      gameplayModel.CurrentTable.houseCardDealer.adviceText = messageTextKey
        .replace(potValueRegex, currentWinningPlayerPot)
        .replace(newlineRegex, "\n");
    } else if (this.areHandsShown) {
      if (2 === this.winningPlayerList.length) {
        let messageTextKey = "staticPokerDealer.potPayout7";
        if (gameplayModel.CurrentTable.getPlayer(
          this.winningPlayerList[0]
        ).logicController.isLocalPlayer() &&
          !gameplayModel.CurrentTable.getPlayer(
            this.winningPlayerList[0]
          ).isAuthorized) {
          (messageTextKey = "staticPokerDealer.potPayout8"),
            hasSidePot && (messageTextKey = "staticPokerDealer.potPayout9");
        } else {
          hasSidePot && (messageTextKey = "staticPokerDealer.potPayout10");
        }
        messageTextKey = gameplayModel._localizationHandler.getText(
          messageTextKey
        );
        gameplayModel.CurrentTable.houseCardDealer.adviceText = messageTextKey
          .replace(playerNameRegex, currentWinningPlayerName)
          .replace(potValueRegex, currentWinningPlayerPot)
          .replace(newlineRegex, "\n");
        gameplayModel.CurrentTable.houseCardDealer.winningHandName.value =
          this.winningHandText;
      } else {
        let messageTextKey = "staticPokerDealer.potPayout3";
        hasSidePot && (messageTextKey = "staticPokerDealer.potPayout11");
        messageTextKey = gameplayModel._localizationHandler.getText(
          messageTextKey
        );
        gameplayModel.CurrentTable.houseCardDealer.adviceText = messageTextKey
          .replace(potValueRegex, currentWinningPlayerPot)
          .replace(newlineRegex, "\n");
        gameplayModel.CurrentTable.houseCardDealer.winningHandName.value =
          this.winningHandText;
      }
    } else {
      let messageTextKey = "staticPokerDealer.potPayout5";
      if (gameplayModel.CurrentTable.getPlayer(
        this.winningPlayerList[0]
      ).logicController.isLocalPlayer() &&
        !gameplayModel.CurrentTable.getPlayer(this.winningPlayerList[0])
          .isAuthorized) {
        (messageTextKey = "staticPokerDealer.potPayout4"),
          hasSidePot && (messageTextKey = "staticPokerDealer.potPayout12");
      } else {
        hasSidePot && (messageTextKey = "staticPokerDealer.potPayout2");
      }
      messageTextKey = gameplayModel._localizationHandler.getText(
        messageTextKey
      );
      gameplayModel.CurrentTable.houseCardDealer.adviceText = messageTextKey
        .replace(playerNameRegex, currentWinningPlayerName)
        .replace(newlineRegex, "\n");
    }
    gameplayModel.CurrentTable.houseCardDealer.adviceVisible = false;
  }

  // Get the hand strength of a player based on their card combination
  _getPlayerHandPower(player, gameplayModel, handResults) {
    let powerIndex = gameplayModel.CurrentTable.currentRound;
    let playerCard1 = player.currentHand.Card1.cardIndex >= 0
      ? gameplayModel.CurrentTable.currentDeck.getCard(
        player.currentHand.Card1.cardIndex
      ) %
      13
      : -1;
    let playerCard2 = player.currentHand.Card2.cardIndex >= 0
      ? gameplayModel.CurrentTable.currentDeck.getCard(
        player.currentHand.Card2.cardIndex
      ) %
      13
      : -1;
    if (playerCard1 > playerCard2) {
      let temp = playerCard1;
      (playerCard1 = playerCard2), (playerCard2 = temp);
    }
    let playerCombination = handResults[player.index][0];
    let power = 0;
    switch (playerCombination) {
      case CardCombinationPowersID.HIGH_CARD:
        power =
          13 *
          (13 *
            (13 *
              (13 *
                (13 * handResults[player.index][5] +
                  handResults[player.index][6]) +
                handResults[player.index][7]) +
              handResults[player.index][8]) +
            handResults[player.index][9]) +
          handResults[player.index][10];
        break;
      case CardCombinationPowersID.PAIR:
        power = 13 * (13 * handResults[player.index][5] + playerCard2);
        break;
      case CardCombinationPowersID.TWO_PAIR:
        power =
          13 *
          (13 * handResults[player.index][5] +
            handResults[player.index][6]) +
          playerCard2;
        break;
      case CardCombinationPowersID.THREE_OF_A_KIND:
        power = 13 * handResults[player.index][5] + playerCard2;
        break;
      case CardCombinationPowersID.STRAIGHT:
        power = 13 * handResults[player.index][5];
        break;
      case CardCombinationPowersID.FLUSH:
        power =
          13 *
          (13 *
            (13 *
              (13 *
                (13 * handResults[player.index][1] +
                  handResults[player.index][2]) +
                handResults[player.index][3]) +
              handResults[player.index][4]) +
            handResults[player.index][5]) +
          playerCard2;
        break;
      case CardCombinationPowersID.FULL_HOUSE:
        power =
          13 * handResults[player.index][5] + handResults[player.index][6];
        break;
      case CardCombinationPowersID.FOUR_OF_A_KIND:
        power = 13 * handResults[player.index][5] + playerCard2;
        break;
      case CardCombinationPowersID.STRAIGHT_FLUSH:
        power = 13 * handResults[player.index][5];
        break;
      case CardCombinationPowersID.ROYAL_FLUSH:
        power = 13 * handResults[player.index][5];
    }
    return (
      powerIndex < 2 &&
      (power = Math.floor(
        (power * Math.pow(13, 5 - powerIndex) *
          Math.floor(100 * Math.random())) /
        Math.pow(13, 5 - powerIndex)
      )),
      power
    );
  }
}
