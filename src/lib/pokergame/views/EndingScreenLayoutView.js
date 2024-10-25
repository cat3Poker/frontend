import AnimateViewBase from "./AnimateViewBase.js";
import { EndingPanel_TourneyView } from "./EndingPanel_TourneyView.js";

// Ending screen layout view
class EndingScreenLayoutView extends AnimateViewBase {
  constructor(endingLogic, options, gameAnalytics) {
    super("EndingScreenLayoutView");
    this.endingLogic = endingLogic;
    this.options = options;
    this.gameAnalytics = gameAnalytics;
  }

  // Get the view configuration
  getConfiguration() {
    let _this = this;
    return {
      childViews: {
        SubmitScoreButtonObj: {
          movieClipName: "SubmitScoreButtonInstance",
          view: UiButtonView,
          model: this.$model.submitScoreButton,
          options: {
            textKey: "button.submitScore",
            onClick: () => {
              _this.gameAnalytics.handleGameEnd({
                score: _this.$model.currentGameplayModel.CurrentTable.playerObj
                  .finalScore
              });
            }
          }
        },
        SitAndGoPanel: {
          movieClipName: "SitAndGoPanelInstance",
          view: EndingPanel_SitGoView,
          model: this.$model
        },
        FinalScoreText: {
          movieClipName: "FinalScoreTextObj",
          view: EndingPanel_TourneyView,
          model: this.$model
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    this.$model.loadingAnimationData.isVisible = true;
    this.$model.loadingAnimationData.screenFadeInfo.fadeSpeed = -3;
  }

  // Destroy the view
  onDestroy() { }

  // Start the view
  onStart() { }
}
