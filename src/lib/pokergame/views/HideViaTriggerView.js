import AnimateViewBase from "./AnimateViewBase.js";

// View that hides based on a trigger
class HideViaTriggerView extends AnimateViewBase {
  constructor(options) {
    super("HideViaTriggerView");
    this.options = options;
  }

  // Get the view configuration
  getConfiguration() {
    return {};
  }

  // Initialize the view
  onInitialize() {
    this.visible = this.options.isVisible;
  }
}
