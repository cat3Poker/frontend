// Loading animation model
class LoadingAnimationModel {
  constructor() {
    this.loadingText = new TextWidgetValueModel();
    this.loadingVisible = false;
    this.screenFadeInfo = new ScreenFaderModel({ colour: 0 });
  }
}
