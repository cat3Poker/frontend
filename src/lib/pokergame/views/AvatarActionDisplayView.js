import AnimateViewBase from "./AnimateViewBase.js";

// Avatar action display view
class AvatarActionDisplayView extends AnimateViewBase {
  constructor(options, gameplayLogic) {
    super("AvatarActionDisplayView");
    this.options = options;
    this._gameplayData = gameplayLogic;
    this._fadeVelocity = 0;
    this._homeY = 0;
    this._actionId = -1;
    this._currentTime = 0;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      childViews: {
        ActionText: {
          movieClipName: "ActionText",
          view: TextWidgetView,
          model: this.$model.actionTaken
        }
      },
      modelWatch: {
        actionId: actionId => {
          _this._homeY = 0;
          _this._updateActionDisplay(actionId);
        }
      }
    };
  }

  // Update the view's position and alpha based on animation state
  onUpdate(deltaTime) {
    if (this.$model.actionTaken.isFading) {
      this._currentBounceTime += 3.5 * deltaTime;
      if (this._currentBounceTime >= 1) {
        this._currentBounceTime = 1;
      }
      this.y = this._homeY - 12 * Math.sin(Math.PI * this._homeY);
      this.alpha += this._fadeVelocity * deltaTime * 5;
      if (this.alpha >= 1) {
        this.alpha = 1;
      } else if (this.alpha <= 0) {
        this.alpha = 0;
      }
      this.visible = this.alpha > 0;
    }
  }

  // Initialize the view
  onInitialize() {
    this.alpha = 0;
    this.visible = true;
    this._homeY = this.y;
    let actionId = this.$model.actionId;
    this.$model.actionId = null;
    this.$model.actionId = actionId;
    let actionTaken = this.$model.actionTaken;
    this.$model.actionTaken = null;
    this.$model.actionTaken = actionTaken;
  }

  // Destroy the view
  onDestroy() { }

  // Start the view
  onStart() { }

  // Update the action display based on action ID
  _updateActionDisplay(actionId) {
    switch ((this._actionId = 2.5, actionId)) {
      case 1:
      case 0:
        this.gotoAndStop(3);
        this.visible = this.$model.actionTaken.isFading;
        this.$model.actionTaken.value = this.localizationManager.getText(
          0 === actionId ? "pokerAction.Check" : "pokerAction.Call"
        );
        break;
      case 3:
        this.gotoAndStop(1);
        this.visible = this.$model.actionTaken.isFading;
        this.$model.actionTaken.value = this.localizationManager.getText(
          0 === this.gameplayData.CurrentTable.houseCardDealer.currentBet
            ? "pokerAction.Bet"
            : "pokerAction.Raise"
        );
        break;
      case 2:
        this.gotoAndStop(0);
        this.visible = this.$model.actionTaken.isFading;
        this.$model.actionTaken.value = this.localizationManager.getText(
          "pokerAction.Fold"
        );
        break;
      case 4:
        this.gotoAndStop(2);
        this.visible = this.$model.actionTaken.isFading;
        this.$model.actionTaken.value = this.localizationManager.getText(
          "pokerAction.AllIn"
        );
        break;
      default:
        this._homeY = 1;
        this._actionId = -1;
    }
    this._fadeVelocity = 0;
  }
}
