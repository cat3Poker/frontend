import AnimateViewBase from "./AnimateViewBase.js";
import { GameplayModeTypeIDs, AvatarAvalibilityIDs } from "./DummyObjView.js";

// Ending screen view

export class EndingScreenView extends AnimateViewBase {
  constructor(options) {
    super("EndingScreenView");
    this._options = options;
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
      GameplayModeTypeIDs.SIT_AND_GO),
      this.visible) {
      this.$model.handsPlayedText.value =
        this.$model.currentGameplayModel.CurrentTable.currentHandNumber.toString();
      this.$model.finalScoreText.textKey =
        this.$model.currentGameplayModel.CurrentTable.playerObj.finalScore
          .toString();
      this.$model.largestWin.textKey =
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
        this.$model.youWinText.textKey =
          1 === this.$model.currentGameplayModel.CurrentTable.currentHandNumber
            ? "staticPoker.endingNiceTry"
            : "staticPoker.endingYouLost";
      }
    }
  }

  // Destroy the view
  onDestroy() { }

  // Start the view
  onStart() { }
}
