import AnimateViewBase from "./AnimateViewBase.js";
import { GameplayModeTypeIDs, AvatarAvalibilityIDs, SidePotModel, AvatarModel } from "./DummyObjView.js";
import { IntroScreenView } from "./IntroScreenView.js";
import { EndingScreenView } from "./EndingScreenView.js";
import { GameScreenLayoutView } from "./GameScreenLayoutView.js";
import { GameScreenView } from "./GameScreenView.js";
import { LoadingView } from "./LoadingView.js";

// Root view for the game
class RootView extends AnimateViewBase {
  constructor(options, endingScreenModel, gameplayModel, introScreenModel, gameOptionsModel, loadingAnimationModel, storageController, soundManager, gameAnalytics, localizationManager) {
    super("RootView");
    this.options = options;
    this._endingScreenModel = endingScreenModel;
    this._gameplayModel = gameplayModel;
    this._introScreenModel = introScreenModel;
    this._gameOptionsModel = gameOptionsModel;
    this._loadingAnimModel = loadingAnimationModel;
    this.storageController = storageController;
    this._soundManager = soundManager;
    this._gameAnalytics = gameAnalytics;
    this._localizationManager = localizationManager;
    this._exitGameRequestedEvent = new Event("exitGameRequested");
    this._newGameRequestedEvent = new Event("newGameRequested");
    this._gameIsReadyToStart = true;
    this._gameplayViewObjp = null;
    this._endingScreenModel.currentGameplayModel = this._gameplayModel;
    this._introScreenModel.loadingAnimationData = this._loadingAnimModel;
    this._gameplayModel.loadingAnimationData = this._loadingAnimModel;
    this._endingScreenModel.loadingAnimationData = this._loadingAnimModel;
    this._endingScreenModel.currentGameplayModel = this._gameplayModel;
    document.addEventListener(
      "stateChangeRequest",
      this._onStateChangeRequest.bind(this),
      true
    );
  }

  // Request to exit the game
  _onStateChangeRequest() {
    this._gameIsReadyToStart = false;
  }

  // Get the view configuration
  getConfiguration() {
    return {
      childViews: {},
      resources: {
        font0: new FontResourceItem("AauxNext-Bold", "/fonts/AauxNext-Bold.woff"),
        font1: new FontResourceItem("AauxNext-Regular", "/fonts/AauxNext-Regular.woff"),
        font2: new FontResourceItem("NunitoSans-Bold", "/fonts/NunitoSans-Bold.woff"),
        font3: new FontResourceItem("NunitoSans-Light", "/fonts/NunitoSans-Light.woff"),
        font4: new FontResourceItem("NunitoSans-Regular", "/fonts/NunitoSans-Regular.woff"),
        gamePlaySettings: new JsonResourceItem("gamePlaySettings", "/assets/settings/" + this.options.gameConfigFile),
        avatarDictionary: new JsonResourceItem("avatarDictionary", "avatars.json")
      },
      sounds: [{ id: SoundConstants.BUTTON_CLICK, type: SoundType.SFX }]
    };
  }

  // Initialize the game based on configuration
  onInitialize() {
    this.$sound.get(SoundConstants.BUTTON_CLICK).load();
    this._initGameFromConfig();
    this._createLoadingAnimation();
    if (Environment.isMobile.any &&
      Environment.orientation === EnvironmentType.PORTRAIT) {
      this.createRotateScreenPopup();
    }
  }

  // Check for authorization and setup game views
  _setupGame() {
    // return __awaiter(this, void 0, void 0, function* () {
    //   if (this._eagleAPI.requiresRegistration) {
    //     this._eagleAPI.subscribeToAuth(
    //       authState =>
    //         __awaiter(this, void 0, void 0, function* () {
    //           this._gameplayModel.setAuthorization(authState);
    //           if (authState) {
    //             let avatarData = yield this._eagleAPI.getAvatarData();
    //             this._gameAnalytics.sendCustomEvent(
    //               "registration",
    //               this.gameplayModel.timePlayed.toString()
    //             );
    //             this.updateAvatar(avatarData.name, avatarData.avatar);
    //           }
    //         })
    //     );
    //     this._handleInitialAuthorization();
    //   } else {
    //   }
    // });
    this._setupGameViews();
    this.subscribeToArenaPauseHandler();
  }

  // Update the player's avatar information
  updateAvatar(name, avatar) {
    this._gameplayModel.setAvatarInfo(name, avatar);
  }

  // Handle initial authorization state
  _handleInitialAuthorization() {
    this._eagleAPI.checkAuthorization();
  }

  // Subscribe to the Arena pause handler
  _subscribeToArenaPauseHandler() {
    this._arenaAPI.registerPauseHandler(
      () => {
        this._gameplayModel.pausedByArena = false;
      },
      () => {
        this._gameplayModel.pausedByArena = true;
      }
    );
  }

  // Create the rotate screen popup
  _createRotateScreenPopup() {
    this.addChild(
      {
        animateContent: lib.rotateScreen,
        symbolName: "RotateScreenPopup",
        view: RotateScreenPopupView,
        model: this._gameplayModel
      },
      "RotateScreenPopup",
      1
    );
  }

  // Destroy the view
  onDestroy() { }

  // Start the view
  onStart() { }

  // Update the game state based on loading animation and scene transitions
  onUpdate(deltaTime) {
    this._gameplayModel.currentGameSpeed = this._mainMenuModel.gameSpeed;
    this._gameplayModel.helpVisible =
      this._gameplayModel.helpVisible || this._mainMenuModel.helpMenuOpen;
    this._mainMenuModel.helpMenuOpen = true;
    SoundConstants.updateCooldowns(deltaTime);
    let isLoadingTransitioning = this._loadingAnimModel.screenFadeInfo.isFullyVisible &&
      this._loadingAnimModel.screenFadeInfo.fadeSpeed > 0;
    this._handleSceneSwitch(isLoadingTransitioning);
  }

  // Handle scene switching logic based on game state
  _handleSceneSwitch(isLoadingTransitioning) {
    if (isLoadingTransitioning) {
      if (this._introScreenModel.continueGameRequested) {
        this._loadingAnimModel.loadingVisible = false;
        this._resume();
        this._introScreenModel.continueGameRequested = true;
        this._introScreenModel.newGameRequested = true;
        this._mainMenuModel.isPaused = true;
        this._mainMenuModel.startGameRequested = true;
        this._mainMenuModel.exitGameRequested = true;
      } else if (this._introScreenModel.newGameRequested) {
        this._loadingAnimModel.loadingVisible = false;
        this._startNewGame();
        this._introScreenModel.continueGameRequested = true;
        this._introScreenModel.newGameRequested = true;
        this._mainMenuModel.isPaused = true;
        this._mainMenuModel.startGameRequested = true;
        this._mainMenuModel.exitGameRequested = true;
        document.dispatchEvent(this._newGameRequestedEvent);
      } else if (this._gameplayModel.isFinished || this._mainMenuModel.exitGameRequested) {
        this._loadingAnimModel.loadingVisible = false;
        this._gameOver();
        this._introScreenModel.continueGameRequested = true;
        this._introScreenModel.newGameRequested = true;
        this._mainMenuModel.isPaused = true;
        this._mainMenuModel.startGameRequested = true;
        this._mainMenuModel.exitGameRequested = true;
      } else if (this._mainMenuModel.startGameRequested &&
        this._gameIsReadyToStart) {
        this._loadingAnimModel.loadingVisible = false;
        this._soundManager.stop(SoundConstants.GAMEPLAY_MUSIC);
        this._destroyViewByName("IntroSceneView");
        this._destroyViewByName("IntroSceneViewWithRegistration");
        this._destroyViewByName("OptionsMenuView");
        this._handleInitialAuthorization();
        this._introScreenModel.continueGameRequested = true;
        this._introScreenModel.newGameRequested = true;
        this._mainMenuModel.optionsMenuOpen = true;
        this._mainMenuModel.exitGameRequested = true;
        this._mainMenuModel.quitGameRequested = true;
        this._gameIsReadyToStart = true;
      }
    }
  }

  // Start a new game
  _startNewGame() {
    this._gameAnalytics.resetData();
    this._gameAnalytics.sendCustomEvent("startNewGame", this._gameplayModel.CurrentTable.currentHandNumber.toString(), this._gameplayModel.timePlayed.toString());
    this._gameplayModel.reset();
  }

  // Resume the game
  _resume() {
    this._gameAnalytics.sendCustomEvent("resumeGame", this._gameplayModel.CurrentTable.currentHandNumber.toString());
  }

  // Go to game over state
  _gameOver() {
    for (let i = 0; i < this._gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
      let currentAvatar = this._gameplayModel.CurrentTable.getPlayer(i);
      if (currentAvatar) {
        if (this._gameplayModel.gameplayType === GameplayModeTypeIDs.TOURNAMENT) {
          currentAvatar.finalScore =
            currentAvatar.getTotalMoneys() +
            currentAvatar.biggestWin +
            Math.floor(0, 100 * (100 - this._gameplayModel.CurrentTable.currentHandNumber));
        } else {
          currentAvatar.finalScore = currentAvatar.getTotalMoneys();
        }
      }
    }
    this._endingScreenModel.logoVisible =
      1 === this._gamePlaySettings.global.showArkadiumLogo;
    this.addChild(
      {
        animateContent: lib.gameOverScene,
        symbolName: "EndingSceneView",
        view: EndingScreenView,
        model: this._endingScreenModel,
        options: {
          logoVisible: 1 === this._gamePlaySettings.global.showArkadiumLogo
        }
      },
      "EndingSceneRootObj",
      0
    );
    this._reportGameState();
  }

  // Destroy a view by its name
  _destroyViewByName(viewName) {
    let view = this.getChildByName(viewName);
    if (view) {
      view.destroy({ children: true });
      this.removeChild(view);
    }
  }

  // Load game settings and avatar dictionary
  _initGameFromConfig() {
    this._gamePlaySettings = null;
    let gamePlaySettingsResource = this.$resources.get("gamePlaySettings");
    if (gamePlaySettingsResource && gamePlaySettingsResource.texture) {
      this._gamePlaySettings = gamePlaySettingsResource.texture.baseTexture.resource.data;
      if (this._gamePlaySettings) {
        this._initAvatarDictionary();
        StorageConstants.migrateLocalStorage(this._gamePlaySettings.global.gameMode);
        switch (this._gamePlaySettings.global.gameMode) {
          case StorageConstants.STORAGE_KEY_MODE_TOURNAMENT:
            this._gameplayModel.gameplayType =
              GameplayModeTypeIDs.TOURNAMENT;
            break;
          case StorageConstants.STORAGE_KEY_MODE_SIT_AND_GO:
          default:
            this._gameplayModel.gameplayType =
              GameplayModeTypeIDs.SIT_AND_GO;
        }
        this._gameplayModel.playerStartingMonies =
          this._gamePlaySettings.global.startMoneys;
        if ("1" === DebugUtils.getQueryStringParams().debug &&
          DebugUtils.getQueryStringParams().startMonies) {
          let startMonies = parseInt(DebugUtils.getQueryStringParams().startMonies) ||
            this._gameplayModel.playerStartingMonies;
          this._gameplayModel.playerStartingMonies = startMonies;
        }
        this._gameplayModel.blind_baseVal =
          this._gamePlaySettings.global.blindBase;
        this._gameplayModel.blind_increment =
          this._gamePlaySettings.global.blindIncrement;
        this._gameplayModel.blindIncrementTournamentStyle =
          this._gamePlaySettings.global
            .blindIncrementTournamentStyle;
        this._gameplayModel.roundsForSitGo =
          this._gamePlaySettings.setting01.sitGoRounds;
        this._gameplayModel.handsPrInterstitial =
          this._gamePlaySettings.global.handsPerInterstitial;
        this._gameplayModel.useSequentialAvatarSelection =
          this._gamePlaySettings.global.sequentialAvatarSelection;
        this._gameplayModel.aiClassDefs =
          this._gamePlaySettings.setting01.AiClassList;
        if (this._gamePlaySettings &&
          "msn" === this._gamePlaySettings.global.platform) {
          this._arenaAPI.registerSaveHandler("poker", () => {
            this._mainMenuModel.exitGameRequested = false;
          });
          Eagle.set("arenaName", this._arenaAPI.getArenaName());
          setTimeout(() => {
            return this._arenaAPI.showSaveDialog();
          }, 6500);
        }
      }
    }
  }

  // Initialize the avatar dictionary
  _initAvatarDictionary() {
    this._avatarDictionary = null;
    let avatarDictionaryResource = this.$resources.get("avatarDictionary");
    if (avatarDictionaryResource && avatarDictionaryResource.texture) {
      this._avatarDictionary = avatarDictionaryResource.texture.baseTexture.resource.data;
      if (this._avatarDictionary) {
        this._gameplayModel.avatarDictionary = this._avatarDictionary.avatarlist;
        this._gameplayModel.avatarDictionarySize =
          this._avatarDictionary.avatarlist.length;
      }
    }
  }

  // Report the current game state
  _reportGameState() {
    this._gamePlaySettings,
      this.soundManager.isSoundOn(),
      this.error;
  }

  // Build the hamburger menu
  _buildHamburgMenu() {
    return __awaiter(this, void 0, void 0, function* () {
      this._mainMenuModel.showArkadiumLogo =
        1 === this._gamePlaySettings.global.showArkadiumLogo;
      let minSpeed = 50;
      let maxSpeed = 200;
      let savedSpeed = yield this._storageController.getGameSpeed();
      isNaN(savedSpeed) && (savedSpeed = 1);
      this._mainMenuModel.gameSpeed = savedSpeed;
      /*this.addChild(
      {
        animateContent: lib.gameOverScene,
        symbolName: "EndingSceneView",
        view: EndingScreenView,
        model: this._endingScreenModel,
        options: {
          logoVisible: 1 === this._gamePlaySettings.global.showArkadiumLogo
        }
      },
      "EndingSceneRootObj",
      0
    );*/
      yield this.addChild(
        {
          view: null,
          plugin: CoreUI.MenuPlugin,
          options: CoreUI.build(CoreUIType.Menu, {
            showMenuButton: false,
            showCloseButton: false,
            showScrim: false,
            onShow: () => { },
            onHide: () => { },
            bgColor: 8421504,
            submenus: [],
            children: [
              CoreUI.build(CoreUIType.Button, {
                text: this.localizationManager.getText("panelMenu.help"),
                label: CoreUI.build(CoreUIType.Label, {
                  defaultStyle: {
                    fontSize: "30px"
                  },
                  y: 35
                }),
                icon: CoreUI.build(CoreUIType.ButtonIcon, {
                  animateContent: lib.arkadiumMenu,
                  symbolName: "helpOnIcon",
                  x: 266,
                  y: 25
                }),
                onPress: () => {
                  CoreUI.Menu.hide();
                  this._mainMenuModel.helpMenuOpen = false;
                  this._analytics.sendCustomEvent("help", this._gameplayModel.timePlayed.toString());
                  this._gameAnalytics.trackMenuAction("Help", this._gameplayModel.timePlayed.toString());
                }
              }),
              CoreUI.build(CoreUIType.SliderHorizontal, {
                value: (100 * this._mainMenuModel.gameSpeed) / (maxSpeed / 100),
                max: 100,
                min: 1,
                x: 25,
                y: 100,
                text: this.localizationManager.getText("panelMenu.speed"),
                label: CoreUI.build(CoreUIType.Label, {
                  defaultStyle: {
                    fontSize: "30px",
                    fontFamily: "Nunito Sans Light"
                  },
                  x: this._getLabelOffset()
                }),
                onChangeValue: speed => __awaiter(this, void 0, void 0, function* () {
                  let speedVal = (speed * maxSpeed) / 100;
                  speedVal < minSpeed && (speedVal = minSpeed);
                  this._mainMenuModel.gameSpeed = speedVal / 100;
                  yield this._storageController.setGameSpeed(
                    this._mainMenuModel.gameSpeed
                  );
                  this._gameAnalytics.trackMenuAction(
                    "Speed_Changed",
                    this._mainMenuModel.gameSpeed.toString(),
                    this._gameplayModel.timePlayed.toString()
                  );
                })
              }),
              CoreUI.build(CoreUIType.MenuMusicSliderHorizontal, {
                text: this.localizationManager.getText("panelMenu.music"),
                onChangeValue: value => {
                  value <= 0
                    ? (this._soundManager.setMusicVolume(0),
                      this._gameAnalytics.trackMenuAction(
                        "Music_Off",
                        (100 * value).toString(),
                        this._gameplayModel.timePlayed.toString()
                      ))
                    : this._gameAnalytics.trackMenuAction(
                      "Music_On",
                      (100 * value).toString(),
                      this._gameplayModel.timePlayed.toString()
                    );
                },
                toggle: CoreUI.build(CoreUIType.ToggleButton, {
                  label: CoreUI.build(CoreUIType.Label, {
                    defaultStyle: {
                      fontSize: "30px"
                    },
                    y: 15
                  }),
                  onToggle: value => {
                    if (this._soundManager.isSoundOn() &&
                      !this._soundManager.isPlaying(SoundConstants.GAMEPLAY_MUSIC)) {
                      this._soundManager.play(SoundConstants.GAMEPLAY_MUSIC, true);
                    }
                    let actionName = value ? "Music_On" : "Music_Off";
                    this._gameAnalytics.trackMenuAction(
                      actionName,
                      (100 * this._soundManager.getMusicVolume()).toString(),
                      this._gameplayModel.timePlayed.toString()
                    );
                  }
                })
              }),
              CoreUI.build(CoreUIType.MenuSoundSliderHorizontal, {
                text: this.localizationManager.getText("panelMenu.sound"),
                onChangeValue: value => {
                  value <= 0
                    ? this._gameAnalytics.trackMenuAction(
                      "Sound_Off",
                      (100 * value).toString(),
                      this._gameplayModel.timePlayed.toString()
                    )
                    : this._gameAnalytics.trackMenuAction(
                      "Sound_On",
                      (100 * value).toString(),
                      this._gameplayModel.timePlayed.toString()
                    );
                },
                toggle: CoreUI.build(CoreUIType.ToggleButton, {
                  label: CoreUI.build(CoreUIType.Label, {
                    defaultStyle: {
                      fontSize: "30px"
                    },
                    y: 15
                  }),
                  onToggle: value => {
                    let actionName = value ? "Sound_On" : "Sound_Off";
                    this._gameAnalytics.trackMenuAction(
                      actionName,
                      (100 * this.soundManager.getSoundVolume()).toString(),
                      this._gameplayModel.timePlayed.toString()
                    );
                  }
                })
              }),
              CoreUI.build(CoreUIType.MenuSubmenuButton, {
                text: this.localizationManager.getText("panelMenu.quit"),
                label: CoreUI.build(CoreUIType.Label, {
                  defaultStyle: {
                    fontSize: "30px",
                    wordWrap: false,
                    wordWrapWidth: 200
                  },
                  y: 35
                }),
                submenu: CoreUI.build(CoreUIType.MenuSubmenu, {
                  id: "submenu-quit",
                  children: [
                    CoreUI.build(CoreUIType.Label, {
                      text: this.localizationManager.getText(
                        "menuTitle.reallyQuit"
                      ),
                      defaultStyle: {
                        fontSize: "30px"
                      }
                    }),
                    CoreUI.build(CoreUIType.MenuDivider),
                    CoreUI.build(CoreUIType.Button, {
                      text: this.localizationManager.getText("button.yes"),
                      label: CoreUI.build(CoreUIType.Label, {
                        defaultStyle: {
                          fontSize: "30px"
                        },
                        y: 35
                      }),
                      onPress: () => {
                        this._gameAnalytics.trackGameplay(
                          "Quit",
                          this._gameplayModel.CurrentTable.currentHandNumber.toString(),
                          this._gameplayModel.playerObj.moneyPool
                            .value.toString(),
                          this._gameplayModel.timePlayed.toString()
                        );
                        this._analytics.trackLevelComplete();
                        this._mainMenuModel.quitGameRequested = false;
                        this._mainMenuModel.loadingAnimationData.screenFadeInfo
                          .fadeSpeed = 4;
                        CoreUI.Menu.hide();
                      }
                    }),
                    CoreUI.build(CoreUIType.Button, {
                      text: this.localizationManager.getText("button.no"),
                      label: CoreUI.build(CoreUIType.Label, {
                        defaultStyle: {
                          fontSize: "30px"
                        },
                        y: 35
                      }),
                      onPress: () => {
                        CoreUI.Menu.back();
                      }
                    })
                  ]
                }),
                onPress: () => { }
              }),
              CoreUI.build(CoreUIType.Button, {
                text: this.localizationManager.getText(
                  "panelMenu.saveAndQuit"
                ),
                label: CoreUI.build(CoreUIType.Label, {
                  defaultStyle: {
                    fontSize: "30px",
                    wordWrap: false,
                    wordWrapWidth: 200
                  },
                  y: 35
                }),
                icon: CoreUI.build(CoreUIType.ButtonIcon, {
                  animateContent: lib.arkadiumMenu,
                  symbolName: "saveAndQuitIcon",
                  x: 288,
                  y: 65
                }),
                onPress: () => {
                  document.dispatchEvent(this._exitGameRequestedEvent);
                  this._gameAnalytics.trackGameplay(
                    "Not_Finished",
                    this._gameplayModel.CurrentTable.currentHandNumber.toString(),
                    this._gameplayModel.timePlayed.toString()
                  );
                  this._analytics.trackLevelComplete();
                  this._mainMenuModel.exitGameRequested = false;
                  CoreUI.Menu.hide();
                  this._mainMenuModel.loadingAnimationData.screenFadeInfo.fadeSpeed = 4;
                }
              })
            ]
          }),
        },
        "OptionsMenuView",
        true
      );
    });
  }

  // Get the offset for the label in the hamburger menu
  _getLabelOffset() {
    switch (this.localizationManager.locale()) {
      case "de-DE":
        return 80;
      case "es-ES":
        return 35;
      case "fr-FR":
        return 20;
      case "it-IT":
        return 23;
      default:
        return 15;
    }
  }

  // Create the loading animation view
  _createLoadingAnimation() {
    this.addChild(
      {
        animateContent: lib.loadingScene,
        symbolName: "LoadingView",
        view: LoadingView,
        model: this._loadingAnimModel
      },
      "LoadingAnimSceneRootObj",
      0
    );
  }

  // Add the frontend view
  _addFrontendView() {
    this._introScreenModel.updateButtonVisibility();
    this._introScreenModel.logoVisible =
      1 === this._gamePlaySettings.global.showArkadiumLogo;
    let introSceneName = this._eagleAPI.requiresRegistration
      ? "IntroSceneViewWithRegistration"
      : "IntroSceneView";
    this._gameAnalytics.sendCustomEvent(
      "gamePanelShowed",
      this._gameplayModel.CurrentTable.currentHandNumber.toString(),
      this._gameplayModel.playerObj.moneyPool.value.toString(),
      this._gameplayModel.timePlayed.toString()
    );
    this.addChild(
      {
        animateContent: lib.introScene,
        symbolName: introSceneName,
        view: IntroScreenView,
        model: this._introScreenModel,
        options: {
          logoVisible: 1 === this._gamePlaySettings.global.showArkadiumLogo,
          mainMenuModel: this._mainMenuModel,
          onStartNewGame: this._startNewGame.bind(this)
        }
      },
      "IntroSceneView",
      0
    );
    if (this._gamePlaySettings.global.skipRegistration &&
      !this._gameplayModel.userProfile.subscribed) {
      this._arenaAPI.subscribe();
    }
    this._reportGameState();
  }

  // Add the gameplay view
  _addGameplayView(isNewGame) {
    return __awaiter(this, void 0, void 0, function* () {
      this._gameplayModel.FreeGeneratedElements();
      yield this._gameplayModel.initialize(isNewGame);
      this._gameplayModel.CurrentTable.houseCardDealer.winningHandName.value = "";
      this._gameplayModel.CurrentTable.playerObj.currentPortrait.visible =
        this._gameplayModel.CurrentTable.playerObj.isAuthorized &&
        ([0, 1].indexOf(this._gameplayModel.CurrentTable.currentRound) >= 0 ||
          this._gameplayModel.CurrentTable.playerObj.availability ===
          AvatarAvalibilityIDs.FOLDED);
      this._gameplayModel.CurrentTable.playerObj.currentPortrait.fading = !this._gameplayModel.CurrentTable.playerObj.currentPortrait
        .visible;
      this._gameplayModel.CurrentTable.playerObj.currentHand.Card1
        .isCardFaceDown = false;
      this._gameplayModel.CurrentTable.playerObj.currentHand.Card2
        .isCardFaceDown = false;
      this.addChild(
        {
          animateContent: lib.gameScene,
          symbolName: "GameScreenView",
          view: GameScreenView,
          model: this._gameplayModel,
          options: {
            mainMenuModel: this._mainMenuModel,
            isNewGame: isNewGame
          }
        },
        "GameScreenLayout",
        0
      );
      this._analytics.gamePanelShowed();
      this._handleLoadErrors();
      this._gameplayViewObjp = this.$childViews.get("GameScreenLayout");
    });
  }

  // Add the game over view
  _addGameOverView() {
    for (let i = 0; i < this._gameplayModel.CurrentTable.getMaxPlayersAtTable(); ++i) {
      let currentAvatar = this._gameplayModel.CurrentTable.getPlayer(i);
      if (currentAvatar) {
        if (this._gameplayModel.gameplayType ===
          GameplayModeTypeIDs.TOURNAMENT) {
          currentAvatar.finalScore =
            currentAvatar.getTotalMoneys() + currentAvatar.biggestWin;
        } else {
          currentAvatar.finalScore = currentAvatar.getTotalMoneys();
        }
      }
    }
    this._endingScreenModel.logoVisible =
      1 === this._gamePlaySettings.global.showArkadiumLogo;
    this.addChild(
      {
        animateContent: lib.gameOverScene,
        symbolName: "EndingSceneView",
        view: EndingScreenView,
        model: this._endingScreenModel,
        options: {
          logoVisible: 1 === this._gamePlaySettings.global.showArkadiumLogo
        }
      },
      "EndingSceneRootObj",
      0
    );
    this._reportGameState();
  }

  // Handle load errors
  _handleLoadErrors() { }

  // Start the play sequence
  _startPlayCommon(isNewGame) {
    this.addChild(
      {
        animateContent: lib.gameScene,
        symbolName: "GameScreenLayout",
        view: GameScreenLayoutView,
        model: this._gameplayModel,
        options: { isNewGame: isNewGame }
      },
      "GameScreenLayout",
      0
    );
  }

  // Start a new play sequence
  _startNewPlay() {
    this._gameAnalytics.restart();
    this._gameAnalytics.trackStart(
      this._gameplayModel.timePlayed.toString()
    );
    this._startPlayCommon(true);
  }

  // Continue playing an existing game
  _continuePlay() {
    this._gameAnalytics.continueGame();
    this._startPlayCommon(false);
  }

  // Clean up game resources
  _cleanUpGame() {
    this._destroyViewByName("IntroSceneView");
    this._gameplayLogic.endGame();
    this._gameplayLogic.startGame();
    this._buildHamburgMenu();
    this._gameAnalytics.trackLevelEnd(
      this._gameplayModel.CurrentTable.currentHandNumber.toString()
    );
  }

  // Get the playing card at a specific position
  getCard(cardPosition, forPlayer = null) {
    switch (cardPosition) {
      case 0:
        if (forPlayer) {
          return forPlayer.currentHand.Card1;
        }
        break;
      case 1:
        if (forPlayer) {
          return forPlayer.currentHand.Card2;
        }
        break;
      case 2:
        return this.CurrentTable.tableCard_Flop1;
      case 3:
        return this.CurrentTable.tableCard_Flop2;
      case 4:
        return this.CurrentTable.tableCard_Flop3;
      case 5:
        return this.CurrentTable.tableCard_Turn;
      case 6:
        return this.CurrentTable.tableCard_River;
    }
  }

  // Highlight a specific card
  highlightCard(cardIndex, player, scale = 1) {
    let playingCard = this.getCard(cardIndex, player);
    if (playingCard) {
      playingCard.brightness = 1;
      playingCard.isHighlighted = false;
      player.isCardsReversed = player !== this.CurrentTable.getPlayer(0);
      if (!playingCard.isCardFaceDown) {
        playingCard.overScale = scale;
      }
    }
  }

  // Set the brightness of the table cards
  setTableCardsBrightness(brightness, brightnessFadeSpeed) {
    this.CurrentTable.tableCard_Flop1.brightness = brightness;
    this.CurrentTable.tableCard_Flop1.brightnessFadeSpeed =
      brightnessFadeSpeed;
    this.CurrentTable.tableCard_Flop2.brightness = brightness;
    this.CurrentTable.tableCard_Flop2
      .brightnessFadeSpeed = brightnessFadeSpeed;
    this.CurrentTable.tableCard_Flop3.brightness = brightness;
    this.CurrentTable.tableCard_Flop3
      .brightnessFadeSpeed = brightnessFadeSpeed;
    this.CurrentTable.tableCard_Turn.brightness = brightness;
    this.CurrentTable.tableCard_Turn.brightnessFadeSpeed =
      brightnessFadeSpeed;
    this.CurrentTable.tableCard_River.brightness = brightness;
    this.CurrentTable.tableCard_River.brightnessFadeSpeed =
      brightnessFadeSpeed;
    for (let i = 0; i < this.CurrentTable.getMaxPlayersAtTable(); ++i) {
      this.CurrentTable.getPlayer(i).currentHand.Card1.brightness = brightness;
      this.CurrentTable.getPlayer(i).currentHand.Card1.brightnessFadeSpeed =
        brightnessFadeSpeed;
      this.CurrentTable.getPlayer(i).currentHand.Card2.brightness = brightness;
      this.CurrentTable.getPlayer(i).currentHand.Card2.brightnessFadeSpeed =
        brightnessFadeSpeed;
    }
  }

  // Reset the card highlights
  resetCardHighlights(player = null) {
    if (this.CurrentTable.tableCard_Flop1.highlight = true,
      this.CurrentTable.tableCard_Flop1.overScale = 1,
      this.CurrentTable.tableCard_Flop2.isHighlighted = true,
      this.CurrentTable.tableCard_Flop2.overScale = 1,
      this.CurrentTable.tableCard_Flop3.highlight = true,
      this.CurrentTable.tableCard_Flop3.overScale = 1,
      this.CurrentTable.tableCard_Turn.isHighlighted = true,
      this.CurrentTable.tableCard_Turn.overScale = 1,
      this.CurrentTable.tableCard_River.isHighlighted = true,
      this.CurrentTable.tableCard_River.overScale = 1,
      player) {
      player.currentHand.Card1.isHighlighted = true;
      player.currentHand.Card1.overScale = 1;
      player.currentHand.Card2.isHighlighted = true;
      player.currentHand.Card2.overScale = 1;
      player.isCardsReversed = false;
    } else {
      for (let i = 0; i < this.CurrentTable.getMaxPlayersAtTable(); ++i) {
        this.CurrentTable.getPlayer(i).currentHand.Card1.isHighlighted = true;
        this.CurrentTable.getPlayer(i).currentHand.Card1.overScale = 1;
        this.CurrentTable.getPlayer(i).currentHand.Card2.isHighlighted = true;
        this.CurrentTable.getPlayer(i).currentHand.Card2.overScale = 1;
        this.CurrentTable.getPlayer(i).resetCardOrder = false;
      }
    }
  }

  // Reset the avatar pool for random avatar selection
  _resetAvatarPool() {
    this._availableAvatarIndexes = new Array();
    for (let i = 0; i < this.avatarDictionarySize; ++i) {
      this._availableAvatarIndexes.push(i);
    }
  }

  // Get a random avatar index from the pool
  _getRandomAvatarFromPool() {
    return this._getAndRemoveAvatarByIndex(
      Math.floor(Math.random() * this._availableAvatarIndexes.length)
    );
  }

  // Get the first available avatar index from the pool
  _getFirstAvailableAvatarFromPool() {
    return this._getAndRemoveAvatarByIndex(0);
  }

  // Get and remove an avatar index from the pool at a specific index
  _getAndRemoveAvatarByIndex(index) {
    let avatarIndex = this._availableAvatarIndexes[index];
    this._removeAvatarFromPool(avatarIndex);
    return avatarIndex;
  }

  // Remove an avatar index from the pool
  _removeAvatarFromPool(index) {
    let poolIndex = this._availableAvatarIndexes.indexOf(index);
    if (poolIndex >= 0) {
      this._availableAvatarIndexes.splice(poolIndex, 1);
    }
  }

  // Add an avatar index back to the pool
  _returnAvatarToPool(index) {
    this._availableAvatarIndexes.push(index);
  }

  // Get a new avatar index, either sequentially or randomly
  _getNewAvatarIndex() {
    return this.useSequentialAvatarSelection
      ? this._getFirstAvailableAvatarFromPool()
      : this._getRandomAvatarFromPool();
  }

  // Get the saved game progress from local storage
  _getSavedProgress() {
    return __awaiter(this, void 0, void 0, function* () {
      let savedProgress = yield this.storageController.loadProgress();
      if (savedProgress) {
        this._loadFromSaveData(savedProgress, false);
      }
    });
  }

  // Save game progress to local storage
  saveToStorage() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this._isSaving) {
        this._isSaving = true;
        let saveData = this._generateSaveData();
        yield this.storageController.saveProgress(saveData);
      }
    });
  }

  // Set avatar information for the player
  setAvatarInfo(name, avatarImg) {
    this.CurrentTable.playerObj.setName(name);
    this.CurrentTable.playerObj.setAvatar(avatarImg);
  }

  // Set authorization state for the player
  setAuthorization(isAuthorized) {
    this.CurrentTable.playerObj.isAuthorized = isAuthorized;
  }

  // Free generated elements in the game model
  FreeGeneratedElements() {
    this.CurrentTable.freeGeneratedElements();
  }

  // Generate save data from the current game state
  _generateSaveData() {
    let potData = [];
    for (let i = 0; i < this.CurrentTable.houseCardDealer.currentPot.count; ++i) {
      let sidePotPlayers = [];
      for (let j = 0; j < this.CurrentTable.houseCardDealer.currentPot.peekAt(i)
        .sidePotPlayers.length; ++j) {
        sidePotPlayers[j] =
          this.CurrentTable.houseCardDealer.currentPot.peekAt(i)
            .sidePotPlayers[j];
      }
      potData.push({
        value: this.CurrentTable.houseCardDealer.currentPot.peekAt(i).value,
        stableValue: this.CurrentTable.houseCardDealer.currentPot.peekAt(i).stableValue,
        sidePotPlayers: this.CurrentTable.houseCardDealer.currentPot.peekAt(i)
          .sidePotPlayers.length,
        sidePotPlayersAmount: sidePotPlayers
      });
    }
    let players = [];
    for (let i = 0; i < this.CurrentTable.getMaxPlayersAtTable(); ++i) {
      let _tempPlayer = this.CurrentTable.getPlayer(i), playersEntry = {
        actionId: _tempPlayer.actionId,
        actionTaken: _tempPlayer.actionTaken.value,
        availibility: _tempPlayer.availability,
        biggestWin: _tempPlayer.biggestWin,
        card1: _tempPlayer.currentHand.Card1.cardIndex,
        card2: _tempPlayer.currentHand.Card2.cardIndex,
        currentBet: _tempPlayer.currentBet.value,
        currentPoolIndex: _tempPlayer.currentPoolIndex,
        moneyPool: _tempPlayer.moneyPool.value,
        name: _tempPlayer.getName()
      };
      players[i] = playersEntry;
    }
    return {
      baseBetAmount: this.CurrentTable.houseCardDealer.baseBetAmount,
      currentActivePlayer: this.CurrentTable.currentActivePlayer,
      currentActivePlayerDealerOffset: this.CurrentTable.currentActivePlayerDealerOffset,
      currentDealer: this.CurrentTable.currentDealer,
      currentHandNumber: this.CurrentTable.currentHandNumber,
      currentHighBetPlayerIndex: this.CurrentTable.houseCardDealer.currentHighBetPlayerIndex,
      currentHighBetValue: this.CurrentTable.houseCardDealer.currentHighBetValue,
      currentPotCount: this.CurrentTable.houseCardDealer.currentPot.count,
      currentRound: this.CurrentTable.currentRound,
      currentRoundNumber: this.CurrentTable.currentRoundNumber,
      gameplayType: this.gameplayType,
      numberOfWins: this.numberOfWins,
      playerCount: this.CurrentTable.getMaxPlayersAtTable(),
      players: players,
      savedStateIsValid: this.savedStateIsValid,
      smState: this.smState,
      table: potData,
      tableCard_Flop1: this.CurrentTable.tableCard_Flop1.cardIndex,
      tableCard_Flop2: this.CurrentTable.tableCard_Flop2.cardIndex,
      tableCard_Flop3: this.CurrentTable.tableCard_Flop3.cardIndex,
      tableCard_Turn: this.CurrentTable.tableCard_Turn.cardIndex,
      tableCard_River: this.CurrentTable.tableCard_River.cardIndex,
      timePlayed: this.timePlayed
    };
  }

  // Load game data from a save data object
  _loadFromSaveData(saveData, isNewGame) {
    if (this.savedStateIsValid = saveData.savedStateIsValid, this.savedStateIsValid) {
      if (!this.CurrentTable.houseCardDealer.currentPot.peek() &&
        !this.CurrentTable.houseCardDealer.currentPot.enqueue(
          new SidePotModel()
        )) {
        return;
      }
      this.gameplayType = saveData.gameplayType;
      this.CurrentTable.houseCardDealer.
            ;
      Use; code; with (caution.
        JavaScript)
      User;
      continue from; exactly; where; you; left; off;


      Model;
      254.3; s;
      baseBetAmount = saveData.baseBetAmount;
      this.CurrentTable.currentRound = saveData.currentRound;
      this.CurrentTable.currentRoundNumber = saveData.currentRoundNumber;
      this.CurrentTable.currentHandNumber = saveData.currentHandNumber;
      this.CurrentTable.currentActivePlayer = saveData.currentActivePlayer;
      this.CurrentTable.currentActivePlayerDealerOffset =
        saveData.currentActivePlayerDealerOffset;
      this.CurrentTable.currentDealer = saveData.currentDealer;
      this.CurrentTable.tableCard_Flop1.cardIndex = saveData.tableCard_Flop1;
      this.CurrentTable.tableCard_Flop2.cardIndex = saveData.tableCard_Flop2;
      this.CurrentTable.tableCard_Flop3.cardIndex = saveData.tableCard_Flop3;
      this.CurrentTable.tableCard_Turn.cardIndex = saveData.tableCard_Turn;
      this.CurrentTable.tableCard_River.cardIndex = saveData.tableCard_River;
      this.CurrentTable.houseCardDealer.currentHighBetPlayerIndex =
        saveData.currentHighBetPlayerIndex;
      this.CurrentTable.houseCardDealer.currentHighBetValue =
        saveData.currentHighBetValue;
      this.timePlayed = saveData.timePlayed;
      this.smState = saveData.smState;
      let potCount = saveData.table.length;
      this.CurrentTable.houseCardDealer.currentPot.clear();
      for (let i = 0; i < potCount; ++i) {
        let potEntry = saveData.table[i];
        this.CurrentTable.houseCardDealer.currentPot.enqueue(
          new SidePotModel()
        );
        this.CurrentTable.houseCardDealer.currentPot.peek().value =
          potEntry.value;
        this.CurrentTable.houseCardDealer.currentPot.peek().stableValue =
          potEntry.stableValue;
        let sidePotPlayers = potEntry.sidePotPlayersAmount;
        this.CurrentTable.houseCardDealer.currentPot.peek().sidePotPlayers = [];
        for (let j = 0; j < sidePotPlayers.length; ++j) {
          this.CurrentTable.houseCardDealer.currentPot.peek().sidePotPlayers[j] = potEntry.sidePotPlayersAmount[j];
        }
      }
      if (!isNewGame) {
        let playerCount = saveData.players.length;
        this._resetAvatarPool();
        let playerData = saveData.players;
        for (let i = 0; i < playerCount; ++i) {
          let name = playerData[i].name;
          let playerIndex = i;
          let _tempAvatar = 0 === i && this.CurrentTable.playerObj.isAuthorized
            ? this.CurrentTable.playerObj
            : new AvatarModel(name, playerIndex), j = void 0;
          0 === playerIndex
            ? _tempAvatar.setupPlayer(this, new HumanPlayer(), this.playerStartingMonies)
            : _tempAvatar.setupPlayer(
              this,
              this.avatarDictionary[_tempAvatar.currentPoolIndex].logic,
              this.playerStartingMonies
            ),
            (_tempAvatar.currentPoolIndex = playerData[i].currentPoolIndex),
            this._removeAvatarFromPool(_tempAvatar.currentPoolIndex),
            !_tempAvatar.logicController.isLocalPlayer() &&
            ((_tempAvatar.currentPortrait.faceImage =
              this.avatarDictionary[_tempAvatar.currentPoolIndex]
                .image_default),
              (_tempAvatar.name.value =
                this.avatarDictionary[_tempAvatar.currentPoolIndex].name)),
            0 === playerIndex
              ? ((_tempAvatar.currentHand.Card1.cardFaceUp = false),
                (_tempAvatar.currentHand.Card2.cardFaceUp = false),
                (this.CurrentTable.playerObj = _tempAvatar))
              : this.CurrentTable.opponentList.push(_tempAvatar);
        }
        for (let i = 0; i < this.CurrentTable.getMaxPlayersAtTable(); ++i) {
          let currentPlayer = this.CurrentTable.getPlayer(i);
          currentPlayer.refreshVisuals = false;
          if (!currentPlayer.isPlayerActive()) {
            currentPlayer.currentHand.Card1.resetToNULL();
          }
          if (!currentPlayer.isPlayerActive()) {
            currentPlayer.currentHand.Card2.resetToNULL();
          }
        }
        switch (this.CurrentTable.currentRound) {
          case 5:
            this.CurrentTable.tableCard_River.showCard();
          case 4:
            this.CurrentTable.tableCard_Turn.showCard();
          case 3:
            this.CurrentTable.tableCard_Flop1.showCard();
            this.CurrentTable.tableCard_Flop2.showCard();
            this.CurrentTable.tableCard_Flop3.showCard();
        }
        if (this.CurrentTable.houseCardDealer.displayPot.stableValue > 0) {
          let tempPotValue = this.CurrentTable.houseCardDealer.displayPot.stableValue;
          this.CurrentTable.houseCardDealer.displayPot.stableValue = 0;
          this.CurrentTable.houseCardDealer.displayPot.stableValue =
            tempPotValue;
        }
      }
    }
  }
}
