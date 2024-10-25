// Game options model
export default class GameOptionsModel {
  constructor() {
    this.soundOn = true;
    this.musicOn = true;
    this.exitGameRequested = true;
    this.helpMenuRequested = true;
    this.logoVisible = false;
    this.currentGameSpeed = 1;
    this.loadingAnimationData = null;
  }
}

// Text widget view for displaying localized text
class TextWidgetFixedTitleView extends AnimateViewBase {
  constructor(options, localizationManager) {
    super("TextWidgetFixedTitleView");
    this.options = options;
    this.localizationManager = localizationManager;
    this._currentKey = "";
    this._currentString = "";
  }

  // Get the view configuration
  getConfiguration() {
    return {
      modelWatch: {
        value: valueModel => {
          this.setText(valueModel.getLocalizedValue(this.localizationManager));
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    if (this.text) {
      this.setText(this.options.text) ||
        this.setText(this.$model.getLocalizedValue(this.localizationManager));
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
    if (!isNaN(Number(text))) {
      this._currentString = (+text).toLocaleString(
        this.localizationManager.supportedLanguages.defaultLanguage
      );
      this._currentString = this._currentString.replace(newlineRegex, "\n");
      this.refreshString();
      return false;
    }
    let localizedText = this.localizationManager.getText(text);
    if (this._currentKey = text, localizedText && localizedText !== this._currentString && "" !== localizedText) {
      this._currentString = localizedText;
      this._currentString = this._currentString.replace(newlineRegex, "\n");
      this.refreshString();
      return false;
    }
    this.text.text = this._currentString.replace(newlineRegex, "\n");
    this.scaleX = Math.min(1, 320 / (this.scaleX * this.text.width));
    this.scaleX > 1 && (this.scaleX = 1);
    return true;
  }
}