import AnimateViewBase from "./AnimateViewBase.js";
import { AvatarAvalibilityIDs } from "./DummyObjView.js";

// Avatar layout view

export class AvatarLayoutView extends AnimateViewBase {
  constructor(options, gameplayLogic) {
    super("AvatarLayoutView");
    this.options = options;
    this._gameLogic = gameplayLogic;
    this._fader = null;
    this.firstResize = false;
    this.gameScale = 1;
    this.gameWidth = 1;
    this.gameHeight = 1;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      childViews: {
        PortraitImages: {
          movieClipName: "PortraitImagesInstance",
          view: AvatarPortraitView,
          model: this.$model.currentPortrait,
          options: {}
        },
        PlayerActionDisplay: {
          movieClipName: "PlayerActionDisplayInstance",
          view: AvatarActionDisplayView,
          model: this.$model,
          options: {}
        },
        Balance: {
          movieClipName: "BalanceTextInstance",
          view: TextWidgetView,
          model: this.$model.moneyPool
        },
        NameText: {
          movieClipName: "NameText",
          view: TextWidgetView,
          model: this.$model.name
        }
      },
      modelWatch: {
        isHighlit: () => {
          _this._updateHighlight();
        },
        availability: () => {
          _this._updateHighlight();
          _this._updateTextColouration();
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    this.interactive = true;
    this._fader = this.$childViews.get("FaderInstance");
    this._updateHighlight();
    this._updateTextColouration();
  }

  // Destroy the view
  onDestroy() { }

  // Handle portrait orientation change
  onSetPortrait() { }

  // Update the highlight state of the avatar
  _updateHighlight() {
    if (this.$model.availability === AvatarAvalibilityIDs.FOLDED) {
      this.gotoAndStop(2);
      if (this.$model.isAuthorized) {
        this.$childViews.get("PortraitImagesInstance").$model.fading = true;
      }
    } else {
      this.$model.isHighlit ? this.gotoAndStop(1) : this.gotoAndStop(0);
    }
  }

  // Update the text color based on avatar availability
  _updateTextColouration() {
    if (this._fader) {
      this._fader.alpha =
        this.$model.availability === AvatarAvalibilityIDs.FOLDED ? 0.4 : 1;
    }
  }
}
