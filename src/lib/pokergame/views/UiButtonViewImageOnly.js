import AnimateViewBase from "./AnimateViewBase.js";

// View for a button with only an image

export class UiButtonViewImageOnly extends AnimateViewBase {
  constructor(options) {
    super("UiButtonViewImageOnly");
    this.options = options;
    this._isDown = true;
    this._buttonHeldTimeout = null;
    this._buttonHeldInterval = null;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      onPointerOut: function () {
        if (!_this.$model.isDisabled) {
          if (_this.options.showPopupOnMouseOver) {
            _this.options.mouseOverPopupModel.textVisible = true;
          }
          if (_this._isDown) {
            _this.display.children[0].tint = 0xffffffff;
          }
          if (_this.options.canBeHeldForRepeatedAction) {
            _this._clearButtonHeldInterval();
            _this._clearButtonHeldTimeout();
          }
        }
      },
      onPointerOver: function () {
        if (!_this.$model.isDisabled) {
          if (_this.options.showPopupOnMouseOver) {
            _this.options.mouseOverPopupModel.textVisible = false;
          }
          if (_this._isDown) {
            _this.display.children[0].tint = 0xff808080;
          }
        }
      },
      onPointerDown: function () {
        if (!_this.$model.isDisabled) {
          if (_this.options.canBeHeldForRepeatedAction) {
            _this._clearButtonHeldInterval();
            _this._clearButtonHeldTimeout();
            _this._buttonHeldTimeout = setTimeout(function () {
              _this._clearButtonHeldInterval();
              if (_this._isDown) {
                _this._buttonHeldInterval = setInterval(function () {
                  if (_this._isDown) {
                    _this.options.onClick();
                  }
                }, 100);
              }
            }, 500);
          }
          (_this._isDown = false),
            (_this.display.children[0].tint = 0xff808080);
        }
      },
      onPointerUpOutside: function () {
        if (!_this.$model.isDisabled) {
          if (_this._isDown) {
            _this.display.children[0].tint = 0xffffffff;
          }
          (_this._isDown = true),
            _this.options.canBeHeldForRepeatedAction &&
            (_this._clearButtonHeldInterval(),
              _this._clearButtonHeldTimeout());
        }
      },
      onPointerUp: function () {
        if (!_this.$model.isDisabled && _this._isDown) {
          (_this._isDown = true),
            (_this.display.children[0].tint = 0xffffffff);
          if (_this.options.canBeHeldForRepeatedAction) {
            _this._clearButtonHeldTimeout();
            if (this._buttonHeldInterval === void 0) {
              _this.options.onClick();
            } else {
              _this._clearButtonHeldInterval();
            }
          } else {
            _this.options.onClick();
          }
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
      childViews: {}
    };
  }

  // Clear the button held timeout
  _clearButtonHeldTimeout() {
    if (this._buttonHeldTimeout !== void 0) {
      clearTimeout(this._buttonHeldTimeout);
      this._buttonHeldTimeout = void 0;
    }
  }

  // Clear the button held interval
  _clearButtonHeldInterval() {
    if (this._buttonHeldInterval !== void 0) {
      clearInterval(this._buttonHeldInterval);
      this._buttonHeldInterval = void 0;
    }
  }

  // Initialize the view
  onInitialize() {
    this.interactive = true;
    this.visible = this.$model.visible;
    this._fixDisabledColours();
  }

  // Update the button's color based on its disabled state
  _fixDisabledColours() {
    this.display.children[0].tint = this.$model.isDisabled
      ? 0xff404040
      : 0xffffffff;
  }
}
