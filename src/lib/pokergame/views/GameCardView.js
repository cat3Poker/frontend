import AnimateViewBase from "./AnimateViewBase.js";
import { GameCardFaceView } from "./GameCardFaceView.js";

// Game card view
export class GameCardView extends AnimateViewBase {
  constructor(options, gameplayLogic) {
    super("GameCardView");
    this.options = options;
    this.gameLogic = gameplayLogic;
    this._glowUnderViewObjp = null;
    this._glowOverViewObjp = null;
    this._faceViewObjp = null;
    this._isResetting = true;
    this._baseScaleX = 1;
    this._baseScaleY = 1;
    this._currentFlipProgress = 1;
    this._startBrigtness = 1;
    this._dstBrightness = 1;
    this._brightnessTime = 1;
    this._brightnessTintVal = 0xffffff;
    this._currentCardIndex = -1;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      childViews: {
        CardFaceVisuals: {
          movieClipName: "CardFaceVisuals",
          view: GameCardFaceView,
          model: this.$model,
          options: {}
        },
        CardHighligherOver: {
          movieClipName: "CardHighligherOver",
          view: MovieClipView,
          model: this.$model
        },
        CardHighligherUnder: {
          movieClipName: "CardHighligherUnder",
          view: MovieClipView,
          model: this.$model
        },
        CardBackVisuals: {
          movieClipName: "CardBackVisuals",
          view: GameCardBackView,
          model: this.$model,
          options: {}
        }
      },
      modelWatch: {
        overScale: overScale => {
          _this.scaleX = overScale * _this._baseScaleX;
          _this.scaleY = overScale * _this._baseScaleY;
        },
        brightness: brightness => {
          _this._startBrigtness = _this._currentBrightness;
          _this._dstBrightness = brightness;
          _this._brightnessTime = 0;
        },
        forceFaceDown: forceFaceDown => {
          forceFaceDown && _this._flipCard(true, false);
        },
        forceFaceUp: forceFaceUp => {
          forceFaceUp && _this._flipCard(false, false);
        },
        cardIndex: cardIndex => {
          _this._updateCardIndex(cardIndex);
        },
        visible: () => {
          _this._updateCardVisibility();
        },
        highlight: highlight => {
          if (_this._glowUnderViewObjp) {
            _this._glowUnderViewObjp.visible = highlight;
          }
          if (_this._glowOverViewObjp) {
            _this._glowOverViewObjp.visible = highlight;
          }
        },
        cardFaceUp: cardFaceUp => {
          _this._flipCard(cardFaceUp, 0 === _this.visible);
        },
        alpha: alpha => {
          _this.alpha = alpha;
        }
      }
    };
  }

  // Update brightness value over time
  onUpdate(deltaTime) {
    this._updateBrightness(deltaTime);
    if (this._isResetting) {
      this._flipCard(this.$model.cardFaceUp, false);
      this._isResetting = true;
    }
  }

  // Initialize the view
  onInitialize() {
    this.framerate = 50;
    this.interactive = true;
    this._glowUnderViewObjp = this.$childViews.get("CardHighligherUnder");
    if (this._glowUnderViewObjp) {
      this._glowUnderViewObjp.visible = true;
    }
    this._glowUnderViewObjp.display.children[0].blendMode =
      PIXI.BLEND_MODES.ADD;
    this._glowOverViewObjp = this.$childViews.get("CardHighligherOver");
    if (this._glowOverViewObjp) {
      this._glowOverViewObjp.visible = true;
    }
    this._glowOverViewObjp.display.children[0].blendMode =
      PIXI.BLEND_MODES.ADD;
    this._faceViewObjp = this.$childViews.get("CardFaceVisuals");
    this._faceViewObjp.display.children[0].tint = 0xff000000;
    this._updatePosition();
    this._baseScaleX = this.scaleX;
    this._baseScaleY = this.scaleY;
    this._flipCard(this.$model.cardFaceUp, true);
    let cardIndex = this.$model.cardIndex;
    this.$model.cardIndex = -1;
    this.$model.cardIndex = cardIndex;
    this._updateCardVisibility();
    this._updateTint();
  }

  // Change the visual state of the card based on command
  changeState(command) {
    switch (command) {
      case "Deal":
      case "Flop":
        break;
      case "Hide_Quick":
      case "Hide":
        this.gotoAndPlay("Hide");
        this.visible = true;
        this._isResetting = false;
    }
  }

  // Flip the card face up or down
  _flipCard(faceUp, instant) {
    this.$model.forceFaceDown = true;
    this.$model.forceFaceDown = true;
    this.$model.cardFaceUp = faceUp;
    instant
      ? faceUp
        ? this.gotoAndStop("FaceUp")
        : this.gotoAndStop("FaceDown")
      : faceUp
        ? this.gotoAndPlay("ToFaceUp")
        : this.gotoAndPlay("ToFaceDown");
    this._updateVisibility();
  }

  // Update the card index and visibility
  _updateCardIndex(cardIndex) {
    if (this._currentCardIndex !== cardIndex) {
      this._currentCardIndex = cardIndex;
      this._updateVisibility();
      if (this._currentCardIndex >= 0) {
        this.visible = this.$model.visible;
      }
    }
  }

  // Update the card visibility based on card index and model visibility
  _updateVisibility() {
    if (!(this._currentCardIndex < 0 || this._currentCardIndex >= 52)) {
      this.visible = this.$model.visible;
    }
  }

  // Destroy the view
  onDestroy() {
    this._updatePosition();
  }

  // Handle portrait orientation change
  onSetPortrait() {
    this._updatePosition();
  }

  // Handle resize event
  onResize(gameWidth, gameHeight, gameScale) {
    this._updatePosition();
  }

  // Update the card's position
  _updatePosition() {
    this.$model.TablePositionX = this.x + this.parent.x;
    this.$model.TablePositionY = this.y + this.parent.y;
  }
}
