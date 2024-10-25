import AnimateViewBase from "./AnimateViewBase.js";

// Intro screen layout view
class IntroScreenLayoutView extends AnimateViewBase {
  constructor(options, frontendLogic) {
    super("IntroScreenLayoutView");
    this.options = options;
    this._frontendLogic = frontendLogic;
    this.firstResize = true;
    this.gameScale = 1;
    this.gameWidth = 1;
    this.gameHeight = 1;
    this._resumeRequested = true;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      childViews: {
        PlayGameButtonObj: {
          movieClipName: "PlayGameButtonInstance",
          view: UiButtonView,
          model: this.$model.playButton,
          options: {
            textKey: "button.play",
            onClick: () => {
              if (!_this.$model.loadingAnimationData.screenFadeInfo.isFullyHidden) {
                _this._resumeRequested = true;
                _this.$model.loadingAnimationData.screenFadeInfo.fadeSpeed = 2;
                _this.$model.setupNewGame();
              }
            }
          }
        },
        ContinueButtonObj: {
          movieClipName: "ContinueButtonInstance",
          view: UiButtonView,
          model: this.$model.continueButton,
          options: {
            textKey: "button.resume",
            onClick: () => {
              if (!_this.$model.loadingAnimationData.screenFadeInfo.isFullyHidden) {
                _this._resumeRequested = false;
                _this.$model.loadingAnimationData.screenFadeInfo.fadeSpeed = 2;
              }
            }
          }
        },
        NewGameButtonObj: {
          movieClipName: "NewGameButtonInstance",
          view: UiButtonView,
          model: this.$model.newGameButton,
          options: {
            textKey: "button.newGame",
            onClick: () => {
              if (!_this.$model.loadingAnimationData.screenFadeInfo.isFullyHidden) {
                _this._resumeRequested = true;
                _this.$model.loadingAnimationData.screenFadeInfo.fadeSpeed = 3;
                _this.$model.setupNewGame();
              }
            }
          }
        },
        ArkadiumLogoObj: {
          movieClipName: "GameLogo2",
          view: HideViaTriggerView,
          model: this.$model,
          options: {
            isVisible: this.$model.logoVisible
          }
        }
      }
    };
  }

  // Update the game state based on the loading animation progress
  onUpdate(deltaTime) {
    if (this.$model.loadingAnimationData.screenFadeInfo.isFullyHidden &&
      this.$model.loadingAnimationData.screenFadeInfo.fadeSpeed > 0) {
      this.$model.continueGameRequested = this._resumeRequested;
      this.$model.newGameRequested = !this._resumeRequested;
    }
  }

  // Initialize the view
  onInitialize() {
    this.$model.loadingAnimationData.isVisible = true;
    this.$model.loadingAnimationData.screenFadeInfo.fadeSpeed = -3;
  }

  // Handle landscape orientation change
  onSetLandscape() {
    this._resizeGame();
  }

  // Handle portrait orientation change
  onSetPortrait() {
    this._resizeGame();
  }

  // Resize the game for different screen orientations
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
    this.gameWidth = 0.75 * gameWidth;
    this.gameHeight = 0.85 * gameHeight;
  }
}
