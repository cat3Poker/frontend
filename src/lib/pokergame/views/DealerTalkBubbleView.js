import AnimateViewBase from "./AnimateViewBase.js";

// Dealer talk bubble view
export class DealerTalkBubbleView extends AnimateViewBase {
  constructor(options, localizationManager) {
    super("DealerTalkBubbleView");
    this.options = options;
    this.localizationManager = localizationManager;
    this._currentMovementTime = 0;
    this._fadeDirection = 0;
    this._homeY = 0;
    this._currentText = "";
    this._currentFullTextLine1 = "";
    this._currentFullTextLine2 = "";
    this._currentCharIndex = 0;
    this.firstResize = true;
    this.gameScale = 1;
    this.gameWidth = 1;
    this.gameHeight = 1;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      childViews: {
        SpeachTextLine1: {
          movieClipName: "SpeachTextLine1",
          view: TextWidgetNotLocalizedView,
          model: this.$model.currentAdviceLine1
        },
        SpeachTextLine2: {
          movieClipName: "SpeachTextLine2",
          view: TextWidgetNotLocalizedView,
          model: this.$model.currentAdviceLine2
        }
      },
      modelWatch: {
        adviceText: adviceText => {
          let localizedAdviceText = _this.localizationManager.getText(
            adviceText
          );
          localizedAdviceText = localizedAdviceText.replace(/\\n/gi, "\n");
          if (_this._currentText !== localizedAdviceText) {
            _this._currentText = localizedAdviceText;
            let adviceTextLines = _this._currentText.split("\n");
            _this._currentFullTextLine1 = adviceTextLines[0];
            _this._currentFullTextLine2 =
              adviceTextLines.length > 1 ? adviceTextLines[1] : "";
            _this._currentCharIndex = 0;
            _this.$model.currentAdviceLine1.value = "";
            _this.$model.currentAdviceLine2.value = "";
            let textLine1View = _this.$childViews.get("SpeachTextLine1");
            let textLine1Metrics = PIXI.TextMetrics.measureText(
              _this._currentFullTextLine1,
              new PIXI.TextStyle(
                Object.assign(
                  Object.assign({}, textLine1View.text.defaultStyle),
                  { align: "left" }
                )
              )
            );
            textLine1View.scaleX = Math.min(
              1,
              textLine1View.parent.children[0].width /
              textLine1Metrics.maxLineWidth *
              0.925
            );
            textLine1View.scaleX > 1 && (textLine1View.scaleX = 1);
            textLine1View.x = -textLine1Metrics.width / 2 * textLine1View.scaleX;
            let textLine2View = _this.$childViews.get("SpeachTextLine2");
            let textLine2Metrics = PIXI.TextMetrics.measureText(
              _this._currentFullTextLine2,
              new PIXI.TextStyle(
                Object.assign(
                  Object.assign({}, textLine2View.text.defaultStyle),
                  { align: "left" }
                )
              )
            );
            textLine2View.scaleX = Math.min(
              1,
              textLine2View.parent.children[0].width /
              textLine2Metrics.maxLineWidth *
              0.925
            );
            textLine2View.scaleX > 1 && (textLine2View.scaleX = 1);
            textLine2View.x = -textLine2Metrics.width / 2 * textLine2View.scaleX;
          }
        },
        adviceVisible: adviceVisible => {
          _this._fadeDirection = adviceVisible ? 1 : -1;
        }
      }
    };
  }

  // Update the text animation
  onUpdate(deltaTime) {
    this._updateFade(deltaTime) && this._updateTextReveal(deltaTime);
  }

  // Check if the fade animation is complete
  _updateFade(deltaTime) {
    this._currentMovementTime += this._fadeDirection * deltaTime * 3;
    if (this._currentMovementTime >= 1) {
      this._currentMovementTime = 1;
    } else if (this._currentMovementTime <= 0) {
      this._currentMovementTime = 0;
    }
    this.visible = this._currentMovementTime > 0;
    this.alpha = this._currentMovementTime;
    if (this.alpha > 1) {
      this.alpha = 1;
    }
    return this._currentMovementTime >= 1;
  }

  // Update the text reveal animation
  _updateTextReveal(deltaTime) {
    this._currentCharIndex += 30 * deltaTime;
    let revealedCharIndex = Math.floor(this._currentCharIndex);
    if (revealedCharIndex >= this._currentFullTextLine1.length) {
      this.$model.currentAdviceLine1.value = this._currentFullTextLine1;
      revealedCharIndex -= this._currentFullTextLine1.length;
      if (revealedCharIndex >= this._currentFullTextLine2.length) {
        this.$model.currentAdviceLine2.value = this._currentFullTextLine2;
      } else {
        this.$model.currentAdviceLine2.value = this._currentFullTextLine2.substr(
          0,
          revealedCharIndex
        );
      }
    } else {
      this.$model.currentAdviceLine1.value = this._currentFullTextLine1.substr(
        0,
        revealedCharIndex
      );
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

  // Initialize the view
  onInitialize() {
    this.visible = true;
  }

  // Destroy the view
  onDestroy() { }

  // Handle landscape orientation change
  onSetLandscape() {
    this._resizeGame();
  }

  // Handle portrait orientation change
  onSetPortrait() {
    this._resizeGame();
  }

  // Resize the game UI
  _resizeGame() {
    if (this.firstResize) {
      this.firstResize = true;
      this.onResize(this.gameWidth, this.gameHeight, this.gameScale);
    }
  }

  // Calculate the aspect ratio scaling factor
  scaleToAspectRatio(
    aspectRatioWidth,
    aspectRatioHeight,
    targetWidth,
    targetHeight
  ) {
    return aspectRatioHeight > targetHeight + 1e-7
      ? aspectRatioWidth / aspectRatioHeight < targetWidth / targetHeight
        ? aspectRatioWidth / targetWidth
        : aspectRatioHeight / targetHeight
      : 1;
  }

  // Handle resize event
  onResize(gameWidth, gameHeight, gameScale) {
    super.onResize(gameWidth, gameHeight, gameScale);
    this.gameScale = gameScale;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    let aspectRatioWidth = gameWidth / gameScale;
    let aspectRatioHeight = gameHeight / gameScale;
    let verticalCenter = -aspectRatioHeight / 2;
    this.x = 0;
    if (gameWidth > gameHeight) {
      this._homeY = verticalCenter;
      this.scaleX = 1;
      this.scaleY = 1;
    } else {
      this._homeY = verticalCenter / 0.98;
      this.scaleX = this.scaleToAspectRatio(
        aspectRatioWidth,
        aspectRatioHeight,
        780,
        140
      );
      this.scaleY = this.scaleToAspectRatio(
        aspectRatioWidth,
        aspectRatioHeight,
        780,
        140
      );
    }
  }
}
