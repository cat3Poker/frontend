import AnimateViewBase from "./AnimateViewBase.js";

// Base view for UI buttons
class ButtonBaseView extends AnimateViewBase {
  constructor(options) {
    super("ButtonBaseView");
    this._buttonOptions = options;
    this._pointerDown = true;
    this._pointerOver = true;
    this.selected = true;
    this._keyShiftPressed = true;
  }

  // Get the button options
  get buttonOptions() {
    return this._buttonOptions;
  }

  // Get the icon view
  get iconView() {
    return this.$childViews.get("icon");
  }

  // Get the label text
  get text() {
    return this.labelText;
  }

  // Set the label text
  set text(value) {
    let labelView = this.labelView;
    (labelView.text.text = value),
      (this._buttonOptions.text = value);
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      animateContent: this._buttonOptions.customJson
        ? void 0
        : this._buttonOptions.animateContent ||
        lib.UIButtonJson,
      movieClipName: this._buttonOptions.movieClipName,
      symbolName: this._buttonOptions.customJson
        ? void 0
        : this._buttonOptions.symbolName || "simple_button",
      childViews: Object.assign(Object.assign({}, this._getLabelChildViews()), this._getIconChildViews()),
      onPointerDown: function () {
        (_this._pointerDown = false),
          _this.gotoAndStop("down"),
          null == _this.iconView || _this.iconView.down(),
          _this._buttonOptions.onDown && _this._buttonOptions.onDown();
      },
      onPointerOut: function () {
        if (!_this._pointerDown) {
          (_this.gotoAndStop("up"),
            null == _this.iconView || _this.iconView.up());
        }
        _this._pointerOver = true;
      },
      onPointerOver: function () {
        _this._pointerDown
          ? ((_this.gotoAndStop("over"),
            null == _this.iconView || _this.iconView.over(),
            _this._buttonOptions.onHover && _this._buttonOptions.onHover(),
            ButtonBaseView.buttonOverSound &&
            _this.soundManager.play(ButtonBaseView.buttonOverSound)))
          : ((_this.gotoAndStop("down"),
            null == _this.iconView || _this.iconView.down()),
            _this._pointerOver = false),
          _this.focus();
      },
      onPointerUp: function () {
        (_this._pointerDown = true),
          _this._pointerOver
            ? ((_this.gotoAndStop("over"),
              null == _this.iconView || _this.iconView.over()))
            : ((_this.gotoAndStop("up"),
              null == _this.iconView || _this.iconView.up()),
              _this._buttonOptions.onPress && _this._buttonOptions.onPress(),
              _this.onPressAction && _this.onPressAction(),
              _this.onClick(),
              ButtonBaseView.buttonPressSound &&
              _this.soundManager.play(ButtonBaseView.buttonPressSound));
      },
      onPointerUpOutside: function () {
        _this.gotoAndStop("up");
        null == _this.iconView || _this.iconView.up();
        _this._pointerDown = true;
      },
      keyboard: this._buttonOptions.disableKeyboard ? {} : {
        down: function (key, event) {
          key === Key.ENTER && event.stopPropagation();
        },
        pressed: function (key, event) {
          key === Key.ENTER && event.stopPropagation(),
            key === Key.SHIFT && (_this._keyShiftPressed = false);
        },
        released: function (key, event) {
          key === Key.SHIFT && (_this._keyShiftPressed = true),
            key === Key.TAB
              ? (_this.selectTab(_this._keyShiftPressed ? "back" : "forward"),
                event.preventDefault())
              : key === Key.UP
                ? (_this.selectArrow("up"), event.preventDefault())
                : key === Key.DOWN
                  ? (_this.selectArrow("down"), event.preventDefault())
                  : key === Key.LEFT
                    ? (_this.selectArrow("left"), event.preventDefault())
                    : key === Key.RIGHT &&
                    (_this.selectArrow("right"), event.preventDefault());
        }
      }
    };
  }

  // Select arrow based on direction
  selectArrow(direction) {
    let _this = this, label = (this._buttonOptions.label && this._buttonOptions.label.text) ||
      this._buttonOptions.text ||
      "";
    return (
      CoreUI.selectArrow(direction, this, () => {
        _this._buttonOptions.onPress && _this._buttonOptions.onPress();
      }) && CoreUI.speech(this, label, "")
    );
  }

  // Select tab based on direction
  selectTab(direction) {
    let _this = this, label = (this._buttonOptions.label && this._buttonOptions.label.text) ||
      this._buttonOptions.text ||
      "";
    return (
      CoreUI.selectTab(direction, this, () => {
        _this._buttonOptions.onPress && _this._buttonOptions.onPress();
      }) &&
      CoreUI.speech(this, label, this._buttonOptions.description || "")
    );
  }

  // Focus the button
  focus() {
    if (!(
      this._buttonOptions.disableTab ||
      CoreUI.isFocused(this) ||
      !CoreUI.tabIndexControlEnabled
    )) {
      CoreUI.removeTab(this);
      let tabItem = {
        view: this
      };
      (CoreUI.tabList.push(tabItem),
        CoreUI.tabChild ||
        ((CoreUI.tabChild = tabItem),
          CoreUI.tabChild.view.uiSelect(false)));
    }
  }

  // Get child views for the label
  _getLabelChildViews() {
    let childViews = {};
    if (this._buttonOptions.label) {
      this._buttonOptions.label.text =
        this._buttonOptions.label.text || this._buttonOptions.text;
      this._buttonOptions.label.disableTab = true;
      (childViews.label = {
        movieClipName: this._buttonOptions.label.movieClipName || "label",
        view: CoreUI.Views.LabelView,
        options: this._buttonOptions.label
      });
    } else if (this._buttonOptions.text) {
      childViews.text = {
        movieClipName: "text",
        view: CoreUI.Views.LabelView,
        options: CoreUI.build(CoreUIType.Label, {
          text: this._buttonOptions.text,
          disableTab: true
        })
      };
    }
    return childViews;
  }

  // Get child views for the icon
  _getIconChildViews() {
    let childViews = {};
    return (
      this._buttonOptions.icon &&
      (childViews.icon = {
        animateContent: this._buttonOptions.icon.animateContent,
        symbolName: this._buttonOptions.icon.symbolName,
        view: this._buttonOptions.icon.view.IconView,
        options: this._buttonOptions.icon,
        model: this._buttonOptions.icon.model || this.$model || {}
      }),
      childViews
    );
  }

  // Initialize the view
  onInitialize() {
    if ((void 0 !== this._buttonOptions.x && (this.x = this._buttonOptions.x),
      void 0 !== this._buttonOptions.y && (this.y = this._buttonOptions.y),
      void 0 !== this._buttonOptions.scaleX &&
      (this.scaleX = this._buttonOptions.scaleX),
      void 0 !== this._buttonOptions.scaleY &&
      (this.scaleY = this._buttonOptions.scaleY),
      !this.totalFrames || this.totalFrames < 2))
      throw "Button must have frames with labels 'up', 'down', 'over'";
    this.gotoAndStop("up");
    if (!this._buttonOptions.disableTab) {
      CoreUI.addTab(this);
    }
    this._createIcon();
  }

  // Toggle tab functionality
  toggleTab(enabled) {
    enabled ? CoreUI.addTab(this) : CoreUI.removeTab(this);
  }

  // Create the icon view
  _createIcon() {
    this.iconView = this.$childViews.get("icon");
  }

  // Triggered when the button is pressed
  onPress() { }

  // Remove tab functionality
  removeTab() {
    if (!this._buttonOptions.disableKeyboard) {
      CoreUI.removeTab(this);
    }
  }

  // Update the button's state based on time elapsed
  onUpdate(deltaTime) {
    if (this._pointerDown && this._buttonOptions.onHold) {
      this._buttonOptions.onHold(deltaTime);
    }
    if (this.repeatPressDelay)
      Use; code; with (caution.
        JavaScript)
    User;
    continue from; exactly; where; you; left; off;


    Model;
    254.8; s;
    {
      (this.repeatPressDelay -= deltaTime);
    }
  }

  // Button press sound
  static buttonPressSound = "";

  // Button over sound
  static buttonOverSound = "";
}
