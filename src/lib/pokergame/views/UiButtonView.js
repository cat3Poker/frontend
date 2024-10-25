import AnimateViewBase from "./AnimateViewBase.js";

// Game button view
export class UiButtonView extends AnimateViewBase {
  constructor(options) {
    super("UiButtonView");
    this.options = options;
    this._mainText = null;
    this._isDown = true;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    let textOptions = {
      text: this.options.text || this.localizationManager.getText(this.options.textKey),
      fitText: false
    };
    if (this.options.fontSize && "" !== this.options.fontSize) {
      textOptions = Object.assign(Object.assign({}, textOptions), {
        defaultStyle: {
          fontSize: this.options.fontSize
        }
      });
    }
    return {
      onPointerOut: () => {
        if (!_this.$model.isDisabled && _this._isDown) {
          _this.display.children[0].tint = 0xffffffff;
        }
      },
      onPointerOver: () => {
        if (!_this.$model.isDisabled && _this._isDown) {
          _this.display.children[0].tint = 0xff808080;
        }
      },
      onPointerDown: () => {
        if (!_this.$model.isDisabled) {
          _this._isDown = false;
          _this.display.children[0].tint = 0xff808080;
        }
      },
      onPointerUpOutside: () => {
        if (!_this.$model.isDisabled) {
          if (_this._isDown) {
            _this.display.children[0].tint = 0xffffffff;
          }
          _this._isDown = true;
        }
      },
      onPointerUp: () => {
        if (!_this.$model.isDisabled && _this._isDown) {
          _this._isDown = true;
          _this.display.children[0].tint = 0xffffffff;
          _this.options.onClick();
        }
      },
      modelWatch: {
        visible: visible => {
          _this.visible = visible;
        },
        isDisabled: isDisabled => {
          isDisabled && (_this._isDown = true);
          _this._fixDisabledColours();
        }
      },
      childViews: {
        MainTextField: {
          movieClipName: "MainTextInstance",
          view: CoreUI.Views.LabelView,
          options: CoreUI.build(CoreUIType.Label, textOptions)
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    this.interactive = true;
    this.fader = this.injector.get(ScreenFaderModel);
    this.visible = this.$model.visible;
    this._fixDisabledColours();
  }

  // Update button color based on disabled state
  _fixDisabledColours() {
    this.display.children[0].tint = this.$model.isDisabled
      ? 0xff404040
      : 0xffffffff;
    if (this.fader) {
      this.fader.alpha = this.$model.isDisabled ? 0.5 : 1;
    }
  }
}
