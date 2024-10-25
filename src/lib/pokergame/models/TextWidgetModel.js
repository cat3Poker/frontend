// Text widget model for displaying text
export default class TextWidgetModel {
  constructor() {
    this.visible = true;
    this.isDisabled = true;
    this.mainText = new TextWidgetValueModel();
    this.subText = new TextWidgetValueModel();
  }
}

// Text widget value model
class TextWidgetValueModel {
  constructor() {
    this.value = "";
    this.isVisible = false;
  }

  // Get the localized text value
  getLocalizedValue(localizationManager) {
    let localizedText = localizationManager.getText(this.value);
    return localizedText ? localizedText : this.value;
  }
}

// Text view for displaying game text
class TextView extends AnimateViewBase {
  constructor(options, localizationManager) {
    super("TextView");
    this.options = options;
    this.localizationManager = localizationManager;
    this._currentKey = "";
    this._currentString = "";
    this.maxSize = 100;
  }

  // Get the view configuration
  getConfiguration() {
    return {};
  }

  // Initialize the view
  onInitialize() {
    this.framerate = 60;
    if (this.text) {
      this.setText(this.options.text);
    }
  }

  // Destroy the view
  onDestroy() {
    this.options.text = this._currentString;
    this.maxSize > 0 && TextUtil.fitText(this.text, this.maxSize);
  }

  // Set the text content
  setText(text) {
    this._updateLocalizeText(text);
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
    try {
      this.text.text = this._currentString.replace(newlineRegex, "\n");
    } catch (error) { }
    return true;
  }
}