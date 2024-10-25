// Game state for showing the next table card

export class GameState_ShowNextTableCard extends GameStateBase {
  constructor() {
    super(16);
    this.stepNumber = 0;
  }

  // Initialize the state
  initialize() { }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    let gameModel = gameplayModel;
    let adviceText = "";
    this.stepNumber = 0;
    if (2 === gameModel.CurrentTable.currentRound) {
      gameModel.CurrentTable.tableCard_Flop1.cardFaceUp = false;
      gameModel.CurrentTable.tableCard_Flop2.cardFaceUp = true;
      gameModel.CurrentTable.tableCard_Flop3.cardFaceUp = true;
      adviceText = gameModel._localizationHandler.getText(
        "staticPokerDealer.flop"
      );
      gameModel.CurrentTable.currentRound = 3;
      this.currentTime = 0.35;
    } else if (3 === gameModel.CurrentTable.currentRound) {
      gameModel.CurrentTable.tableCard_Flop1.cardFaceUp = false;
      gameModel.CurrentTable.tableCard_Flop2.cardFaceUp = false;
      gameModel.CurrentTable.tableCard_Flop3.cardFaceUp = false;
      gameModel.CurrentTable.tableCard_Turn.cardFaceUp = false;
      adviceText = gameModel._localizationHandler.getText(
        "staticPokerDealer.turn"
      );
      gameModel.CurrentTable.currentRound = 4;
      this.currentTime = 1.5;
    } else if (4 === gameModel.CurrentTable.currentRound) {
      gameModel.CurrentTable.tableCard_Flop1.cardFaceUp = false;
      gameModel.CurrentTable.tableCard_Flop2.cardFaceUp = false;
      gameModel.CurrentTable.tableCard_Flop3.cardFaceUp = false;
      gameModel.CurrentTable.tableCard_Turn.cardFaceUp = false;
      gameModel.CurrentTable.tableCard_River.cardFaceUp = false;
      adviceText = gameModel._localizationHandler.getText(
        "staticPokerDealer.river"
      );
      gameModel.CurrentTable.currentRound = 5;
      this.currentTime = 1.5;
    }
    (gameModel.CurrentTable.houseCardDealer.adviceText = adviceText),
      (gameModel.CurrentTable.houseCardDealer.adviceVisible = false),
      gameModel.soundManager.play(SoundConstants.BUTTON_ROLLOVER, 0, 0.5),
      gameplayModel.saveToStorage();
  }

  // End the state
  endState(gameplayModel) {
    return (
      gameplayModel.CurrentTable.houseCardDealer.adviceVisible = true
    ),
      0;
  }

  // Update the state
  updateState(
    deltaTime,
    gameplayModel
  ) {
    let gameModel = gameplayModel;
    this.currentTime -= deltaTime;
    let shouldContinue = true;
    if (this.currentTime <= 0) {
      if (++this.stepNumber, 3 === gameModel.CurrentTable.currentRound) {
        switch (this.stepNumber) {
          case 1:
            this.playCardDealAnimation(
              gameModel.CurrentTable.mobileCardObj,
              gameModel.CurrentTable.tableCard_Flop1
            );
            this.currentTime = 0.35;
            break;
          case 2:
            gameModel.CurrentTable.tableCard_Flop1.cardFaceUp = false;
            gameModel.soundManager.play(SoundConstants.CARD_FLIP, 0, 0.5);
            this.currentTime = 0.35;
            break;
          case 3:
            this.playCardDealAnimation(
              gameModel.CurrentTable.mobileCardObj,
              gameModel.CurrentTable.tableCard_Flop2
            );
            this.currentTime = 0.35;
            break;
          case 4:
            gameModel.CurrentTable.tableCard_Flop2.cardFaceUp = false;
            gameModel.soundManager.play(SoundConstants.CARD_FLIP, 0, 0.5);
            this.currentTime = 0.35;
            break;
          case 5:
            this.playCardDealAnimation(
              gameModel.CurrentTable.mobileCardObj,
              gameModel.CurrentTable.tableCard_Flop3
            );
            this.currentTime = 0.35;
            break;
          case 6:
            gameModel.CurrentTable.tableCard_Flop3.cardFaceUp = false;
            gameModel.soundManager.play(SoundConstants.CARD_FLIP, 0, 0.5);
            this.currentTime = 0.5;
            break;
          default:
            shouldContinue = false;
        }
      } else if (4 === gameModel.CurrentTable.currentRound) {
        switch (this.stepNumber) {
          case 1:
            this.playCardDealAnimation(
              gameModel.CurrentTable.mobileCardObj,
              gameModel.CurrentTable.tableCard_Turn
            );
            this.currentTime = 0.35;
            break;
          case 2:
            gameModel.CurrentTable.tableCard_Turn.cardFaceUp = false;
            gameModel.soundManager.play(SoundConstants.CARD_FLIP, 0, 0.5);
            this.currentTime = 0.5;
            break;
          default:
            shouldContinue = false;
        }
      } else if (5 === gameModel.CurrentTable.currentRound) {
        switch (this.stepNumber) {
          case 1:
            this.playCardDealAnimation(
              gameModel.CurrentTable.mobileCardObj,
              gameModel.CurrentTable.tableCard_River
            );
            this.currentTime = 0.35;
            break;
          case 2:
            gameModel.CurrentTable.tableCard_River.cardFaceUp = false;
            gameModel.soundManager.play(SoundConstants.CARD_FLIP, 0, 0.5);
            this.currentTime = 0.5;
            break;
          default:
            shouldContinue = false;
        }
      }
      if (shouldContinue) {
        return 5;
      }
    }
    return 0;
  }

  // Play card deal animation
  playCardDealAnimation(mobileCard, tableCard) {
    if (!tableCard.visible) {
      (mobileCard.moveTo = [
        0,
        -1,
        tableCard.TablePositionX,
        tableCard.TablePositionY,
        0.35
      ]),
        (mobileCard.linkedCard = tableCard),
        (mobileCard.visible = false),
        (mobileCard.startLerp = false),
        (mobileCard.startLerp = true);
    }
  }

  // Handle message
  handleMessage(message, param) { }
}
