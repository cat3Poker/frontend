import AnimateViewBase from "./AnimateViewBase.js";
import { MessageView } from "./MessageView.js";
import { UiButtonView } from "./UiButtonView.js";

// View for displaying the UI buttons
class GameButtonsView extends AnimateViewBase {
  constructor(options) {
    super("GameButtonsView");
    this._options = options;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      childViews: {
        CheckButtonObj: {
          movieClipName: "CheckButtonInstance",
          view: UiButtonView,
          model: this.$model.Button_Check,
          options: {
            textKey: "buttonPoker.check",
            onClick: () => {
              _this.gameLogic.onCheckClick();
            }
          }
        },
        AllInButtonObj: {
          movieClipName: "AllInButtonInstance",
          view: UiButtonView,
          model: this.$model.Button_AllIn,
          options: {
            textKey: "buttonPoker.allIn",
            onClick: () => {
              _this.gameLogic.onAllInClick();
            }
          }
        },
        RaiseButtonObj: {
          movieClipName: "RaiseButtonObj",
          view: UiButtonWithSubtextView,
          model: this.$model.Button_Raise,
          options: {
            mainTextKey: "buttonPoker.raise",
            onClick: () => {
              _this.gameLogic.onRaiseClick();
            }
          }
        },
        BetIncreaseButtonInstance: {
          movieClipName: "BetIncreaseButtonInstance",
          view: UiButtonViewImageOnly,
          model: this.$model.Button_BetIncrease,
          options: {
            canBeHeldForRepeatedAction: false,
            onClick: () => {
              _this.gameLogic.onBetIncreaseClick();
            },
            showPopupOnMouseOver: true,
            mouseOverPopupModel: this.$model.IncreaseBetTipPopup
          }
        },
        BetDecreaseButtonInstance: {
          movieClipName: "BetDecreaseButtonInstance",
          view: UiButtonViewImageOnly,
          model: this.$model.Button_BetDecrease,
          options: {
            canBeHeldForRepeatedAction: false,
            onClick: () => {
              _this.gameLogic.onBetDecreaseClick();
            },
            showPopupOnMouseOver: true,
            mouseOverPopupModel: this.$model.DecreaseBetTipPopup
          }
        },
        CallButtonObj: {
          movieClipName: "CallButtonInstance",
          view: UiButtonWithSubtextView,
          model: this.$model.Button_Call,
          options: {
            mainTextKey: "buttonPoker.call",
            onClick: () => {
              _this.gameLogic.onCallClick();
            }
          }
        },
        FoldButtonObj: {
          movieClipName: "FoldButtonInstance",
          view: UiButtonView,
          model: this.$model.Button_Fold,
          options: {
            textKey: "buttonPoker.fold",
            onClick: () => {
              _this.gameLogic.onFoldClick();
            }
          }
        },
        ContinueButtonObj: {
          movieClipName: "ContinueButtonInstance",
          view: UiButtonView,
          model: this.$model.Button_Continue,
          options: {
            textKey: "buttonPoker.continue",
            onClick: () => {
              _this.gameLogic.onContinueClick();
            }
          }
        },
        CashOutButtonObj: {
          movieClipName: "CashOutButtonInstance",
          view: UiButtonView,
          model: this.$model.Button_CashOut,
          options: {
            textKey: "buttonPoker.cashOut",
            onClick: () => {
              _this.gameLogic.onCashOutClick();
            }
          }
        },
        IncreaseBetTipPopup: {
          movieClipName: "IncreaseBetTipPopupInstance",
          view: MessageView,
          model: this.$model.IncreaseBetTipPopup
        },
        DecreaseBetTipPopup: {
          movieClipName: "DecreaseBetTipPopupInstance",
          view: MessageView,
          model: this.$model.DecreaseBetTipPopup
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    this.$model.IncreaseBetTipPopup.value = "ui.increaseBetTip";
    this.$model.DecreaseBetTipPopup.value = "ui.decreaseBetTip";
    this.$model.IncreaseBetTipPopup.textVisible = true;
    this.$model.DecreaseBetTipPopup.textVisible = true;
  }

  // Handle landscape orientation change
  onSetLandscape() {
    this._resizeGame();
  }

  // Handle portrait orientation change
  onSetPortrait() {
    this._resizeGame();
  }

  // Resize the game UI
  _resizeGame() {
    if (this.firstResize) {
      this.firstResize = true;
      this.onResize(this.gameWidth, this.gameHeight, this.gameScale);
    }
  }

  // Handle resize event
  onResize(gameWidth, gameHeight, gameScale) {
    super.onResize(gameWidth, gameHeight, gameScale);
    this.gameScale = gameScale;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    let aspectRatioWidth = gameWidth / gameScale;
    let aspectRatioHeight = gameHeight / gameScale;
    this.x = 0;
    gameWidth > gameHeight
      ? (this.scaleX = this.scaleY = 1)
      : (this.scaleX = this.scaleY =
        this.scaleToAspectRatio(aspectRatioWidth, aspectRatioHeight, 590, 100) *
        0.95);
  }
}
