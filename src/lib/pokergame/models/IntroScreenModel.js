// Intro screen model
class IntroScreenModel {
  constructor(gameplayData, storageController) {
    this.gameplayData = gameplayData;
    this.storageController = storageController;
    this.logoVisible = false;
    this.playButton = new TextWidgetModel();
    this.newGameButton = new TextWidgetModel();
    this.continueButton = new TextWidgetModel();
    this.continueGameRequested = true;
    this.newGameRequested = true;
    this.loadingAnimationData = null;
    this.pauseOnStart = true;
  }

  // Update button visibility based on saved game state
  updateButtonVisibility() {
    return __awaiter(this, void 0, void 0, function* () {
      let hasSaveData = yield this.storageController.hasSaveData();
      (this.playButton.visible = !hasSaveData),
        (this.continueButton.visible = hasSaveData),
        (this.newGameButton.visible = hasSaveData);
    });
  }

  // Setup new game
  setupNewGame() {
    this.storageController.resetStorage();
  }
}
