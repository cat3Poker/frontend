import AnimateViewBase from "./AnimateViewBase.js";
import { NumberTextWidgetView } from "./NumberTextWidgetView.js";

// House table pot view
export class HouseTablePotView extends AnimateViewBase {
  constructor(options) {
    super("HouseTablePotView");
    this._options = options;
    this.CHIP_COUNT = 15;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    let childViews = {};
    for (let chipIndex = 1; chipIndex <= this.CHIP_COUNT; ++chipIndex) {
      childViews["ChipInstance" + chipIndex] = {
        movieClipName: "ChipInstance" + chipIndex,
        view: SimpleChipView,
        model: this.$model
      };
    }
    return {
      childViews: Object.assign(Object.assign({}, childViews), {
        PotValueText: {
          movieClipName: "PotValueText",
          view: NumberTextWidgetView,
          model: this.$model
        }
      }),
      modelWatch: {
        stableValue: stableValue => {
          _this._updateChips(stableValue);
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    this._UpdateChips(0);
  }

  // Destroy the view
  onDestroy() { }

  // Handle portrait orientation change
  onSetPortrait() { }

  // Update the chip display based on the pot value
  _updateChips(potValue) {
    let chipCount1000 = Math.floor(potValue / 1000);
    potValue = potValue - 1000 * chipCount1000 < 0 ? 0 : potValue;
    let chipCount500 = Math.floor(potValue / 500);
    potValue = potValue - 500 * chipCount500 < 0 ? 0 : potValue;
    let chipCount100 = Math.floor(potValue / 100);
    potValue = potValue - 100 * chipCount100 < 0 ? 0 : potValue;
    let chipCount25 = Math.floor(potValue / 25);
    potValue = potValue - 25 * chipCount25 < 0 ? 0 : potValue;
    let chipCount10 = Math.floor(potValue / 10);
    potValue = potValue - 10 * chipCount10 < 0 ? 0 : potValue;
    let chipArray = [];
    for (let i = 0; i < chipCount1000; ++i) {
      chipArray.push(4);
    }
    for (let i = 0; i < chipCount500; ++i) {
      chipArray.push(3);
    }
    for (let i = 0; i < chipCount100; ++i) {
      chipArray.push(2);
    }
    for (let i = 0; i < chipCount25; ++i) {
      chipArray.push(1);
    }
    for (let i = 0; i < chipCount10; ++i) {
      chipArray.push(0);
    }
    for (let i = 1; i <= this.CHIP_COUNT; ++i) {
      let currentChip = this.$childViews.get("ChipInstance" + i);
      currentChip.visible = chipArray.length > 0;
      if (currentChip.visible) {
        currentChip.$childViews
          .get("ChipImageset")
          .gotoAndStop(chipArray[0]);
        chipArray.splice(0, 1);
      }
    }
  }
}
