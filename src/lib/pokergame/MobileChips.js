import { MobileChipModel } from "./models/MobileChipModel.js";

// Class for handling chip movement

export class MobileChips {
  constructor() {
    this._chipPool = [];
    this._activeChips = [];
  }

  // Create a new chip
  createChip() {
    let chipModel = new MobileChipModel();
    if (this._chipPool.length <= 0) {
      return (
        this._chipPool.push(chipModel),
        (chipModel.chipPool = this),
        chipModel.resetToNULL(),
        chipModel
      );
    }
    let chip = this._chipPool.pop();
    return (
      (chip.moveTo = [0, 0, 0, 0, 0]),
      (chip.visible = false),
      (chip.chipPool = this),
      (chip.startLerp = true),
      chip
    );
  }

  // Move a chip from one position to another
  moveChip(srcX, srcY, destX, destY, moveTime) {
    if (!(this._chipPool.length <= 0)) {
      let chip = this._chipPool.pop();
      (chip.moveTo = [srcX, srcY, destX, destY, moveTime]),
        (chip.visible = true),
        (chip.startLerp = false),
        (chip.startLerp = true),
        this._activeChips.push(chip);
    }
  }

  // Return a chip to the pool
  returnChip(chip) {
    let chipIndex = this.activeChips.indexOf(chip);
    if (chipIndex < 0) {
      return;
    }
    (this.activeChips.splice(chipIndex, 1),
      this._chipPool.push(chip),
      chip.resetToNULL());
  }

  // Check if any chips are currently being animated
  isAnimating() {
    return this.activeChips.length > 0;
  }
}
