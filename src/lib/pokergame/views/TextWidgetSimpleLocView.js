import AnimateViewBase from "./AnimateViewBase.js";
export default class TextWidgetSimpleLocView extends AnimateViewBase {
  constructor(options, localizationManager) {
    super("TextWidgetSimpleLocView");
    this._options = options;
    this.localizationManager = localizationManager;
    this._currentKey = "";
    this._currentString = "";
  }

  // Get the view configuration
  getConfiguration() {
    return {};
  }

  // Initialize the view
  onInitialize() {
    if (this.text) {
      this._updateLocalizeText(this.text.text);
    }
  }

  // Refresh the displayed text
  refreshString() {
    this.text.text = this._currentString;
  }

  // Update the localized text
  _updateLocalizeText(text) {
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
    return true;
  }
}