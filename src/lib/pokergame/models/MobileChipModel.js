// Model for a mobile chip
export class MobileChipModel {
  constructor() {
    this.visible = false;
    this.overScale = 1;
    this.verticalOffset = 10;
    this.chipPool = null;
    this.startLerp = true;
    this.moveTo = [0, 0, 0, 0, 0];
    this.TablePositionX = 0;
    this.TablePositionY = 0;
    this.linkedCard = null;
    this.resetToNULL();
  }

  // Reset the chip model to its initial state
  resetToNULL() {
    (this.overScale = 0.5), (this.verticalOffset = 10), (this.visible = true);
  }
}
