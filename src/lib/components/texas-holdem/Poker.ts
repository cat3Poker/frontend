import { Application, Assets, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import Player from "./Player";
import { app } from "$lib/store/activities.js";
import { SoundManager, SoundConstants } from "./SoundManager";
import type Card from "./Card";
import Deck from "./Deck";
import gsap from "gsap";
import DumbAI from "./DumbAI";
import axios from "axios";
import { get } from "svelte/store";

type GameState = 'PRE_FLOP' | 'FLOP' | 'TURN' | 'RIVER' | 'SHOWDOWN'

const basePath = "/images/poker/";



// List all asset names as an array of strings
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

class Button {
  ui: Container;
  text: Text;
  subText: Text;
  enabled: boolean = true;
  constructor(bg: Texture, text: string, sub: string, width: number, height: number, callback = () => { }) {
    this.ui = new Container();
    this.ui.width = width;
    this.ui.height = height;
    const bgs = Sprite.from(bg);
    bgs.width = width;
    bgs.height = height;
    this.ui.addChild(bgs)

    this.text = new Text({
      text, style: {
        fontStyle: 'normal',
        fill: '#FFFFFF',
        align: 'center'
      }
    })
    this.text.anchor.set(0.5); // Center the text horizontally
    this.text.x = this.ui.width / 2; // Center horizontally
    this.text.y = this.ui.height / 2 - 10; // Adjust for vertical alignment
    this.subText = new Text({
      text: '', style: {
        fontStyle: 'normal',
        fill: '#FFFFFF',
        align: 'center'
      }
    })

    this.subText.anchor.set(0.5); // Center the subText horizontally

    this.subText.x = this.ui.height / 2 + this.subText.width / 2; // Center horizontally
    this.subText.y = this.ui.height / 2 + 20; // Adjust for vertical alignment


    this.ui.addChild(this.text, this.subText)
    this.ui.interactive = true; // Make clickable
    this.ui.cursor = 'pointer';

    this.ui.on("pointerdown", () => {
      if (!this.enabled) return;
      gsap.to(this.ui.position, { x: this.ui.x, y: 0.9, duration: 0.1 }); // Scale down
      callback(); // Call the original callback
    });

    this.ui.on("pointerup", () => {
      if (!this.enabled) return;
      gsap.to(this.ui.position, { x: this.ui.x, y: 0, duration: 0.1 });
    });

    this.ui.on("pointerout", () => {
      if (!this.enabled) return;
      gsap.to(this.ui.position, { x: this.ui.x, y: 0, duration: 0.1 }); // Ensure it scales back if mouse leaves
    });
  }

  toggleButtonState(enabled: boolean) {
    this.enabled = enabled;
    this.ui.alpha = enabled ? 1 : 0.4;
    this.ui.cursor = enabled ? 'pointer' : 'notAllowed'
  }
}
class IconButton extends Button {
  constructor(bg: Texture, icon: Texture, size: number, callback = () => { }) {
    super(bg, '', '', size, size, callback)
    const is = Sprite.from(icon);
    is.anchor.set(0.5);
    is.y = this.ui.height / 2;
    is.x = this.ui.width / 2;
    this.ui.addChild(is);
  }
}

const POSITION_INDEX_MAP = (width, height) => {
  const margin = 20; // Add margin for spacing from edges
  const verticalSpacing = 180; // Adjust vertical spacing between players
  const edgeMargin = 100
  const cardOffsetY = 25;
  const cardOffsetX = 150;

  return {
    0: {
      x: width / 2 - 100,
      y: width / 2 - 100,
      cards: {
        x: width / 2, y: width / 2 - 150
      },
    },
    1: {
      x: margin + edgeMargin,
      y: height - margin - verticalSpacing,
      cards: {
        x: margin + edgeMargin + cardOffsetX,
        y: height - margin - verticalSpacing + cardOffsetY,
      },
    },
    2: {
      x: margin,
      y: height - margin - 2 * verticalSpacing,
      cards: {
        x: margin + cardOffsetX,
        y: height - margin - 2 * verticalSpacing + cardOffsetY,
      },
    },
    3: {
      x: margin + edgeMargin,
      y: height - margin - 3 * verticalSpacing,
      cards: {
        x: margin + edgeMargin + cardOffsetX,
        y: height - margin - 3 * verticalSpacing + cardOffsetY,
      },
    },
    4: {
      x: width - margin - edgeMargin,
      y: height - margin - 3 * verticalSpacing,
      cards: {
        x: width - margin - edgeMargin - (cardOffsetX / 3.5),
        y: height - margin - 3 * verticalSpacing + cardOffsetY
      },
    },
    5: {
      x: width - margin,
      y: height - margin - 2 * verticalSpacing,
      cards: {
        x: width - margin - (cardOffsetX / 3.5),
        y: height - margin - 2 * verticalSpacing + cardOffsetY
      },
    },
    6: {
      x: width - margin - edgeMargin,
      y: height - margin - verticalSpacing,
      cards: {
        x: width - margin - edgeMargin - (cardOffsetX / 3.5),
        y: height - margin - verticalSpacing + cardOffsetY
      },
    },
  }
}
export default class Poker {
  createSidePot() {
    throw new Error("Method not implemented.");
  }

  gameStarted: boolean = false;
  app: Application;
  currentBet: number = 0;
  gameState: GameState;
  currentPlayerIndex: number = 0;
  blinds: { small: number, big: number } = { small: 20, big: 40 };
  round = 1;
  players: Player[] = [];
  soundManager: SoundManager;
  pots: number[] = [0];
  communityCards: Card[] = [];
  deck: Deck;
  foldButton: Button;
  callButton: Button;
  minusRaiseButton: IconButton;
  raiseButton: Button;
  plusRaiseButton: IconButton;
  allInButton: Button;
  static MAX_PLAYERS: number = 7;
  playersContainer: Container;
  waitingText: Text;
  buttonsContainer: Container;

  dealerIndex: number = 0;
  cardsContainer: Container;
  dealerContainer: Container;
  dealerText: Text;
  gameEnded: boolean;
  dealerButton: Sprite;
  defaultDealerPosition: { x: number; y: number; };
  defaultCardPosition: { x: number; y: number; };
  dealingCards: boolean;
  roundStartIndex: number;
  potContainer: Container;
  potText: Text;

  constructor() {
    this.currentBet = this.blinds.big;
    this.gameState = 'PRE_FLOP';
    this.app = new Application();
    this.soundManager = new SoundManager();
    this.deck = new Deck();
  }


  async initialize(parent: HTMLElement) {
    await this.app.init({
      backgroundColor: 0x000,
      resizeTo: parent,
    });

    parent.appendChild(this.app.canvas);
    const assets = assetNames.map((name) => ({
      alias: name.split(".")[0], // Optional: Name assets without extensions
      src: `${basePath}${name}`,
    }));
    // Load assets
    Assets.add(assets);

    //Load important assets
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
      "Glow_Card_Over"
    ]);


    const backgroundSprite = Sprite.from(Assets.get('Backing_Landscape'));
    // Set the sprite to cover the entire background
    backgroundSprite.width = this.app.screen.width;
    backgroundSprite.height = this.app.screen.height;
    backgroundSprite.x = 0;
    backgroundSprite.y = 0;
    //Setup Background

    // Add the background sprite to the stage
    this.app.stage.addChild(backgroundSprite);

    // Add the table
    const Landscape = Sprite.from(Assets.get('Landscape'));
    Landscape.width = this.app.screen.width * 0.8; // Resize to 80% of screen width
    Landscape.height = this.app.screen.height;
    Landscape.x = (this.app.screen.width - Landscape.width) / 2;
    Landscape.y = 0;

    // Add the Table sprite to the stage
    this.app.stage.addChild(Landscape);


    // Add Game actions
    this.buttonsContainer = new Container();


    const buttonWidth = 100;
    const buttonHeight = 80;
    const buttonPadding = 10;

    this.foldButton = new Button(Assets.get('Button_Red'), 'Fold', '', buttonWidth, buttonHeight, this.handleFold.bind(this));
    this.callButton = new Button(Assets.get('Button_Tan'), 'Call', `${this.currentBet}`, buttonWidth, buttonHeight, this.handleCall.bind(this));
    this.minusRaiseButton = new IconButton(Assets.get('Button_Green'), Assets.get('icon_Minus'), buttonHeight, this.handleDecrementRaise.bind(this));
    this.raiseButton = new Button(Assets.get('Button_Green'), 'Raise', '', buttonWidth, buttonHeight, this.handleRaise.bind(this));
    this.plusRaiseButton = new IconButton(Assets.get('Button_Green'), Assets.get('icon_Plus'), buttonHeight, this.handleIncrementRaise.bind(this));
    this.allInButton = new Button(Assets.get('Button_Blue'), 'All In', '', buttonWidth, buttonHeight, this.handleAllIn);

    // Add buttons to the container with padding
    this.buttonsContainer.addChild(this.foldButton.ui);
    this.buttonsContainer.addChild(this.callButton.ui);
    this.buttonsContainer.addChild(this.minusRaiseButton.ui);
    this.buttonsContainer.addChild(this.raiseButton.ui);
    this.buttonsContainer.addChild(this.plusRaiseButton.ui);
    this.buttonsContainer.addChild(this.allInButton.ui);

    this.app.stage.addChild(this.buttonsContainer);

    // Set the position of buttons with padding
    this.foldButton.ui.x = 0;
    this.callButton.ui.x = this.foldButton.ui.x + this.callButton.ui.width + buttonPadding;
    this.minusRaiseButton.ui.x = this.callButton.ui.x + this.callButton.ui.width + buttonPadding;
    this.raiseButton.ui.x = this.minusRaiseButton.ui.x + this.minusRaiseButton.ui.width + buttonPadding;
    this.plusRaiseButton.ui.x = this.raiseButton.ui.x + this.raiseButton.ui.width + buttonPadding;
    this.allInButton.ui.x = this.plusRaiseButton.ui.x + this.plusRaiseButton.ui.width + buttonPadding;



    // Position the buttonsContainer at the mid-bottom of the stage
    this.buttonsContainer.x = (this.app.screen.width - this.buttonsContainer.width) / 2; // Center horizontally
    this.buttonsContainer.y = this.app.screen.height - this.buttonsContainer.height - 40; // Position at the bottom - padding


    this.waitingText = new Text({
      text: '',
      style: {
        fontSize: 30,
        fill: '#ffffff'
      }
    });
    this.waitingText.anchor.set(0.5)
    this.app.stage.addChild(this.waitingText);

    this.buttonsContainer.alpha = 0;
    this.waitingText.alpha = 0;

    this.waitingText.x = (this.app.screen.width - this.waitingText.width) / 2; // Center horizontally
    this.waitingText.y = this.app.screen.height - this.waitingText.height - 40; // Position at the bottom - padding


    this.cardsContainer = new Container();
    this.cardsContainer.width = Landscape.width;
    this.cardsContainer.height = Landscape.height;
    this.cardsContainer.x = Landscape.x;
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


    /// Pots Contaner

    this.potContainer = new Container();
    const stackContainer = new Container();
    this.potText = new Text({
      text: '5,000',
      style: {
        fill: '#ffffff',
        align: 'center',
        fontSize: 25,
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
    this.playersContainer.width = Landscape.width;
    this.playersContainer.height = Landscape.height;
    this.playersContainer.x = Landscape.x;
    this.playersContainer.y = 0;



    this.app.stage.addChild(this.cardsContainer, this.playersContainer, this.dealerContainer, this.potContainer);

    this.potContainer.x = (this.app.screen.width - this.potContainer.width) / 2;
    this.potContainer.y = 100;
    this.dealerContainer.x = (this.app.screen.width - this.dealerContainer.width) / 2; // Center horizontally
    // this.dealerContainer.y = this.app.screen.height - this.dealerContainer.height - 40; // Position at the bottom - padding


    // BG music
    this.soundManager.play(SoundConstants.GAMEPLAY_MUSIC, 0, 1, true)

    this.updateUI();
  }


  async startGame() {
    //Deal cards;
    this.gameEnded = false;
    this.gameStarted = true;
    this.dealingCards = true;
    this.resetGame();
    this.updateUI();


    //Assign Dealer;
    //Assign small & large blinds

    // Assign Dealer;
    this.dealerIndex = 4// Math.floor(Math.random() * this.players.length);
    this.players[this.dealerIndex].isDealer = true;
    this.dealerButton.alpha = 1;
    this.dealerButton.x = this.players[this.dealerIndex].ui.x + (this.dealerIndex < 3 ? 0 : -20);
    this.dealerButton.y = this.players[this.dealerIndex].ui.y + (this.players[this.dealerIndex].ui.height / 2);

    // Assign small & large blinds
    const smallBlindIndex = (this.dealerIndex + 1) % this.players.length;
    const bigBlindIndex = (this.dealerIndex + 2) % this.players.length;

    this.players[smallBlindIndex].setBet(this.blinds.small);
    this.players[bigBlindIndex].setBet(this.blinds.big);

    this.currentBet = this.blinds.big;

    this.currentPlayerIndex = (bigBlindIndex + 1) % this.players.length;
    if (!this.currentPlayerIndex) this.soundManager.play(SoundConstants.CHIME_YOUR_TURN)

    this.roundStartIndex = this.currentPlayerIndex;

    await this.toggleDealerContainer(true)

    this.typewriteText(this.dealerText, 'Okay, Everyone: If you\'re playing, then...', 50, () => {
      this.typewriteText(this.dealerText, '... ante up!', 50, () => {
        setTimeout(() => {
          this.typewriteText(this.dealerText, 'Here are your cards!', 50, () => {
            this.dealCards().then(() => {
              this.dealingCards = false;
              this.updateUI()
              this.typewriteText(this.dealerText, 'Good luck!', 50, () => {
                setTimeout(() => {
                  this.toggleDealerContainer(false);
                }, 2000)
              })
            });
          })
        }, 2000)
      })
    })
  }
  async toggleDealerContainer(show: boolean = false) {
    if (show) {
      this.dealerText.text = ''
      this.dealerContainer.alpha = 0;
      this.dealerContainer.y = -this.dealerContainer.height; // Start above the screen
      // this.app.stage.addChild(this.dealerContainer); // Ensure it's added to the stage

      await gsap.to(this.dealerContainer, {
        y: 0, // Slide down to center
        alpha: 1,
        duration: 0.5,
        ease: "power1.out",
      });
    } else {
      // Assuming dealerContainer is already on stage and visible
      await gsap.to(this.dealerContainer, {
        y: -this.dealerContainer.height, // Slide up out of screen
        alpha: 0,
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          // this.app.stage.removeChild(this.dealerContainer); // Remove from stage after animation
        },
      });
    }
  }
  async dealCards() {
    let cards = 0;
    while (cards < 2) {
      for (const player of this.players) {
        const card = this.deck.deal(1)[0];
        player.hand.push(card);
        if (!player.index) {
          card.cardUI.scale.set(0.4, 0.4)
        }
        this.cardsContainer.addChild(card.cardUI);
        this.soundManager.play(SoundConstants.CARD_DEAL)
        await this.animateCardDealing(card.cardUI, player.index, !player.index ? { x: !!cards ? 80 : 0, y: 0 } : (!!cards ? { x: 10, y: 10 } : { x: 0, y: 0 }))

      }
      cards++;
    }
    for (const card of this.players[0].hand) {
      await card.revealCard();
    }
  }
  animateCardDealing(sprite: Container, startIndex: number, offset: { x: number, y: number }) {
    const index = startIndex % this.players.length;
    return new Promise<void>((resolve) => {
      sprite.x = this.defaultCardPosition.x;
      sprite.y = this.defaultCardPosition.y;
      gsap.to(sprite, {
        x: POSITION_INDEX_MAP(this.app.screen.width - 450, this.app.screen.height - 100)[index].cards.x + offset.x,
        y: POSITION_INDEX_MAP(this.app.screen.width - 450, this.app.screen.height - 100)[index].cards.y + offset.y,
        rotation: 0,
        alpha: 1,
        duration: 0.2,
        ease: "power1.out",
        onComplete: () => {
          startIndex++;
          resolve();
        },
      });
    });
  }
  animateCommunityCardDealing(sprite: Container) {
    let index = this.communityCards.length;
    const offset = 150;
    return new Promise<void>((resolve) => {
      sprite.x = this.defaultCardPosition.x;
      sprite.y = this.defaultCardPosition.y;
      gsap.to(sprite, {
        x: (index * 80) + offset,
        y: 200,
        rotation: 0,
        alpha: 1,
        duration: 0.2,
        ease: "power1.out",
        onComplete: () => {
          resolve();
        },
      });
    });
  }
  typewriteText(textComponent: Text, fullText: string, typingSpeed: number = 50, onComplete?: () => void) {
    textComponent.text = ''; // Clear existing text
    let currentText = '';
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      currentText += fullText[charIndex];
      textComponent.text = currentText;
      charIndex++;

      if (charIndex === fullText.length) {
        clearInterval(typingInterval);
        if (onComplete) onComplete();
      }
    }, typingSpeed);
  }

  async addPlayer(name: string, avatar: string, chips: number) {
    if (this.players.length === Poker.MAX_PLAYERS) return;

    const player = new Player(this, await Assets.load(avatar), name, this.players.length);
    player.chips = chips;
    this.players.push(player);
    this.playersContainer.addChild(player.ui)

    player.initialize();




    // Position Players
    player.ui.x = POSITION_INDEX_MAP(this.app.screen.width - 450, this.app.screen.height - 100)[this.players.length - 1].x
    player.ui.y = POSITION_INDEX_MAP(this.app.screen.width - 450, this.app.screen.height - 100)[this.players.length - 1].y

    if (this.players.length === Poker.MAX_PLAYERS) this.startGame();
    this.updateUI();
  }

  playReady() {
    return !this.dealingCards && this.gameStarted
  }

  localPlayerTurn() {
    return this.players[this.currentPlayerIndex]?.isLocal() && !this.dealingCards;
  }

  localPlayer() {
    return this.players[0];
  }


  async nextPlayer() {
    this.currentPlayerIndex = this.currentPlayerIndex + 1 % this.players.length
    if (this.currentPlayerIndex === this.players.length) this.currentPlayerIndex = 0;
    while (this.players[this.currentPlayerIndex].folded && this.currentPlayerIndex !== this.roundStartIndex) this.currentPlayerIndex++;
    if (this.currentPlayerIndex === this.roundStartIndex) {
      await this.advanceGame();
      if (this.gameState === 'SHOWDOWN')
        return;
    }
    if (!this.currentPlayerIndex) this.soundManager.play(SoundConstants.CHIME_YOUR_TURN)
    if (this.currentPlayerIndex) {
      DumbAI.play(this, this.players[this.currentPlayerIndex]);
      setTimeout(() => {
        this.nextPlayer()
        this.updateUI();
      }, 2000)
    }
  }


  updateUI() {
    this.players.forEach(p => p.updateUI());

    if (!this.gameStarted || this.gameEnded) {
      this.buttonsContainer.alpha = 0;
    } else {
      this.buttonsContainer.alpha = this.localPlayerTurn() ? 1 : 0.3
    }

    // this.buttonsContainer.alpha = this.gameStarted ? 1 : 0;

    this.waitingText.alpha = this.gameStarted && !this.gameEnded ? 0 : 1;

    if (!this.gameStarted || this.gameEnded) {
      this.waitingText.text = this.gameEnded ? 'Game Ended' : `Waiting for ${Poker.MAX_PLAYERS - this.players.length} to join...`
    }



    this.raiseButton.subText.text = this.localPlayer()?.raiseBetAmount.toLocaleString() || this.blinds.big.toLocaleString();

    this.callButton.text.text = !this.maxBet() ? 'Check' : 'Call';
    this.callButton.subText.text = !!this.maxBet() ? this.maxBet().toLocaleString() : ''

    this.minusRaiseButton.toggleButtonState(this.localPlayer()?.raiseBetAmount > this.blinds.big)
    this.plusRaiseButton.toggleButtonState(!(this.localPlayer()?.raiseBetAmount >= this.localPlayer()?.chips))

    this.potContainer.alpha = this.pots[0] ? 1 : 0;
    this.potText.text = this.pots[0].toLocaleString()

  }

  handleFold() {
    if (!this.localPlayerTurn()) return;
    this.localPlayer().fold()
    this.soundManager.play(SoundConstants.BUTTON_CLICK)
    this.nextPlayer()
    this.updateUI();
  }
  handleCall() {
    if (!this.localPlayerTurn()) return;
    this.localPlayer().bet()
    this.soundManager.play(SoundConstants.BUTTON_CLICK)
    this.nextPlayer()
    this.updateUI();

  }
  handleRaise() {
    if (!this.localPlayerTurn()) return;
    this.localPlayer().raise()
    this.soundManager.play(SoundConstants.BUTTON_CLICK)
    this.nextPlayer()
    this.updateUI();
  }
  handleAllIn() {
    if (!this.localPlayerTurn()) return;
    this.soundManager.play(SoundConstants.BUTTON_CLICK)
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
  }

  async advanceGame() {
    this.dealingCards = true;
    this.updateUI();
    switch (this.gameState) {
      case "PRE_FLOP":
        this.gameState = 'FLOP';

        // Collect all bets to pots

        this.pots[0] += this.players.reduce((prev, curr) => prev + curr.currentBet, 0);
        //Reset Bets
        this.players.forEach(p => p.setBet(0));
        this.updateUI();





        await this.toggleDealerContainer(true)
        this.typewriteText(this.dealerText, 'Here comes the flop!', 50, async () => {
          this.toggleDealerContainer();
          await this.dealCommunityCards(3);
          this.dealingCards = false;
          this.updateUI();
        });
        break;
      case "FLOP":
        this.gameState = 'TURN';

        // Collect all bets to pots
        this.pots[0] += this.players.reduce((prev, curr) => prev + curr.currentBet, 0);;
        //Reset Bets
        this.players.forEach(p => p.setBet(0));
        this.updateUI();


        await this.toggleDealerContainer(true)
        this.typewriteText(this.dealerText, 'Here comes the turn!', 50, async () => {
          this.toggleDealerContainer();
          await this.dealCommunityCards(1);
          this.dealingCards = false;
          this.updateUI();
        });
        break;
      case "TURN":
        this.gameState = 'RIVER';

        // Collect all bets to pots
        this.pots[0] += this.players.reduce((prev, curr) => prev + curr.currentBet, 0);
        //Reset Bets
        this.players.forEach(p => p.setBet(0));
        this.updateUI();


        await this.toggleDealerContainer(true)
        this.typewriteText(this.dealerText, 'Here comes the river!', 50, async () => {
          this.toggleDealerContainer();
          await this.dealCommunityCards(1);
          this.dealingCards = false;
          this.updateUI();
        });
        break;
      case "RIVER":
        this.gameState = 'SHOWDOWN';
        this.players.forEach(player => {
          if (player.index) player.hand.forEach(c => c.revealCard())
        })

        const handPayload = this.players.map(p => ({
          id: p.name,
          hand: [...p.hand.map(c => c.stringName()), ...this.communityCards.map(c => c.stringName())]
        }))
        //@ts-ignore
        const response = await get(app)?.post({ players: handPayload }, 'poker/eval');
        this.players.forEach(p => {
          p.handRank = response.ranks[p.name].handRank;
        })
        const activePlayers = this.players.filter(p => !p.folded).sort((a, b) => b.handRank - a.handRank);

        // Give pot to winner;
        activePlayers[0].chips += this.pots[0];
        const winner = activePlayers[0];
        this.pots[0] = 0;

        await this.toggleDealerContainer(true)
        this.typewriteText(this.dealerText, `${winner.name} Won the pot ${activePlayers.length === 1 ? 'because everyone else folded' : ''}`, 50, async () => {
          this.toggleDealerContainer();
          await this.dealCommunityCards(1);
          this.gameEnded = true;
          this.dealingCards = false;
          this.updateUI();
        });
        break;
      case "SHOWDOWN":
    }
  }
  async dealCommunityCards(count: number) {
    const cards = this.deck.deal(count);
    for (const card of cards) {
      card.revealCard(false);
      card.cardUI.scale.set(0.4, 0.4)
      this.cardsContainer.addChild(card.cardUI)
      this.communityCards.push(card)
      await this.animateCommunityCardDealing(card.cardUI)
    }
  }

  maxBet(): number {
    return this.players.map(p => p.currentBet).sort()[this.players.length - 1]
  }

  destroy() {
    this.soundManager.stopAll()
  }
}