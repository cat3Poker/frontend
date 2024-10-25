import AnimateViewBase from "./AnimateViewBase.js";
import { GameplayModeTypeIDs, AvatarAvalibilityIDs } from "./DummyObjView.js";

// Ending panel view for tournaments
export class EndingPanel_TourneyView extends AnimateViewBase {
  constructor(options, localizationManager) {
    super("EndingPanel_TourneyView");
    this.options = options;
    this._localizationHandler = localizationManager;
  }

  // Get the view configuration
  getConfiguration() {
    return {
      childViews: {
        PanelTitle: {
          movieClipName: "PanelTitleInstance",
          view: TextWidgetFixedTitleView,
          model: this.$model.youWinText
        },
        HandsPlayedText: {
          movieClipName: "HandsPlayedTextObj",
          view: TextWidgetSimpleLocView,
          model: this.$model
        },
        HandsPlayedNumber: {
          movieClipName: "HandsPlayedNumberObj",
          view: TextWidgetView,
          model: this.$model.handsPlayedText
        },
        LargestWinText: {
          movieClipName: "LargestWinTextObj",
          view: TextWidgetSimpleLocView,
          model: this.$model
        },
        LargestWinNumber: {
          movieClipName: "LargestWinNumberObj",
          view: TextWidgetView,
          model: this.$model.largestWin
        },
        FinalScoreText: {
          movieClipName: "FinalScoreTextObj",
          view: TextWidgetSimpleLocView,
          model: this.$model
        },
        FinalScoreNumber: {
          movieClipName: "FinalScoreNumberObj",
          view: TextWidgetView,
          model: this.$model.finalScoreText
        }
      }
    };
  }

  // Initialize the view
  onInitialize() {
    if ((this.visible =
      this.$model.currentGameplayModel.gameplayType ===
      GameplayModeTypeIDs.TOURNAMENT),
      this.visible) {
      this.$model.handsPlayedText.value =
        this.$model.currentGameplayModel.CurrentTable.currentHandNumber.toString();
      this.$model.finalScoreText.value =
        this.$model.currentGameplayModel.CurrentTable.playerObj.finalScore
          .toString();
      this.$model.largestWin.value =
        this.$model.currentGameplayModel.CurrentTable.playerObj.biggestWin
          .toString();
      let activePlayers = 0;
      for (let i = 0; i < this.$model.currentGameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
        this.$model.currentGameplayModel.CurrentTable.getPlayer(
          i
        ).availability !== AvatarAvalibilityIDs.REMOVED && activePlayers++;
      }
      if (1 === activePlayers) {
        this.$model.youWinText.textKey = "staticPoker.endingYouWin";
      } else {
        let textKey = this._localizationHandler.getText(
          "staticPoker.endingYouFinished"
        );
        this.$model.youWinText.textKey = textKey.replace(
          /FINISHING_PLACE/gi,
          activePlayers.toString()
        );
      }
    }
  }

  // Destroy the view
  onDestroy() { }

  // Start the view
  onStart() { }
}
