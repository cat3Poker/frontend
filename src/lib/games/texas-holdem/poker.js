import { Application, Assets, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { socketData } from '$lib/store/socket';
import { SoundManager, SoundConstants } from "./SoundManager";
import { Button , IconButton} from "./buttons"
const basePath = "/images/poker/";
import { get } from "svelte/store";

const assetNames = [
    "Action_Blue.png",
    "Action_Green.png",
    "Action_Red.png",
    "Action_Tan.png",
    "arkadium_logo_small.png",
    "avatar_14.webp",
    "avatar_21.webp",
    "avatar_24.webp",
    "avatar_35.webp",
    "avatar_49.webp",
    "avatar_blank.png",
    "Backing_Landscape.png",
    "Balance_User_Glow.png",
    "Balance_User_Normal.png",
    "bg.png",
    "Bitmap_31.png",
    "Bitmap_32_copy.png",
    "Bitmap_33.png",
    "Bitmap_33_copy.png",
    "Bitmap_34.png",
    "Bitmap_36.png",
    "Button_Blue.png",
    "Button_Blue_bigger.png",
    "Button_Green.png",
    "Button_Green_bigger.png",
    "Button_Green_Square.png",
    "button_off.png",
    "button_on.png",
    "Button_Red.png",
    "Button_Tan.png",
    "Card_Shadow.png",
    "Chip_Arkadium_Blue.png",
    "Chip_Blue.png",
    "Chip_Green.png",
    "Chip_Purple.png",
    "Chip_Red.png",
    "Chip_Yellow.png",
    "ChipsAndCards.png",
    "ChipsAndCardsSplit.png",
    "David.png",
    "DealerButton.png",
    "Dialog_Backing.png",
    "Dialog_Backing_tall.png",
    "DummyPosition.png",
    "Emma.png",
    "Gabriel.png",
    "GameLogo2.png",
    "Glow_Card_Over.png",
    "Glow_Card_Under.png",
    "hamburger_down.png",
    "hamburger_over.png",
    "header_backing.png",
    "help_icon.png",
    "icon_Minus.png",
    "icon_Plus.png",
    "img_submenu_btn_arrow.png",
    "Isabella.png",
    "Landscape.png",
    "loader_black.mp4",
    "Maria.png",
    "menu_backing.png",
    "menu_bg.png",
    "menu_button_down.png",
    "menu_button_over.png",
    "menu_button_short_down.png",
    "menu_button_short_over.png",
    "menu_button_short_up.png",
    "menu_button_up.png",
    "menu_header_backing.png",
    "Menu_Divider.png",
    "Menu_ExitButton.png",
    "Menu_ExitButton_Hover.png",
    "Menu_ExitButton_HoverDown.png",
    "Menu_IconButton.png",
    "Menu_QuitButton.png",
    "Menu_SoundOffButton.png",
    "Menu_SoundOnButton.png",
    "MobileCards_Back.png",
    "MobileCards_C_T.png",
    "MobileCards_C_2.png",
    "MobileCards_C_3.png",
    "MobileCards_C_4.png",
    "MobileCards_C_5.png",
    "MobileCards_C_6.png",
    "MobileCards_C_7.png",
    "MobileCards_C_8.png",
    "MobileCards_C_9.png",
    "MobileCards_C_A.png",
    "MobileCards_C_J.png",
    "MobileCards_C_K.png",
    "MobileCards_C_Q.png",
    "MobileCards_D_T.png",
    "MobileCards_D_2.png",
    "MobileCards_D_3.png",
    "MobileCards_D_4.png",
    "MobileCards_D_5.png",
    "MobileCards_D_6.png",
    "MobileCards_D_7.png",
    "MobileCards_D_8.png",
    "MobileCards_D_9.png",
    "MobileCards_D_A.png",
    "MobileCards_D_J.png",
    "MobileCards_D_K.png",
    "MobileCards_D_Q.png",
    "MobileCards_H_T.png",
    "MobileCards_H_2.png",
    "MobileCards_H_3.png",
    "MobileCards_H_4.png",
    "MobileCards_H_5.png",
    "MobileCards_H_6.png",
    "MobileCards_H_7.png",
    "MobileCards_H_8.png",
    "MobileCards_H_9.png",
    "MobileCards_H_A.png",
    "MobileCards_H_J.png",
    "MobileCards_H_K.png",
    "MobileCards_H_Q.png",
    "MobileCards_S_T.png",
    "MobileCards_S_2.png",
    "MobileCards_S_3.png",
    "MobileCards_S_4.png",
    "MobileCards_S_5.png",
    "MobileCards_S_6.png",
    "MobileCards_S_7.png",
    "MobileCards_S_8.png",
    "MobileCards_S_9.png",
    "MobileCards_S_A.png",
    "MobileCards_S_J.png",
    "MobileCards_S_K.png",
    "MobileCards_S_Q.png",
    "music_icon.png",
    "music_icon_off.png",
    "Player_Legend_Idle.png",
    "PlayerDisplay.png",
    "PlayerDisplay_On.png",
    "PlayerFrame.png",
    "Portrait.png",
    "quit_panel_backing.png",
    "range.png",
    "Rotate_Screen.png",
    "Samuel.png",
    "SaveIcon.png",
    "scrim_bitmap.png",
    "Shadow.png",
    "Spotlight.png",
    "Texture_DealerBubble.png",
    "TopGradient.png",
];


export class Poker{
    constructor(){
        this.app = new Application();
        this.currentBet = 10
        this.soundManager = new SoundManager();
        this.players = []
    }
    async initLoadingScreen(body) {
        await this.app.init({
            backgroundColor: 0x000,
            width: 1034, height: 534
            // resizeTo: parent,
        });
        body.appendChild(this.app.canvas);

        const assets = assetNames.map((name) => ({
            alias: name.split(".")[0], // Optional: Name assets without extensions
            src: `${basePath}${name}`,
        }));

        // // Load assets
        Assets.add(assets);

        // //Load important assets
        await Assets.load([
            'Backing_Landscape',
            'Landscape',
            "MobileCards_Back",
            "MobileCards_C_T",
            "MobileCards_C_2",
            "MobileCards_C_3",
            "MobileCards_C_4",
            "MobileCards_C_5",
            "MobileCards_C_6",
            "MobileCards_C_7",
            "MobileCards_C_8",
            "MobileCards_C_9",
            "MobileCards_C_A",
            "MobileCards_C_J",
            "MobileCards_C_K",
            "MobileCards_C_Q",
            "MobileCards_D_T",
            "MobileCards_D_2",
            "MobileCards_D_3",
            "MobileCards_D_4",
            "MobileCards_D_5",
            "MobileCards_D_6",
            "MobileCards_D_7",
            "MobileCards_D_8",
            "MobileCards_D_9",
            "MobileCards_D_A",
            "MobileCards_D_J",
            "MobileCards_D_K",
            "MobileCards_D_Q",
            "MobileCards_H_T",
            "MobileCards_H_2",
            "MobileCards_H_3",
            "MobileCards_H_4",
            "MobileCards_H_5",
            "MobileCards_H_6",
            "MobileCards_H_7",
            "MobileCards_H_8",
            "MobileCards_H_9",
            "MobileCards_H_A",
            "MobileCards_H_J",
            "MobileCards_H_K",
            "MobileCards_H_Q",
            "MobileCards_S_T",
            "MobileCards_S_2",
            "MobileCards_S_3",
            "MobileCards_S_4",
            "MobileCards_S_5",
            "MobileCards_S_6",
            "MobileCards_S_7",
            "MobileCards_S_8",
            "MobileCards_S_9",
            "MobileCards_S_A",
            "MobileCards_S_J",
            "MobileCards_S_K",
            "MobileCards_S_Q",
            "Button_Red",
            "Button_Blue",
            "Button_Tan",
            "Button_Green",
            "icon_Plus",
            "icon_Minus",
            "Shadow",
            "PlayerDisplay_On",
            "PlayerDisplay",
            "PlayerFrame",
            "Action_Tan",
            "Action_Blue",
            "Action_Red",
            "Action_Green",
            "Chip_Arkadium_Blue",
            "Balance_User_Normal",
            "Balance_User_Glow",
            "Texture_DealerBubble",
            "DealerButton",
            "Chip_Red",
            "Chip_Purple",
            "Chip_Yellow",
            "Chip_Blue",
            "Chip_Green",
            "Glow_Card_Under",
            "Glow_Card_Over",
            "ChipsAndCards"
        ]);

        const backgroundSprite = Sprite.from(Assets.get('Backing_Landscape'));
        //     // Set the sprite to cover the entire background
        backgroundSprite.width = this.app.screen.width;
        backgroundSprite.height = this.app.screen.height;
        backgroundSprite.x = 0;
        backgroundSprite.y = 0;

        // Add the background sprite to the stage
        this.app.stage.addChild(backgroundSprite);

        this.loaderGraphics = Sprite.from(Assets.get('ChipsAndCards'));
        this.loaderGraphics.width = this.app.screen.width;
        this.loaderGraphics.height = this.app.screen.height;
        this.loaderGraphics.x = 0;
        this.loaderGraphics.y = 0;
        // Add the background sprite to the stage
        this.app.stage.addChild(this.loaderGraphics);
        this.initialize()
    }

    async initialize() {

        this.loaderGraphics.removeFromParent();
        this.loaderGraphics.destroy();
        
        // Add the table
        const Table = Sprite.from(Assets.get('Landscape'));
        Table.width = this.app.screen.width * 1; // Resize to 80% of screen width
        Table.height = this.app.screen.height * 1.15;
        Table.x = (this.app.screen.width - Table.width) / 2;
        Table.y = 0;

        // Add the Table sprite to the stage
        this.app.stage.addChild(Table);
        // drawBoundingBox(this.app, Table)
    
        // // Add Game actions
        this.buttonsContainer = new Container();

    
        const buttonWidth = 70;
        const buttonHeight = 50;
        const buttonPadding = 10;
    
        this.foldButton = new Button(Assets.get('Button_Red'), 'Fold', '', buttonWidth, buttonHeight, this.handleFold.bind(this));
        this.callButton = new Button(Assets.get('Button_Tan'), 'Call', `${this.currentBet}`, buttonWidth, buttonHeight, this.handleCall.bind(this));
        this.minusRaiseButton = new IconButton(Assets.get('Button_Green'), Assets.get('icon_Minus'), buttonHeight, this.handleDecrementRaise.bind(this));
        this.raiseButton = new Button(Assets.get('Button_Green'), 'Raise', '10', buttonWidth, buttonHeight, this.handleRaise.bind(this));
        this.plusRaiseButton = new IconButton(Assets.get('Button_Green'), Assets.get('icon_Plus'), buttonHeight, this.handleIncrementRaise.bind(this));
        this.allInButton = new Button(Assets.get('Button_Blue'), 'All In', '', buttonWidth, buttonHeight, this.handleAllIn);
    
        // // Add buttons to the container with padding
        this.buttonsContainer.addChild(this.foldButton.ui);
        this.buttonsContainer.addChild(this.callButton.ui);
        this.buttonsContainer.addChild(this.minusRaiseButton.ui);
        this.buttonsContainer.addChild(this.raiseButton.ui);
        this.buttonsContainer.addChild(this.plusRaiseButton.ui);
        this.buttonsContainer.addChild(this.allInButton.ui);
    
        this.app.stage.addChild(this.buttonsContainer);
    
        // // Set the position of buttons with padding
        this.foldButton.ui.x = 0;
        this.callButton.ui.x = this.foldButton.ui.x + this.callButton.ui.width + buttonPadding;
        this.minusRaiseButton.ui.x = this.callButton.ui.x + this.callButton.ui.width + buttonPadding;
        this.raiseButton.ui.x = this.minusRaiseButton.ui.x + this.minusRaiseButton.ui.width + buttonPadding;
        this.plusRaiseButton.ui.x = this.raiseButton.ui.x + this.raiseButton.ui.width + buttonPadding;
        this.allInButton.ui.x = this.plusRaiseButton.ui.x + this.plusRaiseButton.ui.width + buttonPadding;
    
    
    
        // Position the buttonsContainer at the mid-bottom of the stage
        this.buttonsContainer.x = (this.app.screen.width - this.buttonsContainer.width) / 2; // Center horizontally
        this.buttonsContainer.y = this.app.screen.height - this.buttonsContainer.height - 10; // Position at the bottom - padding
    
    
        this.waitingText = new Text({
          text: '',
          style: {
            fontSize: 18,
            fill: '#ffffff'
          }
        });
        this.waitingText.anchor.set(0.5)
        this.app.stage.addChild(this.waitingText);
    
        // this.buttonsContainer.alpha = 0;
        // this.waitingText.alpha = 0;
    
        this.waitingText.x = (this.app.screen.width - this.waitingText.width) / 2; // Center horizontally
        this.waitingText.y = this.app.screen.height - this.waitingText.height - 2; // Position at the bottom - padding
    
    
    
        this.cardsContainer = new Container();
        this.cardsContainer.width = Table.width;
        this.cardsContainer.height = Table.height;
        this.cardsContainer.x = Table.x;
        this.cardsContainer.y = 0;
    
    
        this.dealerContainer = new Container();
        const dbg = Sprite.from(Assets.get('Texture_DealerBubble'));
    
        this.dealerContainer.addChild(dbg)
        this.dealerContainer.alpha = 0;
        this.dealerContainer.scale.set(0.8, 0.8)
        const textWidth = dbg.width / 1.5;
        this.dealerText = new Text({
          text: '',
          style: {
            fill: '#000000',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: textWidth,
            fontSize: 25,
            fontStyle: 'italic',
            fontWeight: '400',
          }
        });
        this.dealerContainer.addChild(this.dealerText);
        this.dealerText.anchor.set(0.5, 0.5)
        this.dealerText.x = (this.dealerContainer.width / 2);
        this.dealerText.y = this.dealerContainer.height / 2;
    
        this.defaultCardPosition = {
          x: (this.app.screen.width - 450) / 2,
          y: this.dealerContainer.height + 10
        }
    
    
        this.dealerButton = Sprite.from(Assets.get('DealerButton'));
        this.dealerButton.alpha = 0;
        this.defaultDealerPosition = {
          x: (this.app.screen.width - 450) / 2,
          y: (this.app.screen.height - 100) / 2
        }
        this.dealerButton.x = this.defaultDealerPosition.x;
        this.dealerButton.y = this.defaultDealerPosition.y;
        this.dealerButton.scale.set(0.15, 0.15)
        this.cardsContainer.addChild(this.dealerButton)
    
    
        /// Pot Container
    
        this.potContainer = new Container();
        const stackContainer = new Container();
        this.potText = new Text({
          text: '5,000',
          style: {
            fill: '#ffffff',
            align: 'center',
            fontSize: 25,
            fontWeight: 'bolder'
          }
        });
        this.potText.y = 80;
        let stackHeight = 50;
        for (let index = 0; index < 6; index++) {
          const chip = Sprite.from('Chip_Green');
          chip.scale.set(0.5, 0.5)
          stackContainer.addChild(chip);
          chip.y = stackHeight
          stackHeight -= 8;
        }
        stackContainer.scale.set(0.4, 0.4)
        this.potContainer.addChild(stackContainer);
        this.potContainer.addChild(this.potText)
    
    
    
    
    
        //Players
        this.playersContainer = new Container();
        this.playersContainer.width = Table.width;
        this.playersContainer.height = Table.height;
        this.playersContainer.x = Table.x;
        this.playersContainer.y = 0;
    
    
    
        this.app.stage.addChild(this.cardsContainer, this.playersContainer, this.dealerContainer, this.potContainer);
    
        this.potContainer.x = (this.app.screen.width - this.potContainer.width) / 2;
        const centerY = this.app.screen.height / 2;
        this.potContainer.y = centerY - this.app.screen.height * 0.26;
        this.dealerContainer.x = (this.app.screen.width - this.dealerContainer.width) / 2; // Center horizontally
        this.dealerContainer.y = this.app.screen.height - this.dealerContainer.height - 40; // Position at the bottom - padding
    
    
        // //Game Control Buttons
        // const gameControls = new Container();
        // const shareButton = new Button(Assets.get('Button_Blue'), 'Share', '', buttonWidth, buttonHeight, this.handleShare.bind(this));
        // const exitButton = new Button(Assets.get('Button_Red'), 'Exit', '', buttonWidth, buttonHeight, this.handleExit.bind(this));
        // // gameControls.addChild(shareButton.ui);
    
    
        // this.app.stage.addChild(gameControls);
        // // exitButton.ui.y = buttonPadding + buttonHeight
        // gameControls.x = 20;
        // gameControls.y = this.app.screen.height / 2 - buttonHeight * 2;
    
    
        // // BG music
        // this.soundManager.play(SoundConstants.GAMEPLAY_MUSIC, 0, 1, true)
    
        // this.continueButton = new Button(Assets.get('Button_Blue'), 'Continue Playing', '', buttonWidth + 120, buttonHeight, this.handleContinueGame.bind(this));
        // this.continueButton.ui.alpha = 0;
        // this.app.stage.addChild(this.continueButton.ui)
    
        // this.continueButton.ui.x = (this.app.screen.width - this.continueButton.ui.width) / 2; // Center horizontally
        // this.continueButton.ui.y = this.app.screen.height / 2 - buttonHeight * 2;
    
    
    
        // this.updateUI();
    }

    updateUI() {
        this.players.forEach(p => p.updateUI());
    
        if (!this.gameStarted || this.gameEnded) {
          this.buttonsContainer.alpha = 0;
        } else {
          this.buttonsContainer.alpha = this.localPlayerTurn() ? 1 : 0.3
        }
    
        // this.buttonsContainer.alpha = this.gameStarted ? 1 : 0;
    
        this.waitingText.alpha = !this.gameStarted && !this.gameEnded ? 1 : 0;
    
        this.waitingText.text = `Waiting for ${Poker.MAX_PLAYERS - this.players.length} to join...`
    
        this.continueButton.ui.alpha = this.gameEnded ? 1 : 0
    
    
        this.raiseButton.subText.text = this.localPlayer()?.raiseBetAmount?.toLocaleString() || this.blinds.big.toLocaleString();
    
        this.callButton.text.text = !this.maxBet() ? 'Check' : 'Call';
        this.callButton.subText.text = !!this.maxBet() ? this.maxBet().toLocaleString() : ''
    
        this.minusRaiseButton.toggleButtonState(this.localPlayer()?.raiseBetAmount > this.blinds.big)
        this.plusRaiseButton.toggleButtonState(!(this.localPlayer()?.raiseBetAmount >= this.localPlayer()?.chips))
    
        this.potContainer.alpha = this.pot ? 1 : 0;
        this.potText.text = this.pot.toFixed(4)
    
      }
    
    localPlayerTurn() {
        if (this.offlineMode) return this.players[this.currentPlayerIndex]?.isLocal() && !this.dealingCards;
        return this.players[this.currentPlayerIndex]?.id === get(socketData)?.io.id && !this.dealingCards;;
    }
    handleFold() {
        if (!this.localPlayerTurn()) return;
        if (this.offlineMode) return this.handleOfflineFold();
        this.soundManager.play(SoundConstants.BUTTON_CLICK)
        get(socketData)?.io.emit("playerAction", { gameId: this.gameId, action: "fold" });
    }
    handleCall() {
        if (!this.localPlayerTurn()) return;
        this.soundManager.play(SoundConstants.BUTTON_CLICK)
        if (this.offlineMode) return this.handleOfflineCall();
        get(socketData)?.io.emit("playerAction", { gameId: this.gameId, action: "call" });
    }
    handleRaise() {
        if (!this.localPlayerTurn()) return;
        this.soundManager.play(SoundConstants.BUTTON_CLICK)
        if (this.offlineMode) return this.handleOfflineRaise();
        get(socketData)?.io.emit("playerAction", { gameId: this.gameId, action: "raise", amount: this.localPlayer().raiseBetAmount });
    }
    handleAllIn() {
        if (!this.localPlayerTurn()) return;
        this.soundManager.play(SoundConstants.BUTTON_CLICK)
        if (this.offlineMode) return this.handleOfflineAllIn();
        get(socketData)?.io.emit("playerAction", { gameId: this.gameId, action: "allIn" });
    }

  handleOfflineFold() {
    if (!this.localPlayerTurn()) return;
    this.localPlayer().fold()
    this.nextPlayer()
    this.updateUI();
  }
  handleOfflineCall() {
    if (!this.localPlayerTurn()) return;
    this.localPlayer().bet()
    this.nextPlayer()
    this.updateUI();

  }
  handleOfflineRaise() {
    if (!this.localPlayerTurn()) return;
    this.localPlayer().raise(this.localPlayer().raiseBetAmount)
    this.nextPlayer()
    this.updateUI();
  }
  handleOfflineAllIn() {
    if (!this.localPlayerTurn()) return;
    this.localPlayer()?.setBet(this.localPlayer().chips)
    this.updateUI();
    this.nextPlayer()
  }
  handleIncrementRaise() {
    if (!this.localPlayerTurn() || !this.plusRaiseButton.enabled) return;
    this.localPlayer().raiseBet(true);
    this.soundManager.play(SoundConstants.BUTTON_CLICK)
    this.soundManager.play(SoundConstants.BET_INCREASE_BOOP)
    this.updateUI();
  }
  handleDecrementRaise() {
    if (!this.localPlayerTurn() || !this.minusRaiseButton.enabled) return;
    this.soundManager.play(SoundConstants.BUTTON_CLICK);
    this.soundManager.play(SoundConstants.BET_DECREASE_BOOP)
    this.localPlayer().raiseBet(false);
    this.updateUI();
  }

  resetGame() {
    this.deck.reset();
    this.communityCards.forEach(c => c.destroy());
    this.players.forEach(p => {
      p.hand.forEach(h => h.destroy())
      p.reset();
    });
    this.players = this.players.filter(p => !p.leftGame);
    this.gameState = 'PRE_FLOP';
    this.gameStarted = false;
    this.gameEnded = false;
    this.dealingCards = false;
    this.pot = 0;
    this.communityCards = [];
  }

}