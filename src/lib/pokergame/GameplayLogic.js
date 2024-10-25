import { GameState_DealFirstCards, GameState_BeginRound, GameState_PlayerAction_DecideState, GameState_PlayerAction_ThinkingState, GameState_PlayerAction_CallState, GameState_PlayerAction_RaiseState, GameState_PlayerAction_FoldState, GameState_PlayerAction_AllInState, GameState_PlayerAction_SitInState, GameState_PlayerAction_SitOutState, GameState_ShowNextTableCard, GameState_EndOfHand, GameState_IntroduceNewPlayers, GameState_OutOfMoney, GameState_CheckIfRoundIsOver, GameState_EndGame } from "./views/DummyObjView.js";
import { GameState_PlaceBlinds } from "./GameState_PlaceBlinds.js";
import { GameState_StartGame } from "./GameState_StartGame.js";

// Gameplay logic for handling game events
class GameplayLogic {
  constructor(gameplayModel, soundManager, analytics, storageController) {
    this._gameplayModel = gameplayModel;
    this._soundManager = soundManager;
    this._analytics = analytics;
    this._storageController = storageController;
    this._currentGameplayMachine = null;
    this._activeDealerIndex = 0;
    this._currentGameplayMachine = new GameStateMachine();
    this._currentGameplayMachine.registerState(new GameState_StartGame());
    this._currentGameplayMachine.registerState(new GameState_PlaceBlinds());
    this._currentGameplayMachine.registerState(new GameState_DealFirstCards());
    this._currentGameplayMachine.registerState(new GameState_BeginRound());
    this._currentGameplayMachine.registerState(new GameState_PlayerAction_DecideState());
    this._currentGameplayMachine.registerState(new GameState_PlayerAction_ThinkingState());
    this._currentGameplayMachine.registerState(new GameState_PlayerAction_CheckState());
    this._currentGameplayMachine.registerState(new GameState_PlayerAction_CallState());
    this._currentGameplayMachine.registerState(new GameState_PlayerAction_RaiseState());
    this._currentGameplayMachine.registerState(new GameState_PlayerAction_FoldState());
    this._currentGameplayMachine.registerState(new GameState_PlayerAction_AllInState());
    this._currentGameplayMachine.registerState(new GameState_PlayerAction_SitInState());
    this._currentGameplayMachine.registerState(new GameState_PlayerAction_SitOutState());
    this._currentGameplayMachine.registerState(new GameState_ShowNextTableCard());
    this._currentGameplayMachine.registerState(new GameState_EndOfHand());
    this._currentGameplayMachine.registerState(new GameState_GoodbyeToOldPlayers());
    this._currentGameplayMachine.registerState(new GameState_IntroduceNewPlayers());
    this._currentGameplayMachine.registerState(new GameState_OutOfMoney());
    this._currentGameplayMachine.registerState(new GameState_CheckIfRoundIsOver());
    this._currentGameplayMachine.registerState(new GameState_EndGame());
    this._model.CurrentTable.mobileCardObj.visible = true;
    document.addEventListener(
      "exitGameRequested",
      this.exitGame.bind(this),
      true
    );
  }

  // Reset game data
  resetGameData() {
    GameStateMachine.currentState = -1;
    this._gameplayModel.CurrentTable.currentRound = 0;
  }

  // Start the game
  startGame(newGame) {
    if (newGame) {
      this.resetGameData();
    } else {
      GameStateMachine.currentState = this._model.smState;
    }
    this._currentGameplayMachine.start();
    this._gameplayModel.OptionsButton.visible = true;
    this._gameplayModel.isGameActive = true;
    this._currentGameplayMachine.changeState(1, 0, this._model);
    this._activeDealerIndex = -1;
    this.updateDealerButton(this._gameplayModel.CurrentTable.currentDealer);
    this._gameplayModel._soundManager.playSound(
      SoundConstants.BUTTON_CLICK,
      true,
      SoundConstants.BUTTON_CLICK_VOLUME
    );
    if (this._gameplayModel.soundManager.isMusicEnabled() &&
      !this._gameplayModel._soundManager.isPlaying(
        SoundConstants.GAMEPLAY_MUSIC
      )) {
      this._gameplayModel.soundManager.play(
        SoundConstants.GAMEPLAY_MUSIC,
        true,
        SoundConstants.BUTTON_CLICK_VOLUME
      );
    } else if (!this._gameplayModel.soundManager.isMusicEnabled() ||
      this._gameplayModel.soundManager.isPlaying(
        SoundConstants.GAMEPLAY_MUSIC
      )) {
      if (!this._gameplayModel.soundManager.isMusicEnabled() &&
        this._gameplayModel.soundManager.isPlaying(
          SoundConstants.GAMEPLAY_MUSIC
        )) {
        this._gameplayModel.soundManager.play(
          SoundConstants.GAMEPLAY_MUSIC,
          true,
          SoundConstants.BUTTON_CLICK_VOLUME
        );
      }
    } else {
      this._gameplayModel.soundManager.play(
        SoundConstants.GAMEPLAY_MUSIC,
        true,
        SoundConstants.BUTTON_CLICK_VOLUME
      );
    }
  }

  // End the game
  endGame() {
    this._gameplayModel.soundManager.stop(SoundConstants.GAMEPLAY_MUSIC);
    this._gameplayModel.smState = GameStateMachine.currentState;
    this._storageController.resetStorage();
  }

  // Update game elements on each frame
  onUpdate(deltaTime) {
    if (!this._gameplayModel.isFinished) {
      this._currentGameplayMachine.updateState(deltaTime, this._gameplayModel);
      this._model.smState = GameStateMachine.currentState;
      let currentTotalPot = 0;
      for (let i = 0; i < this._model.CurrentTable.houseCardDealer.currentPot.count; ++i) {
        currentTotalPot +=
          this._gameplayModel.CurrentTable.houseCardDealer.currentPot.peekAt(i)
            .value;
      }
      if (this._model.CurrentTable.houseCardDealer.displayPot.value >
        currentTotalPot) {
        if (this._model.CurrentTable.houseCardDealer.displayPot.prevStableValue ===
          void 0) {
          this._model.CurrentTable.houseCardDealer.displayPot.prevStableValue =
            this._model.CurrentTable.houseCardDealer.displayPot.value;
        }
        let potDecrementAmount = Math.floor(
          Math.min(
            this._model.CurrentTable.houseCardDealer.displayPot
              .prevStableValue / 6,
            this._model.CurrentTable.houseCardDealer.displayPot.value -
            currentTotalPot
          )
        );
        (this._model.CurrentTable.houseCardDealer.displayPot.value -=
          potDecrementAmount),
          (this._model.CurrentTable.houseCardDealer.displayPot.value <=
            currentTotalPot &&
            ((this._model.CurrentTable.houseCardDealer.displayPot
              .prevStableValue = void 0),
              (this._model.CurrentTable.houseCardDealer.displayPot.value =
                currentTotalPot)));
      } else if (this._model.CurrentTable.houseCardDealer.displayPot.value <
        currentTotalPot) {
        if (this._model.CurrentTable.houseCardDealer.displayPot.prevStableValue ===
          void 0) {
          this._model.CurrentTable.houseCardDealer.displayPot.prevStableValue =
            this._model.CurrentTable.houseCardDealer.displayPot.value;
        }
        let potIncrementAmount = currentTotalPot / Math.floor(2800 * deltaTime) > 50
          ? currentTotalPot / 50
          : Math.floor(2800 * deltaTime);
        (potIncrementAmount = Math.floor(
          Math.min(
            currentTotalPot -
            this._model.CurrentTable.houseCardDealer.displayPot.value,
            potIncrementAmount
          )
        )),
          (this._model.CurrentTable.houseCardDealer.displayPot.value +=
            potIncrementAmount),
          (this._model.CurrentTable.houseCardDealer.displayPot.value >=
            currentTotalPot &&
            ((this._model.CurrentTable.houseCardDealer.displayPot
              .prevStableValue = void 0),
              (this._model.CurrentTable.houseCardDealer.displayPot.value =
                currentTotalPot)));
      }
      (this._model.CurrentTable.houseCardDealer.displayPot.stableValue =
        currentTotalPot),
        this._updateOpponents(deltaTime),
        this.updateDealerButton(this._model.CurrentTable.currentDealer);
    }
  }

  // Update the player and opponents
  _updateOpponents(deltaTime) {
    this._updatePlayer(this._model.CurrentTable.playerObj, deltaTime);
    for (let i = 0; i < this._gameplayModel.CurrentTable.opponentList.length; ++i) {
      this._updateOpponent(
        this._gameplayModel.CurrentTable.opponentList[i],
        deltaTime
      );
    }
  }

  // Update an opponent avatar
  _updateOpponent(opponent, deltaTime) {
    if (opponent.logicController) {
      opponent.logicController.update(deltaTime, this._gameplayModel, this._gameplayModel.CurrentTable.getDealerBasedPlayerIndex());
    }
  }

  // Update the dealer button's position
  updateDealerButton(newDealerIndex) {
    if (this._activeDealerIndex !== newDealerIndex) {
      this._activeDealerIndex = newDealerIndex;
      for (let i = 0; i < this._gameplayModel.CurrentTable.opponentList.length; ++i) {
        this._gameplayModel.CurrentTable.opponentList[i].isDealer = true;
      }
      (this._gameplayModel.CurrentTable.playerObj.isDealer = true),
        (this._model.dealerButtonDest = this._activeDealerIndex),
        (this._model.CurrentTable.getPlayer(this._activeDealerIndex).isDealer =
          true),
        this._soundManager.play(
          SoundConstants.CHIP_DEALER_BUTTON_MOVE,
          0,
          SoundConstants.DEALER_BUTTON_VOLUME
        );
    }
  }

  // Clear UI clicks
  clearUiClicks() {
    this._currentGameplayMachine.postMessageToActiveState("", "");
  }

  // Handle fold button click
  onFoldClick() {
    this._currentGameplayMachine.postMessageToActiveState(
      "ButtonClick",
      "FOLD"
    );
  }

  // Handle call button click
  onCallClick() {
    this._currentGameplayMachine.postMessageToActiveState(
      "ButtonClick",
      "CALL"
    );
  }

  // Handle check button click
  onCheckClick() {
    this._currentGameplayMachine.postMessageToActiveState(
      "ButtonClick",
      "CHECK"
    );
  }

  // Handle bet increase button click
  onBetIncreaseClick() {
    this._currentGameplayMachine.postMessageToActiveState(
      "ButtonClick",
      "BET_INCREASE"
    );
  }

  // Handle bet decrease button click
  onBetDecreaseClick() {
    this._currentGameplayMachine.postMessageToActiveState(
      "ButtonClick",
      "BET_DECREASE"
    );
  }

  // Handle all-in button click
  onAllInClick() {
    this._currentGameplayMachine.postMessageToActiveState(
      "ButtonClick",
      "ALL_IN"
    );
  }

  // Handle continue button click
  onContinueClick() {
    this._currentGameplayMachine.postMessageToActiveState(
      "ButtonClick",
      "CONTINUE"
    );
  }

  // Handle cash out button click
  onCashOutClick() {
    this._currentGameplayMachine.postMessageToActiveState(
      "ButtonClick",
      "CASH_OUT"
    );
  }

  // Handle player update
  _updatePlayer(player, deltaTime) {
    if (player.logicController) {
      player.logicController.update(deltaTime, this._gameplayModel, this._gameplayModel.CurrentTable.getDealerBasedPlayerIndex());
    }
  }

  // Exit the game
  exitGame() {
    this.endGame();
  }

  // Get the current state ID
  getCurrentState() {
    return this._currentGameplayMachine.getActiveStateId();
  }
}
