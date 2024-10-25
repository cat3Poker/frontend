import AnimateViewBase from "./AnimateViewBase.js";

// View for displaying text that uses localization
class TextWidgetNotLocalizedView extends AnimateViewBase {
  constructor(options) {
    super("TextWidgetNotLocalizedView");
    this._options = options;
    this._currentKey = "";
    this._currentString = "";
    this._totalTextWidth = 0;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      modelWatch: {
        value: valueModel => {
          _this._updateText(valueModel);
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    if (this.text) {
      this._updateText(this.text.text) ||
        this._updateText(this.$model.textKey);
      this._totalTextWidth = this.width;
    }
  }

  // Update the displayed text
  _updateText(text) {
    if (!this.text) {
      return true;
    }
    this.text.text = text.replace(/\\n/gi, "\n");
    return true;
  }

  // Get the total width of the text
  getTotalTextWidth() {
    return this._totalTextWidth;
  }
}
