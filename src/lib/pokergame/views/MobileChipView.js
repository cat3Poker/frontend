import AnimateViewBase from "./AnimateViewBase.js";

// View for a chip in the game
export class MobileChipView extends AnimateViewBase {
  constructor(options, gameLogic) {
    super("MobileChipView");
    this.options = options;
    this.gameLogic = gameLogic;
    this.firstResize = false;
    this.gameScale = 1;
    this.gameWidth = 1;
    this.gameHeight = 1;
    this._currentMovementTime = 1;
    this._homeScaleX = 1;
    this._homeScaleY = 1;
    this.verticalScale = 1;
    this._movementSpeed = 0;
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
        overScale: overScale => {
          _this.scaleX = overScale * _this._baseScaleX;
          _this.scaleY = overScale * _this._baseScaleY;
        },
        visible: visible => {
          _this.visible = visible;
        },
        startLerp: startLerp => {
          if (startLerp) {
            _this.x = _this.$model.moveTo[0];
            _this.y = _this.$model.moveTo[1] * _this.verticalScale;
            _this.moveCardFromTo(
              _this.$model.moveTo[2],
              _this.$model.moveTo[3],
              6,
              _this.$model.moveTo[4]
            );
            _this.$model.isLerping = true;
          }
        }
      }
    };
  }

  // Update chip position and visibility during animation
  onUpdate(deltaTime) {
    if (this._currentMovementTime < 1) {
      this._currentMovementTime += deltaTime * this._movementSpeed;
      this.visible = this._currentMovementTime < 1;
      if (!this.visible && this.$model.linkedCard) {
        this.$model.linkedCard.visible = true;
        this.$model.linkedCard = null;
      }
      let progress = this._evalAsEasInOut(this._currentMovementTime);
      this.alpha = 1.5 * this._currentMovementTime;
      if (this.alpha > 1) {
        this.alpha = 1;
      }
      this.x =
        (1 - progress) * this._moveSrcX + progress * this._moveDestX;
      this.y =
        (1 - progress) * this._moveSrcY + progress * this._moveDestY;
      this.rotation =
        (1 - progress) * this._spinSrcRot + progress * this._spinDstRot;
    }
  }

  // Calculate smooth movement using ease-in-out function
  _evalAsEasInOut(progress) {
    let smoothProgress = progress * progress * (3 - 2 * progress);
    return smoothProgress >= 1
      ? 1
      : smoothProgress <= 0
        ? 0
        : smoothProgress;
  }

  // Move the chip from one point to another, with optional rotation and duration
  moveCardFromTo(destX, destY, rot, moveTime) {
    if (moveTime === void 0) {
      moveTime = 0;
    }
    if (moveTime === void 0) {
      moveTime = 0.5;
    }
    this._moveSrcX = this.x;
    this._moveDestX = destX;
    this._moveSrcY = this.y;
    this._moveDestY = destY;
    this._spinSrcRot = 0;
    this._spinDstRot = rot;
    this._currentMovementTime = 0;
    this._movementSpeed = 1 / moveTime;
  }

  // Initialize the view
  onInitialize() {
    this.zOrder = 50;
    this.autoReset = true;
    this._baseScaleX = this.scaleX;
    this._baseScaleY = this.scaleY;
    this.visible = this.$model.visible;
  }

  // Destroy the view
  onDestroy() {
    this._resizeGame();
  }

  // Handle portrait orientation change
  onStart() {
    this._resizeGame();
  }

  // Handle resize event
  onResize(gameWidth, gameHeight, gameScale) {
    this._resizeGame();
  }

  // Resize the view
  _resizeGame() {
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
    let aspectRatioHeight = gameHeight / gameScale;
    this.topY = aspectRatioHeight / 2;
    this.verticalScale *= gameWidth > gameHeight ? 0.65 : 0.75;
  }
}
