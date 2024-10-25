import AnimateViewBase from "./AnimateViewBase.js";

// View for a button with subtext

export class UiButtonWithSubtextView extends AnimateViewBase {
  constructor(options) {
    super("UiButtonWithSubtextView");
    this.options = options;
    this._fader = null;
    this._subText = null;
    this._isDown = true;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      onPointerOut: function () {
        if (!_this.$model.isDisabled && _this._isDown) {
          _this.display.children[0].tint = 0xffffffff;
        }
      },
      onPointerOver: function () {
        if (!_this.$model.isDisabled && _this._isDown) {
          _this.display.children[0].tint = 0xff808080;
        }
      },
      onPointerDown: function () {
        if (!_this.$model.isDisabled) {
          _this._isDown = false;
          _this.display.children[0].tint = 0xff808080;
        }
      },
      onPointerUpOutside: function () {
        if (!_this.$model.isDisabled) {
          if (_this._isDown) {
            _this.display.children[0].tint = 0xffffffff;
          }
          _this._isDown = true;
        }
      },
      onPointerUp: function () {
        if (!_this.$model.isDisabled && _this._isDown) {
          (_this._isDown = true),
            (_this.display.children[0].tint = 0xffffffff),
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
        DynmicTextField: {
          movieClipName: "SubTextInstance",
          view: TextWidgetView,
          model: this.$model.subText
        },
        MainTextField: {
          movieClipName: "MainTextInstance",
          view: CoreUI.Views.LabelView,
          options: CoreUI.build(CoreUIType.Label, {
            text: this.options.mainText ||
              this.localizationManager.getText(this.options.mainTextKey),
            fitText: true
          })
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    this._fader = this.injector.get(ScreenFaderModel);
    this._subText = this.$childViews.get("DynmicTextField");
    this.autoReset = true;
    this.visible = this.$model.visible;
    this._fixDisabledColours();
  }

  // Update the button's color based on its disabled state
  _fixDisabledColours() {
    this.display.children[0].tint = this.$model.isDisabled
      ? 0xff404040
      : 0xffffffff;
    if (this._fader) {
      this._fader.alpha = this.$model.isDisabled ? 0.5 : 1;
    }
    if (this._subText) {
      this._subText.alpha = this.$model.isDisabled ? 0.5 : 1;
    }
  }
}
