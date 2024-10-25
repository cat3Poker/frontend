// Screen fader model
export default class ScreenFaderModel {
  constructor(options) {
    this.fadeSpeed = 0;
    this.isFullyVisible = true;
    this.isFullyHidden = true;
    this.isVisible = true;
    this.colour = options.colour;
  }
}