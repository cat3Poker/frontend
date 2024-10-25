import AnimateViewBase from "./AnimateViewBase.js";

// Registration view
class RegistrationView extends AnimateViewBase {
  constructor(options) {
    super("RegistrationView");
    this.options = options;
    this._loginProposed = true;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      childViews: {
        playerButton: {
          movieClipName: "PlayerButtonInstance",
          view: AnimateButtonView,
          options: {
            onClick: () => {
              _this._options.onClickLogin();
              _this._loginProposed = false;
            }
          }
        },
        playername: {
          movieClipName: "playerName.text",
          view: TextView
        },
        playerIcon: {
          movieClipName: "playerIconInstance",
          view: MovieClipView
        },
        registrationTitle: {
          movieClipName: "RegistrationTitle",
          view: MovieClipView
        }
      },
      modelWatch: {
        "currentPortrait.faceImage": currentPortraitFaceImage => {
          if (0 === currentPortraitFaceImage.indexOf("assets/") &&
            _this._loginProposed) {
            _this.setAvatar(currentPortraitFaceImage);
          }
        },
        "name.value": nameValue => {
          if ("" !== nameValue && _this._loginProposed) {
            _this.updatePlayerName(nameValue);
          }
        },
        isAuthorized: isAuthorized => {
          _this._updateLoginButtonVisibility(!isAuthorized);
          if (_this._loginProposed && _this.gameplayModel.isAuthorized) {
            _this.gameplayModel.gameAnalytics.signInPopUp(
              "Success",
              _this.gameplayModel.timePlayed.toString()
            );
          }
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    this.injector
      .get(ScreenFaderModel)
      .visible = true;
    if (this.$model.isAuthorized) {
      if ("" !== this.$model.name.value) {
        this.updatePlayerName(this.$model.name.value);
      }
      if (0 === this.$model.currentPortrait.faceImage.indexOf("assets/")) {
        this.setAvatar(this.$model.currentPortrait.faceImage);
      }
    }
    this._updateLoginButtonVisibility(!this.$model.isAuthorized);
  }

  // Update the player's name display
  updatePlayerName(name) {
    this.$childViews.get("playerName").visible = true;
    let truncatedName = "PLACEHOLDER" === name
      ? "PLACEHOLDER"
      : name.length > 6
        ? name.substring(0, 6) + "..."
        : name;
    this.$childViews.get("playerName").setText(truncatedName);
    this.$childViews.get("playerName").x +=
      0.1 * this.$childViews.get("playerName").width;
    this.$childViews.get("playerName").y +=
      0.1 * this.$childViews.get("playerName").height;
    this.$childViews.get("playerName").scaleX = 0.9;
    this.$childViews.get("playerName").scaleY = 0.9;
  }

  // Set the avatar image
  setAvatar(avatarImage) {
    try {
      let avatarTexture = PIXI.Texture.from(avatarImage);
      let avatarSprite = new PIXI.Sprite(avatarTexture);
      avatarSprite.anchor.set(0.5, 0.5);
      avatarSprite.scale.set(0.875, 0.875);
      let playerIconView = this.$childViews.get("playerIcon");
      playerIconView.display.addChild(avatarSprite);
      playerIconView.gotoAndStop("show_icon");
    } catch (error) {
      console.log("Error setting avatar image:", error);
    }
  }

  // Update the login button's visibility
  _updateLoginButtonVisibility(showButton) {
    this.$childViews.get("playerButton").visible = showButton;
    this.$childViews.get("playerName").visible = showButton;
    this.$childViews.get("playerName").visible = !showButton;
    let playerIconView = this.$childViews.get("playerIcon");
    if (playerIconView.display.children.length > 0 && showButton) {
      playerIconView.display.removeChildren();
      playerIconView.gotoAndStop("hide_icon");
    }
  }

  // Unused methods
  onSetLandscape() { }
  onStart() { }
}
