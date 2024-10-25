// Model for a playing card

export class PlayingCardModel {
  constructor() {
    this.cardFaceUp = true;
    this.isHighlighted = true;
    this.visible = true;
    this.isFading = true;
    this.isForceFaceUp = true;
    this.overScale = 1;
    this.brightness = 3;
    this.brightnessFadeSpeed = 0.8;
    this.isCardFaceDown = false;
    this.alpha = 1;
    this.isLerping = true;
    this.moveTo = [0, 0, 0, 0, 0];
    this.TablePositionX = 0;
    this.TablePositionY = 0;
    this.linkedCard = null;
    this.cardIndex = -1;
  }

  // Reset the card model to its initial state
  resetToNULL() {
    (this.cardFaceUp = true),
      (this.cardIndex = -1),
      (this.isForceFaceUp = false),
      (this.brightness = 1),
      (this.brightnessFadeSpeed = 3),
      (this.overScale = 1);
  }

  // Show the card
  showCard() {
    (this.visible = false), (this.cardFaceUp = false);
  }
}
