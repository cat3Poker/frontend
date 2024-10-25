import AnimateViewBase from "./AnimateViewBase.js";
import { GameCardView } from "./GameCardView.js";

// Dealer cards view

export class DealerCardsView extends AnimateViewBase {
  constructor(options, gameplayLogic) {
    super("DealerCardsView");
    this.options = options;
    this.gameLogic = gameplayLogic;
  }

  // Get the view configuration
  getConfiguration() {
    return {
      childViews: {
        Card1Objp: {
          movieClipName: "Card1Instance",
          view: GameCardView,
          model: this.$model.tableCard_Flop1,
          options: {}
        },
        Card2Objp: {
          movieClipName: "Card2Instance",
          view: GameCardView,
          model: this.$model.tableCard_Flop2,
          options: {}
        },
        Card3Objp: {
          movieClipName: "Card3Instance",
          view: GameCardView,
          model: this.$model.tableCard_Flop3,
          options: {}
        },
        Card4Objp: {
          movieClipName: "Card4Instance",
          view: GameCardView,
          model: this.$model.tableCard_Turn,
          options: {}
        },
        Card5Objp: {
          movieClipName: "Card5Instance",
          view: GameCardView,
          model: this.$model.tableCard_River,
          options: {}
        }
      }
    };
  }

  // Initialize the view
  onInitialize() { }

  // Destroy the view
  onDestroy() { }

  // Start the view
  onStart() { }
}
