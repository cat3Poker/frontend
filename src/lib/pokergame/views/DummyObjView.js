import AnimateViewBase from "./AnimateViewBase.js";
// Dummy object view
export default 
  class DummyObjView extends AnimateViewBase {
  constructor(options) {
    super("DummyObjView");
    this.options = options;
    this.firstResize = true;
  }

  // Get the view configuration
  getConfiguration() {
    return {};
  }

  // Initialize the view
  onInitialize() {
    this.firstResize = true;
    this._updatePosition();
  }

  // Update the view's position
  onDestroy() {
    this._updatePosition();
  }

  // Update the view's position
  onStart() {
    this._updatePosition();
  }

  // Handle resize event
  onResize(gameWidth, gameHeight, gameScale) {
    this._updatePosition();
  }

  // Update the view's position
  _updatePosition() {
    this.$model.x = this.x;
    this.$model.y = this.y;
    if (this.$model.useParent) {
      this.$model.x += this.parent.x;
      this.$model.y += this.parent.y;
    }
  }
}



