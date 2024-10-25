import AnimateViewBase from "./AnimateViewBase.js";
export default // Text widget view
  class TextWidgetView extends AnimateViewBase {
  constructor(options, localizationManager) {
    super("TextWidgetView");
    this.options = options;
    this._localizationHandler = localizationManager;
    this._currentKey = "";
    this._currentString = "";
  }

  // Get the view configuration
  getConfiguration() {
    return {
      modelWatch: {
        value: valueModel => {
          this.setText(valueModel.getLocalizedValue(this._localizationHandler));
        },
        textVisible: textVisible => {
          this.visible = textVisible;
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    if (this.text && "avatars.nameYou" !== this.$model.textKey) {
      this.setText(this.text.text) ||
        this._updateLocalizeText(this.$model.textKey);
    }
  }

  // Refresh the displayed text
  refreshString() {
    if (this.$model.isVisible) {
      this.visible = this.$model.isVisible;
    }
    this.text.text = this._currentString;
  }

  // Set the text content
  setText(text) {
    const newlineRegex = /\\n/gi;
    if (!this.text) {
      return true;
    }
    if (!isNaN(Number(text)) && "" !== text && " " !== text) {
      this._currentString = (+text).toLocaleString(
        this._localizationHandler.supportedLanguages.defaultLanguage
      );
      this._currentString = this._currentString.replace(newlineRegex, "\n");
      this.refreshString();
      return false;
    }
    let localizedText = this._localizationHandler.getText(text);
    if (
      this._currentKey = text,
      localizedText &&
      localizedText !== this._currentString &&
      "" !== localizedText
    ) {
      this.scaleX = Math.min(
        1,
        this.display.parent.children[0].width / this.text.width * 0.95
      );
      this.scaleX > 1 && (this.scaleX = 1);
      this._currentString = localizedText;
      this._currentString = this._currentString.replace(newlineRegex, "\n");
      this.refreshString();
      return false;
    }
    this.text.text = this._currentString.replace(newlineRegex, "\n");
    return true;
  }
}