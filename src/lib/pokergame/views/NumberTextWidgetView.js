import AnimateViewBase from "./AnimateViewBase.js";

// Number text widget view

export class NumberTextWidgetView extends AnimateViewBase {
  constructor(options, localizationManager) {
    super("NumberTextWidgetView");
    this.options = options;
    this._localizationHandler = localizationManager;
    this._currentKey = "";
    this._currentString = "";
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      modelWatch: {
        value: valueModel => {
          _this.setText(valueModel.toString());
          _this.visible = +valueModel > 0;
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    if (this.text) {
      this._updateLocalizeText(this.$model.value);
      this.visible = +this.$model.value > 0;
    }
  }

  // Refresh the displayed text
  refreshString() {
    this.text.text = this._currentString;
  }

  // Set the text content
  setText(text) {
    if (this.text) {
      (this._currentString = (+text).toLocaleString(
        this._localizationHandler.supportedLanguages.defaultLanguage
      )),
        this.refreshString();
    }
  }
}
