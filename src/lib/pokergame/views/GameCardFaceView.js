import AnimateViewBase from "./AnimateViewBase.js";

// Game card face view
export class GameCardFaceView extends AnimateViewBase {
  constructor(options, gameplayLogic) {
    super("GameCardFaceView");
    this.options = options;
    this.gameLogic = gameplayLogic;
    this._currentFlipTime = 0;
    this._cardFlipDirection = 0;
    this.currentScale = 1;
    this._currentRotation = 0;
    this._moveSrcX = 0;
    this._moveSrcY = 0;
    this._spinSrcRot = 0;
    this._moveDestX = 0;
    this._moveDestY = 0;
    this._spinDstRot = 0;
    this._currentCardIndex = -1;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      modelWatch: {
        cardIndex: cardIndex => {
          _this._setFaceCard(cardIndex);
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    this.interactive = true;
  }

  // Set the face card based on card index
  _setFaceCard(cardIndex) {
    if (this._currentCardIndex !== cardIndex) {
      this._currentCardIndex = cardIndex;
      if (!(this._currentCardIndex < 0 || this._currentCardIndex >= 52)) {
        let suitIndex = Math.floor(cardIndex / 13);
        let valueIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 11, 9][cardIndex % 13];
        this.gotoAndStop(13 * suitIndex + valueIndex);
      }
    }
  }
}
