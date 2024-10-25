// Model for the ending screen
class EndingScreenModel {
  constructor(gameplayData, userProfile) {
    this.gameplayData = gameplayData;
    this.userProfile = userProfile;
    this.isShowing = false;
    this.submitScoreButton = new TextWidgetModel();
    this.currentGameplayModel = null;
    this.handsPlayedText = new TextWidgetValueModel();
    this.largestWin = new TextWidgetValueModel();
    this.finalScoreText = new TextWidgetValueModel();
    this.loadingAnimationData = null;
    this.youWinText = new TextWidgetModel();
    (this.finalScoreText.textKey = "staticPoker.finalScore"),
      (this.submitScoreButton.visible = true);
  }
}
