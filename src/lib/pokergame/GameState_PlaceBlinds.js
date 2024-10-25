import { AvatarAvalibilityIDs, GameplayModeTypeIDs } from "./views/DummyObjView.js";

// Game state for placing blinds

export class GameState_PlaceBlinds extends GameStateBase {
  constructor() {
    super(2);
    this._currentDealingIndex = -1;
    this._validPlayerList = [];
    this._isInterstitialAdAvailable = true;
  }

  // Initialize the state
  initialize() {
    this._subState = 0;
  }

  // Start the state
  startState(previousStatePayload, gameplayModel) {
    this._gameplayModel = gameplayModel;
    this._currentDealingIndex = -1;
    this.currentTime = 1;
    for (let i = 0; i < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
      let currentPlayer = gameplayModel.CurrentTable.getDealerBasedPlayer(i);
      currentPlayer.prepareForNewRound(gameplayModel);
      if (currentPlayer.availability !== AvatarAvalibilityIDs.FOLDED &&
        currentPlayer.availability !== AvatarAvalibilityIDs.ALL_IN) {
        currentPlayer.availability = AvatarAvalibilityIDs.ACTIVE;
      }
    }
    if ((gameplayModel.CurrentTable.tableCard_Flop1.resetToNULL(),
      gameplayModel.CurrentTable.tableCard_Flop2.resetToNULL(),
      gameplayModel.CurrentTable.tableCard_Flop3.resetToNULL(),
      gameplayModel.CurrentTable.tableCard_Turn.resetToNULL(),
      gameplayModel.CurrentTable.tableCard_River.resetToNULL(),
      gameplayModel.GameButtons.hideAll(),
      gameplayModel.CurrentTable.playerObj.currentPortrait.isVisible = true,
      gameplayModel.CurrentTable.houseCardDealer.adviceVisible = true,
      gameplayModel.CurrentTable.currentRound = 1,
      (gameplayModel.CurrentTable.houseCardDealer.currentPot.clear(),
        (gameplayModel.CurrentTable.houseCardDealer.displayPot.value = 0),
        ++gameplayModel.CurrentTable.currentHandNumber,
        0 === gameplayModel.CurrentTable.currentDealer))) {
      ++gameplayModel.currentRoundNumber;
      if (0 === gameplayModel.blind_baseVal) {
        gameplayModel.CurrentTable.houseCardDealer.baseBetAmount =
          10 * Math.floor(gameplayModel.playerStartingMonies / 30);
      } else {
        gameplayModel.CurrentTable.houseCardDealer.baseBetAmount =
          gameplayModel.blind_baseVal;
      }
      if (gameplayModel.gameplayType === GameplayModeTypeIDs.SIT_AND_GO) {
        let roundNumForBlindIncrease = gameplayModel.currentRoundNumber - 1;
        for (let i = 0; i < roundNumForBlindIncrease; ++i) {
          gameplayModel.CurrentTable.houseCardDealer.baseBetAmount *= 2;
        }
      }
    }
    gameplayModel.CurrentTable.currentHandNumber %
      gameplayModel.handsPrInterstitial !=
      0 ||
      gameplayModel.userProfile.subscribed ||
      (this._currentDealingIndex = 3),
      (gameplayModel.CurrentTable.houseCardDealer.currentHighBetValue =
        gameplayModel.CurrentTable.houseCardDealer.baseBetAmount),
      gameplayModel.resetPlayerBets(),
      this._validPlayerList = [];
    for (let i = 0; i < gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
      gameplayModel.CurrentTable.getDealerBasedPlayer(i).isPlayerActive() &&
        this._validPlayerList.push(i);
    }
    this.isFinished = true;
  }

  // End the state
  endState(gameplayModel) {
    return 0;
  }

  // Update the state
  updateState(deltaTime, gameplayModel) {
    if (gameplayModel.gameplayType === GameplayModeTypeIDs.SIT_AND_GO &&
      gameplayModel.CurrentTable.currentRoundNumber > gameplayModel.roundsForSitGo) {
      return 17;
    }
    if (this.isFinished) {
      return 3;
    }
    (this.currentTime -= deltaTime),
      this.currentTime > 0 || this._handleSubState(++this._subState, gameplayModel);
    return 0;
  }

  // Handle message
  handleMessage(message, param) { }

  // Handle sub-states within the game state
  _handleSubState(subState, gameplayModel) {
    let _this = this;
    switch (subState) {
      case 0:
      case 6:
        if (1 === gameplayModel.CurrentTable.currentDealer &&
          gameplayModel.gameplayType === GameplayModeTypeIDs.SIT_AND_GO) {
          let currentRoundText = gameplayModel._localizationHandler.getText(
            "staticPoker.round"
          );
          currentRoundText = currentRoundText
            .replace(
              /ROUND_NUMBER/gi,
              gameplayModel.CurrentTable.currentRoundNumber.toString()
            )
            .replace(
              /MAX_NUMBER/gi,
              gameplayModel.roundsForSitGo.toString()
            );
          gameplayModel.CurrentTable.houseCardDealer.adviceText =
            currentRoundText;
        } else {
          gameplayModel.CurrentTable.houseCardDealer.adviceText =
            gameplayModel._localizationHandler.getText("staticPoker.newHand");
        }
        gameplayModel.CurrentTable.houseCardDealer.adviceVisible = false;
        this._currentDealingIndex = 0;
        this.currentTime = 2;
        break;
      case 1:
        gameplayModel.CurrentTable.houseCardDealer.adviceText =
          gameplayModel._localizationHandler.getText("staticPoker.blinds");
        gameplayModel.CurrentTable.houseCardDealer.adviceVisible = false;
        this.currentTime = 0.5;
        gameplayModel.CurrentTable.getDealerBasedPlayer(
          this._validPlayerList[1 % this._validPlayerList.length]
        ).placeSmallBlind(
          Math.floor(
            gameplayModel.CurrentTable.houseCardDealer.baseBetAmount / 2
          )
        );
        gameplayModel.CurrentTable.getDealerBasedPlayer(
          this._validPlayerList[2 % this._validPlayerList.length]
        ).placeBlind(gameplayModel.CurrentTable.houseCardDealer.baseBetAmount);
        break;
      case 2:
        SoundConstants.playApplause(
          gameplayModel.soundManager,
          SoundConstants.CHIP_MED_BET,
          0.7
        );
        gameplayModel.CurrentTable.currentDeck.RebuildDeck();
        this.currentTime = 1;
        break;
      case 4:
        this.interstitialAd = window.getArkadiumInterstitialAd() || window.getKakaoInterstitialAd();
        if (this.interstitialAd &&
          this.interstitialAd &&
          !gameplayModel.userProfile.subscribed) {
          gameplayModel.CurrentTable.houseCardDealer.adviceText =
            gameplayModel._localizationHandler.getText("staticPoker.ad");
          gameplayModel.CurrentTable.houseCardDealer.adviceVisible = false;
          this.currentTime = 3;
        } else {
          this._currentDealingIndex = 0;
        }
        break;
      case 5:
        if (this.interstitialAd &&
          this.interstitialAd &&
          !gameplayModel.userProfile.subscribed) {
          this.currentTime = 1;
          gameplayModel.frontendLogic.showInterstitialAd().then(() => {
            (_this.currentTime = 0.5),
              (_this._gameplayModel.soundManager.isMusicEnabled() &&
                !_this._gameplayModel.soundManager.isPlaying(
                  SoundConstants.GAMEPLAY_MUSIC
                ) &&
                _this._gameplayModel.soundManager.play(
                  SoundConstants.GAMEPLAY_MUSIC,
                  true,
                  SoundConstants.BUTTON_CLICK_VOLUME
                ));
          });
        }
        break;
      default:
        gameplayModel.CurrentTable.houseCardDealer.adviceVisible = true;
        this.isFinished = false;
    }
  }
}
