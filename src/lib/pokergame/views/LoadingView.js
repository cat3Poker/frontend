import AnimateViewBase from "./AnimateViewBase.js";

// Loading animation view
export class LoadingView extends AnimateViewBase {
  constructor(options, localizationManager) {
    super("LoadingView");
    this.options = options;
    this.localizationManager = localizationManager;
    this.numberOfDots = 0;
    this.firstResize = true;
    this.gameScale = 1;
    this.gameWidth = 1;
    this.gameHeight = 1;
  }

  // Get the view configuration
  getConfiguration() {
    return {
      childViews: {
        LoadingText: {
          movieClipName: "LoadingText",
          view: TextWidgetView,
          model: this.$model.loadingText
        }
      }
    };
  }

  // Initialize the view
  onInitialize() { }

  // Update the loading animation
  onUpdate(deltaTime) {
    if (!(deltaTime > 0.33)) {
      let alphaChangeSpeed = 4;
      if (!this.$model.loadingVisible) {
        alphaChangeSpeed = -alphaChangeSpeed;
      }
      this.alpha += deltaTime * alphaChangeSpeed;
      if (this.alpha <= 0) {
        this.alpha = 0;
      } else if (this.alpha >= 1) {
        this.alpha = 1;
      }
      this.visible = this.alpha > 0;
      this.numberOfDots += 4 * deltaTime;
      if (this.numberOfDots > 3) {
        this.numberOfDots -= 3;
      }
      let loadingText = this.localizationManager.getText("loading");
      for (let dotIndex = 0; dotIndex < this.numberOfDots; ++dotIndex) {
        loadingText += ".";
      }
      this.$model.loadingText.value = loadingText;
    }
  }

  // Handle landscape orientation change
  onSetLandscape() {
    if (this.firstResize) {
      this.firstResize = true;
      this.onResize(this.gameWidth, this.gameHeight, this.gameScale);
    }
  }

  // Handle portrait orientation change
  onSetPortrait() {
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
    let aspectRatioWidth = this.gameWidth / this.gameScale;
    let aspectRatioHeight = this.gameHeight / this.gameScale;
    this.x = 0.65 * aspectRatioWidth / 2;
    this.y = 0.85 * aspectRatioHeight / 2;
  }
}
