import AnimateViewBase from "./AnimateViewBase.js";

// Movie clip view
export default class MovieClipView extends AnimateViewBase {
  constructor(options) {
    super("MovieClipView");
    this.options = options;
  }

  // Get the view configuration
  getConfiguration() {
    return {};
  }

  // Initialize the view
  onInitialize() {
    this.framerate = 60;
  }

  // Set the MovieClip's framerate
  setFramerate(framerate) {
    this.display.animationSpeed = framerate;
  }
}
