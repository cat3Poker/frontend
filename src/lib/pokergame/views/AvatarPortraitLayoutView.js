import AnimateViewBase from "./AnimateViewBase.js";

// Avatar portrait layout view
class AvatarPortraitLayoutView extends AnimateViewBase {
  constructor(options, gameAnalytics) {
    super("AvatarPortraitLayoutView");
    this.options = options;
    this.gameAnalytics = gameAnalytics;
    this._faceImage = null;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      modelWatch: {
        faceImage: faceImage => {
          if (0 === faceImage.indexOf("assets/")) {
            _this._loadFace();
          }
        },
        expressionIndex: () => { },
        visible: visible => {
          _this.visible = visible;
        },
        fading: fading => {
          if ("" !== _this.$model.faceImage) {
            !fading &&
              !_this.visible &&
              (_this.visible = true);
          }
        }
      }
    };
  }

  // Update alpha value based on fading state
  onUpdate(deltaTime) {
    if (this.$model.fading && this.alpha > 0) {
      this.alpha -= 0.05;
    }
    if (!this.$model.fading && this.alpha < 1) {
      this.alpha += 0.05;
    }
  }

  // Load the avatar's face image
  _loadFace() {
    if ("" !== this.$model.faceImage) {
      let previousWidth = this.width;
      let imageUrl = this.gameAnalytics.absoluteURL(
        "assets/images/" + this.$model.faceImage
      );
      let texture = null;
      try {
        texture = PIXI.Texture.from(imageUrl);
      } catch (error) {
        return;
      }
      try {
        this.display.children[0].texture = texture;
      } catch (error) { }
      if (this.width !== previousWidth) {
        this.display.children[0].x += (previousWidth - this.width) / 2;
      }
    }
  }

  // Initialize the view
  onInitialize() {
    if ("" !== this.$model.faceImage && this.$model.visible) {
      this.visible = true;
    }
    this._loadFace();
  }

  // Destroy the view
  onDestroy() { }

  // Handle portrait orientation change
  onSetPortrait() { }
}
