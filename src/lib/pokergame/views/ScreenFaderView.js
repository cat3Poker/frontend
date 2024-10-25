// Screen fader view
export default class ScreenFaderView extends AnimateViewBase {
  constructor(options) {
    super("ScreenFaderView");
    this.options = options;
    this._alpha = 0;
    this.gameScale = 1;
    this.gameWidth = 1;
    this.gameHeight = 1;
    this.firstResize = false;
  }

  // Get the view configuration
  getConfiguration() {
    return {
      childViews: {}
    };
  }

  // Update the fader's alpha value
  updateFader(deltaTime) {
    if (deltaTime > 0.33) return;
    this._alpha += deltaTime * this.$model.fadeSpeed;
    if (this.alpha <= 0) {
      this._alpha = 0;
    } else if (this._alpha >= 1) {
      this.alpha = 1;
    }
    this.$model.isFullyVisible = this.alpha >= 1;
    this.$model.isFullyHidden = this._alpha <= 0;
    this.$model.isVisible = !(
      this.$model.isFullyHidden || this.$model.isFullyVisible
    );
    this.visible = !this.$model.isFullyHidden;
  }

  // Initialize the fader
  onInitialize() {
    this._alpha = 1;
    this._setColour(this.$model.colour);
    this.interactive = true;
  }

  // Handle landscape orientation change
  onSetLandscape() {
    this._resizeFader();
  }

  // Handle portrait orientation change
  onSetPortrait() {
    this._resizeFader();
  }

  // Resize the fader
  _resizeFader() {
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
    this.y = -aspectRatioHeight / 2;
    this.x = -aspectRatioWidth / 2;
    let scaleWidth = 1.1 * aspectRatioWidth;
    let scaleHeight = 1.1 * aspectRatioHeight;
    this.scaleX = scaleWidth / (this.width / this.scaleX);
    this.scaleY = scaleHeight / (this.height / this.scaleY);
  }

  // Set the fader colour
  setColour(colour) {
    try {
      this.display.children[0].children[0].tint = colour;
    } catch (error) {
      try {
        this.display.children[0].tint = colour;
      } catch (error) { }
    }
  }
}