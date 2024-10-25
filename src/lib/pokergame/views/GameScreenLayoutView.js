import AnimateViewBase from "./AnimateViewBase.js";
import { DealerTalkBubbleView } from "./DealerTalkBubbleView.js";
import { DealerCardsView } from "./DealerCardsView.js";
import { AvatarLayoutView } from "./AvatarLayoutView.js";
import { MainGameUIView } from "./MainGameUIView.js";
import { GameCardView } from "./GameCardView.js";
import { HouseTablePotView } from "./HouseTablePotView.js";
import { MobileChipView } from "./MobileChipView.js";

// Game screen layout view

export class GameScreenLayoutView extends AnimateViewBase {
  constructor(options, gameplayLogic) {
    super("GameScreenLayoutView");
    this.options = options;
    this.gameLogic = gameplayLogic;
    this.firstResize = true;
    this.gameScale = 1;
    this.gameWidth = 1;
    this.gameHeight = 1;
    this._isNewGame = true;
    this._isNewGame = this.options.isNewGame;
  }

  // Get the view configuration
  getConfiguration() {
    return {
      childViews: {
        LocalPlayerInstance: {
          movieClipName: "LocalPlayerInstance",
          view: AvatarLayoutView,
          model: this.$model.CurrentTable.playerObj,
          options: {}
        },
        DealerCardsOnTable: {
          movieClipName: "DealerCardsOnTable",
          view: DealerCardsView,
          model: this.$model.CurrentTable,
          options: {}
        },
        DealerTalkBubble: {
          movieClipName: "DealerTalkBubbleInstance",
          view: DealerTalkBubbleView,
          model: this.$model.CurrentTable.houseCardDealer,
          options: {}
        },
        TablePot: {
          movieClipName: "TablePotInstance",
          view: HouseTablePotView,
          model: this.$model.CurrentTable.houseCardDealer.displayPot,
          options: {}
        },
        MobileDealerButtonInstance: {
          movieClipName: "MobileDealerButtonInstance",
          view: MobileDealerButtonView,
          model: this.$model,
          options: {}
        },
        MobileCardInstance: {
          movieClipName: "MobileCardInstance",
          view: GameCardView,
          model: this.$model.CurrentTable.mobileCardObj,
          options: {}
        },
        GameUi: {
          movieClipName: "GameUiInstance",
          view: MainGameUIView,
          model: this.$model.GameButtons,
          options: {}
        },
        SaveIconInstance: {
          movieClipName: "SaveIconInstance",
          view: SaveIconView,
          model: this.$model,
          options: {}
        },
        WinningHandTextboxInstance: {
          movieClipName: "WinningHandTextboxInstance",
          view: WinningHandTextboxView,
          model: this.$model.CurrentTable.houseCardDealer.winningHandName,
          options: {}
        },
        HelpPopupObj: {
          movieClipName: "HelpPopupObj",
          view: HelpPopupView,
          model: this.$model
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    for (let i = 0; i < 30; ++i) {
      this._createChip(i);
    }
    let tableCenter = this.$childViews.get("TablePotDummy");
    this.$model.CurrentTable.potX = tableCenter.x;
    this.$model.CurrentTable.potY = tableCenter.y + 50 * this.gameScale;
    this.$model.loadingAnimationData.isVisible = true;
    this.$model.loadingAnimationData.screenFadeInfo.fadeSpeed = -3;
  }

  // Create a chip view
  _createChip(chipIndex) {
    let chipModel = this.$model.CurrentTable.mobileChips.createChip();
    this.addChild(
      {
        animateContent: lib.mobileChips,
        symbolName: "chip",
        view: MobileChipView,
        model: chipModel,
        x: 0,
        y: -15000,
        options: {}
      },
      "ChipInstance" + chipIndex
    );
    this.$childViews.get("ChipInstance" + chipIndex).visible = true;
  }

  // Handle landscape orientation change
  onSetLandscape() {
    if (this.firstResize) {
      this.firstResize = true;
      this.onResize(this.gameWidth, this.gameHeight, this.gameScale);
    }
  }

  // Handle resize event
  onResize(gameWidth, gameHeight, gameScale) {
    super.onResize(gameWidth, gameHeight, gameScale);
    this.gameScale = gameScale;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    gameWidth > gameHeight
      ? (this.gotoAndStop(0),
        (this.scaleX = 1),
        (this.scaleY = 1))
      : (this.gotoAndStop(1),
        (this.scaleX = 1),
        (this.scaleY = 1));
    let tableCenter = this.$childViews.get("TablePotDummy");
    this.$model.CurrentTable.potX = tableCenter.x;
    this.$model.CurrentTable.potY = tableCenter.y + 50 * this.gameScale;
  }
}
