// Frontend logic for handling intro screen events
class FrontendLogic {
  constructor(introScreenModel, storageController) {
    this._introScreenModel = introScreenModel;
    this._storageController = storageController;
  }

  // Check if a saved game exists and update button visibility
  hasSaveData() {
    return __awaiter(this, void 0, void 0, function* () {
      let savedProgress = yield this._storageController.loadProgress();
      if (savedProgress) {
        this._introScreenModel.playButton.visible = !savedProgress;
        this._introScreenModel.continueButton.visible = savedProgress;
        this._introScreenModel.newGameButton.visible = savedProgress;
        return true;
      }
    });
  }

  // Setup a new game
  setupNewGame() {
    this._storageController.resetStorage();
  }
}
