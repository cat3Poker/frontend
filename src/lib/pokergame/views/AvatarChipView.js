import AnimateViewBase from "./AnimateViewBase.js";
import { MovieClipView } from "./MovieClipView.js";

// Avatar chip view
class AvatarChipView extends AnimateViewBase {
  constructor(options) {
    super("AvatarChipView");
    this.options = options;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      childViews: {
        ChipImageset: {
          movieClipName: "ChipImageset",
          view: MovieClipView,
          model: this.$model
        }
      },
      modelWatch: {
        value: () => {
          _this.updateChipImageAndVisiblility();
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    this.updateChipImageAndVisiblility();
  }

  // Destroy the view
  onDestroy() { }

  // Start the view
  onStart() { }

  // Update the chip image and visibility based on the bet amount
  updateChipImageAndVisiblility() {
    let betAmount = +this.$model.value;
    this.visible = betAmount > 0;
    if (betAmount >= 1000) {
      this.$childViews.get("ChipImageset").gotoAndStop(4);
    } else if (betAmount >= 500) {
      this.$childViews.get("ChipImageset").gotoAndStop(3);
    } else if (betAmount >= 100) {
      this.$childViews.get("ChipImageset").gotoAndStop(2);
    } else if (betAmount >= 25) {
      this.$childViews.get("ChipImageset").gotoAndStop(1);
    } else {
      this.$childViews.get("ChipImageset").gotoAndStop(0);
    }
  }
}
