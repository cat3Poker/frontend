import AnimateViewBase from "./AnimateViewBase.js";

// Game card back view
class GameCardBackView extends AnimateViewBase {
  constructor(options, gameplayLogic) {
    super("GameCardBackView");
    this.options = options;
    this.gameLogic = gameplayLogic;
    this.firstResize = false;
    this.gameScale = 1;
    this.gameWidth = 1;
    this.gameHeight = 1;
    this.verticalScale = 1;
  }

  // Get the view configuration
  getConfiguration() {
    return {};
  }

  // Initialize the view
  onInitialize() {
    this.autoReset = true;
  }

  // Unused methods
  onDestroy() { }
  onStart() { }
}
