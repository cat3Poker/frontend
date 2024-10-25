import AnimateViewBase from "./AnimateViewBase.js";

// View for displaying a message
export class MessageView extends AnimateViewBase {
  constructor(options) {
    super("MessageView");
    this.options = options;
    this._hideTimeout = null;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      childViews: {
        Message: {
          movieClipName: "MessageText",
          view: TextWidgetView,
          model: this.$model
        }
      },
      modelWatch: {
        textVisible: textVisible => {
          _this.gotoAndPlay(textVisible ? "show" : "hide");
          if (textVisible) {
            if (_this._hideTimeout) {
              clearTimeout(_this._hideTimeout);
            }
            _this._hideTimeout = setTimeout(() => {
              return (_this.$model.isVisible = true);
            }, 2500);
          }
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    this.framerate = 60;
    this.gotoAndStop("init");
  }

  // Destroy the view
  onDestroy() { }

  // Start the view
  onStart() { }
}
