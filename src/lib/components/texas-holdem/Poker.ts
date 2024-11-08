import { Application, Assets, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import Player from "./Player";
import { app } from "$lib/store/activities.js";
import { SoundManager, SoundConstants } from "./SoundManager";
import Card from "./Card";
import Deck from "./Deck";
import gsap from "gsap";
import DumbAI from "./DumbAI";
import { get } from "svelte/store";
import { socketData } from '$lib/store/socket';

type GameState = 'WAITING' | 'PRE_FLOP' | 'FLOP' | 'TURN' | 'RIVER' | 'SHOWDOWN'

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
function drawBoundingBox(app: Application, displayObject) {
  const bounds = displayObject.getBounds();

  // Create a new Graphics object for the bounding box
  const boundingBox = new Graphics().setStrokeStyle({
    width: 2,
    color: 0xff0000,
    alpha: 1
  }).rect(bounds.x, bounds.y, bounds.width, bounds.height);
  // Add the bounding box to the stage
  app.stage.addChild(boundingBox);
}

const getResponsivePositions = (width, height, numPlayers) => {
  height = height - 120;
  width = width - 200;
  const positions = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const offsetX = width * 0.15; // Horizontal offset from the table edges
  const offsetY = height * 0.15; // Vertical offset from the table edges
  const cardOffset = 40;

  // Define positions based on player index
  for (let i = 0; i < numPlayers; i++) {
    let x, y;

    let cardX, cardY;

    switch (i) {
      case 0: // Mid-bottom
        x = centerX;
        y = height - offsetY;
        // Calculate card positions relative to player position
        cardX = x - cardOffset * 2;
        cardY = y - cardOffset * 3;
        break;
      case 1: // Left side lower
        x = offsetX;
        y = centerY + offsetY;
        cardX = x + cardOffset;
        cardY = y;
        break;
      case 2: // Left side upper
        x = offsetX;
        y = centerY - offsetY;
        cardX = x + cardOffset;
        cardY = y;
        break;
      case 3: // Mid-top
        x = centerX;
        y = offsetY;
        cardX = x + cardOffset;
        cardY = y;
        break;
      case 4: // Right side upper
        x = width - offsetX;
        y = centerY - offsetY;
        cardX = x - (cardOffset * 3.5);
        cardY = y;
        break;
      case 5: // Right side lower
        x = width - offsetX;
        y = centerY + offsetY;
        cardX = x - (cardOffset * 3.5);
        cardY = y;
        break;
      default:
        // For additional players, you can adjust positions accordingly
        x = centerX;
        y = centerY;
    }



    positions.push({
      x,
      y,
      cards: { x: cardX, y: cardY },
    });
  }

  return positions;
};

const getResponsivePositions2 = (width, height, numPlayers) => {
  const positions = [];
  const radius = Math.min(width, height) * 0.3; // Adjust radius based on screen size
  const centerX = width / 2;
  const centerY = height / 2;
  const cardOffset = 30;

  const angleStep = (2 * Math.PI) / numPlayers;

  // Set startAngle so that player at index 0 is at mid-bottom
  let startAngle = Math.PI / 2;

  for (let i = 0; i < numPlayers; i++) {
    const angle = startAngle + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    // Calculate card positions relative to player position
    const cardX = x + cardOffset * Math.cos(angle);
    const cardY = y + cardOffset * Math.sin(angle);

    positions.push({
      x,
      y,
      cards: { x: cardX, y: cardY },
    });
  }

  return positions;
};

export default class Poker {

  static MAX_PLAYERS: number = 3;
  socket: any;
  gameId: string;  // Now dynamically assigned

  gameStarted: boolean = false;
  app: Application;
  currentBet: number = 0;
  gameState: GameState;
  winnerId: string;
  hostId: string;
  currentPlayerIndex: number = 0;

  blinds: { small: number, big: number } = { small: 0.01, big: 0.02 };
  round = 1;
  players: Player[] = [];
  soundManager: SoundManager;
  pot: number = 0;
  communityCards: Card[] = [];
  deck: Deck;
  foldButton: Button;
  callButton: Button;
  minusRaiseButton: IconButton;
  raiseButton: Button;
  plusRaiseButton: IconButton;
  allInButton: Button;

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
  continueButton: Button;
  onExitGameCallback: (message: string) => void
  destroyed: boolean;
  playerId: string;
  offlineMode: boolean;
  loaderGraphics: Sprite;
  betAmount: number = 0
  constructor(private parentContainer, callback?: () => void, offline?: boolean) {

    this.onExitGameCallback = callback;
    this.gameState = 'WAITING';
    this.app = new Application();
    this.soundManager = new SoundManager();
    this.deck = new Deck();
    this.offlineMode = offline || false;


    this.initializeSocketEvents();
  }

  async initLoadingScreen() {
    await this.app.init({
      backgroundColor: 0x000,
      width: 1034, height: 534
      // resizeTo: parent,
    });

    this.parentContainer.appendChild(this.app.canvas);
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
      "Glow_Card_Over",
      "ChipsAndCards"
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
      "Glow_Card_Over",
      "ChipsAndCards"
    ]);


    this.loaderGraphics = Sprite.from(Assets.get('ChipsAndCards'));
    // Set the sprite to cover the entire background
    this.loaderGraphics.width = this.app.screen.width;
    this.loaderGraphics.height = this.app.screen.height;
    this.loaderGraphics.x = 0;
    this.loaderGraphics.y = 0;
    //Setup Background

    // Add the background sprite to the stage
    this.app.stage.addChild(this.loaderGraphics);
  }

  private realIndex(index, serverPlayers) {
    const id = serverPlayers[index].id;
    return this.players.findIndex(p => p.id === id)
  }

  initializeSocketEvents() {
    const io = get(socketData)?.io;
    if (!io) {
      return this.onExitGameCallback('Socket not initialized!')
    }

    this.playerId = io.id;

    io.on('connect', () => {
      this.playerId = io.id;
    })

    io.on("gameJoined", (gameData) => {
      console.log("Joined game:", gameData);
      this.gameId = gameData.gameId; // Set gameId from server
      this.initializeGame(gameData);
    });


    io.on("playerJoined", async ({game, playerData}) => {
      if (game.gameId === this.gameId && playerData.id !== get(socketData)?.io.id) {
        await this.syncPlayers(game);
        this.updateUI();
      }
    });
    // io.on("gameStarted", (gameData) => {
    //   //init player cards
    //   this.startGame(gameData);
    // });


    io.on("onAction", (actionData) => {
      const player = this.players.find(p => p.id === actionData.playerId);
      if (player) {
        player.setServerAction(actionData.action, actionData.prevBet)
        this.currentPlayerIndex = actionData.nextPlayerIndex;
        this.updateUI();
      }
    });

    io.on("gameStateUpdated", async (gameData) => {
      // Update game state from server data
      this.updateGameData(gameData);
      // add only diff of cards both community & players
      for (const card of gameData.communityCards) {
        const _com = this.communityCards.find(c => c.stringName().toLowerCase() === `${card.rank}${card.suit}`.toLowerCase());
        if (!_com) {
          this.communityCards.push(new Card(card.rank, card.suit))
        }
      }
      this.communityCards = gameData.communityCards.map(cardData => new Card(cardData.rank, cardData.suit)); // Assuming you have a Card class
      this.currentBet = gameData.currentBet;
      await this.syncPlayers(gameData);

      this.dealingCards = true;
      this.updateUI();
      switch (this.gameState) {
        case 'PRE_FLOP': {
          this.setDealer(gameData.dealerIndex)

          if (this.players[this.realIndex(this.currentPlayerIndex, gameData.players)].id === this.playerId) this.soundManager.play(SoundConstants.CHIME_YOUR_TURN)
          //Deals cards,
          await this.dealCards(false);
          this.dealingCards = false;
          this.updateUI();
          break
        }
        case "FLOP": {
          // Deal community 1st 3 cards
          await this.dealCommunityCards(this.deck.deal(3));
          this.dealingCards = false;
          this.updateUI();
          break;
        }
        case "TURN": {
          // Deal community 4th card
          await this.dealCommunityCards(this.deck.deal(1));
          this.dealingCards = false;
          this.updateUI();
          break;
        }
        case "RIVER": {
          // Deal community final card
          await this.dealCommunityCards(this.deck.deal(1));
          this.dealingCards = false;
          this.updateUI();
          break;
        }
        case "SHOWDOWN": {
          // reveal cards and show winners
          this.players.forEach(player => {
            if (!player.isLocal()) player.hand.forEach(c => c.revealCard())
          })
          this.players.forEach(p => {
            p.handRank = gameData.ranks[p.name].handRank;
            p.handName = gameData.ranks[p.name].handName;
          })
          const activePlayers = this.players.filter(p => !p.folded).sort((a, b) => b.handRank - a.handRank);

          // Give pot to winner;
          activePlayers[0].chips += this.pot;
          const winner = activePlayers[0];
          this.pot = 0;

          await this.toggleDealerContainer(true)
          this.soundManager.play(SoundConstants.AUDIENCE_CLAP_HAPPY);
          this.typewriteText(this.dealerText, `${winner.name} Won the pot ${activePlayers.length === 1 ? 'because everyone else folded' : `"${winner.handName}"`}`, 50, async () => {
            setTimeout(() => {
              this.toggleDealerContainer();
              this.gameEnded = true;
              this.dealingCards = false;
              this.updateUI()
            }, 2000)
          });
          break;
        }
      }


    });

    get(socketData)?.io.on("gameEnded", (gameData) => {
      this.gameEnded = true;
      this.updateUI();
    });

    get(socketData)?.io.on("playerLeft", (playerId) => {
      this.removePlayer(playerId)
    });

  }


  private async syncPlayers(gameData: any) {
    const _clientPlayers = this.rotatePlayer(gameData.players);
    let index = 0;
    for (const player of _clientPlayers) {
      let _p = this.players.find(p => p.id === player.id);
      if (!_p) {
        _p = await this.initPlayer(player);
      } else {
        this.updatePlayer(_p, player);
      }
      this.players[index] = _p;
      index++;
    }
  }

  async createGame(user_id: string, betAmount: number = 1) {
    await this.initLoadingScreen();
    const data = get(socketData);
    console.log(data)
    const response = await get(socketData)?.request("createGame", { betAmount, user_id });
    console.log('Response => ', response)
    //@ts-ignore
    if (response.code) {
      //@ts-ignore
      this.onExitGameCallback(response.message)
    }
  }

  async joinGame(gameId: string, user_id: string) {
    await this.initLoadingScreen();
    const response = await get(socketData)?.request("joinGame", { gameId, user_id });
    //@ts-ignore
    if (response.code) {
      //@ts-ignore
      this.onExitGameCallback(response.message)
    }
  }

  async initializeGame(gameData) { // new function to handle game setup
    // Set up initial game state based on gameData from server
    await this.initialize();
    this.updateGameData(gameData)
    this.deck.initializeDeck(gameData.deck);
    this.communityCards = gameData.communityCards.map(c => new Card(c.rank, c.suit))
    for (const card of this.communityCards) {
      this.placeCommunityCard(card.sprite, false)
    }

    const _rot = this.rotatePlayer(gameData.players);
    this.players = [];
    for (const player of _rot) {
      await this.initPlayer(player)
      this.placeCard(player)
    }

    this.updateUI(); // Update after all players added

    // if (gameData.gameStarted) {
    //   this.startGame(); // Start if game is already in progress
    // }


  }


  updateGameData(gameData: any) {
    console.log(gameData)
    this.blinds = gameData.blinds;
    this.dealerIndex = gameData.dealerIndex;
    this.roundStartIndex = gameData.roundStartIndex;
    this.currentPlayerIndex = gameData.currentPlayerIndex;
    this.betAmount = gameData.betAmount;
    this.currentBet = gameData.currentBet;
    this.dealerIndex = gameData.dealerIndex;
    this.gameEnded = gameData.gameEnded;
    this.gameStarted = gameData.gameStarted;
    this.gameEnded = gameData.gameEnded
    this.gameState = gameData.gameState;
    this.hostId = gameData.hostId;
    this.winnerId = gameData.winner;
    this.pot = gameData.pot;
  }

  async initialize() {

    this.loaderGraphics.removeFromParent();
    this.loaderGraphics.destroy();


    // Add the table
    const Table = Sprite.from(Assets.get('Landscape'));
    Table.width = this.app.screen.width * 1.1; // Resize to 80% of screen width
    Table.height = this.app.screen.height * 1.2;
    Table.x = (this.app.screen.width - Table.width) / 2;
    Table.y = -12;

    // Add the Table sprite to the stage
    this.app.stage.addChild(Table);
    drawBoundingBox(this.app, Table)

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
        fontSize: 18,
        fill: '#ffffff'
      }
    });
    this.waitingText.anchor.set(0.5)
    this.app.stage.addChild(this.waitingText);

    this.buttonsContainer.alpha = 0;
    this.waitingText.alpha = 0;

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
    // this.dealerContainer.y = this.app.screen.height - this.dealerContainer.height - 40; // Position at the bottom - padding


    //Game Control Buttons
    const gameControls = new Container();
    const shareButton = new Button(Assets.get('Button_Blue'), 'Share', '', buttonWidth, buttonHeight, this.handleShare.bind(this));
    const exitButton = new Button(Assets.get('Button_Red'), 'Exit', '', buttonWidth, buttonHeight, this.handleExit.bind(this));
    // gameControls.addChild(shareButton.ui);


    this.app.stage.addChild(gameControls);
    // exitButton.ui.y = buttonPadding + buttonHeight
    gameControls.x = 20;
    gameControls.y = this.app.screen.height / 2 - buttonHeight * 2;


    // BG music
    this.soundManager.play(SoundConstants.GAMEPLAY_MUSIC, 0, 1, true)

    this.continueButton = new Button(Assets.get('Button_Blue'), 'Continue Playing', '', buttonWidth + 120, buttonHeight, this.handleContinueGame.bind(this));
    this.continueButton.ui.alpha = 0;
    this.app.stage.addChild(this.continueButton.ui)

    this.continueButton.ui.x = (this.app.screen.width - this.continueButton.ui.width) / 2; // Center horizontally
    this.continueButton.ui.y = this.app.screen.height / 2 - buttonHeight * 2;



    this.updateUI();
  }

  handleShare() {
    //@ts-ignore
    navigator.clipboard.writeText(`${get(app)?.url}/texas-holdem/${this.gameId}`); // Write this.gameId to clipboard
  }
  async handleExit() {
    await this.localPlayer().leaveGame();
    if (this.onExitGameCallback) this.onExitGameCallback('');
  }

  handleContinueGame() {
    if (!this.gameEnded) return;
    this.resetGame();
    this.updateUI();
    if (this.players.length === Poker.MAX_PLAYERS) this.startGame();
  }

  positionPlayers() {
    const positions = getResponsivePositions(
      this.app.screen.width,
      this.app.screen.height,
      this.players.length
    );

    this.players.forEach((player, index) => {
      player.ui.x = positions[index].x - player.ui.width / 2;
      player.ui.y = positions[index].y - player.ui.height / 2;
    });
  }


  async startGame(data?: any) {
    //Deal cards;
    if (!this.offlineMode) return;

    this.gameStarted = true;
    this.dealingCards = true;

    this.updateUI();


    //Assign Dealer;
    //Assign small & large blinds

    // Assign Dealer;
    this.setDealer(Math.floor(Math.random() * this.players.length));
    this.setPlayerBlinds();





    if (!this.offlineMode) return; // Dealing cards is handled elsewhere

    this.dealCards().then(() => {
      this.dealingCards = false;
      this.updateUI()

      this.checkAIPlay();
      // this.typewriteText(this.dealerText, 'Good luck!', 50, () => {
      //   setTimeout(() => {
      //     this.toggleDealerContainer(false);
      //   }, 2000)
      // })
    });

    // await this.toggleDealerContainer(true)

    // this.typewriteText(this.dealerText, 'Okay, Everyone: If you\'re playing, then...', 50, () => {
    //   this.typewriteText(this.dealerText, '... ante up!', 50, () => {
    //     setTimeout(() => {
    //       this.typewriteText(this.dealerText, 'Here are your cards!', 50, () => {

    //       })
    //     }, 2000)
    //   })
    // })
  }
  private setPlayerBlinds() {
    // Assign small & large blinds
    const smallBlindIndex = (this.dealerIndex + 1) % this.players.length;
    const bigBlindIndex = (this.dealerIndex + 2) % this.players.length;


    this.players[smallBlindIndex].setBet(this.blinds.small, true);
    this.players[bigBlindIndex].setBet(this.blinds.big, true);

    this.currentBet = this.blinds.big;

    this.currentPlayerIndex = (bigBlindIndex + 1) % this.players.length;
    this.roundStartIndex = this.currentPlayerIndex;
    if (this.currentPlayerIndex) this.soundManager.play(SoundConstants.CHIME_YOUR_TURN)
  }
  private setDealer(index) {
    this.dealerIndex = index;
    this.players[this.dealerIndex].isDealer = true;
    this.dealerButton.alpha = 1;
    this.dealerButton.x = this.players[this.dealerIndex].ui.x + (this.dealerIndex <= 3 ? 0 : -20);
    this.dealerButton.y = this.players[this.dealerIndex].ui.y;
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

  indexOfPlayer(player) {
    return this.players.findIndex(p => p.id === player.id)
  }
  placeCard(player: Player) {
    let cards = 0;
    for (const card of player.hand) {
      if (player.isLocal()) {
        card.cardUI.scale.set(0.4, 0.4)
      }
      card.revealCard(false);
      this.cardsContainer.addChild(card.cardUI);
      this.animateCardDealing(card.cardUI, this.indexOfPlayer(player), this.localPlayer() ? { x: !!cards ? 80 : 0, y: 0 } : (!!cards ? { x: 10, y: 10 } : { x: 0, y: 0 }), false)
      cards++;
    }

  }
  async dealCards(generate: boolean = true) {
    let cardIndex = 0;
    while (cardIndex < 2) {
      if (this.destroyed) return;
      for (const player of this.players) {
        if (this.destroyed) break;
        let card: Card;
        if (generate) {
          card = this.deck.deal(1)[0];
          player.hand.push(card);
        } else {
          card = player.hand[cardIndex];
        }
        if (player.isLocal()) {
          card.cardUI.scale.set(0.4, 0.4)
        }
        this.cardsContainer.addChild(card.cardUI);
        this.soundManager.play(SoundConstants.CARD_DEAL)
        await this.animateCardDealing(card.cardUI, player.index, this.localPlayer() ? { x: !!cardIndex ? 80 : 0, y: 0 } : (!!cardIndex ? { x: 10, y: 10 } : { x: 0, y: 0 }))
      }
      cardIndex++;
    }
    for (const card of this.localPlayer().hand) {
      await card.revealCard();
    }
  }
  animateCardDealing(sprite: Container, startIndex: number, offset: { x: number, y: number }, animate: boolean = true) {
    const positions = getResponsivePositions(
      this.app.screen.width,
      this.app.screen.height,
      this.players.length
    );
    const index = startIndex % this.players.length;
    if (!animate) {
      sprite.x = positions[index].cards.x + offset.x;
      sprite.y = positions[index].cards.y + offset.y;
      sprite.rotation = 0;
      sprite.alpha = 1;
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      sprite.x = this.defaultCardPosition.x;
      sprite.y = this.defaultCardPosition.y;
      gsap.to(sprite, {
        x: positions[index].cards.x + offset.x,
        y: positions[index].cards.y + offset.y,
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
  placeCommunityCard(sprite: Container, animate: boolean = true) {
    let index = this.communityCards.length;
    const centerY = this.app.screen.height / 2;
    const offsetX = this.app.screen.width * 0.2;
    const offsetY = this.app.screen.height * 0.125;

    if (!animate) {
      sprite.x = (index * 80) + offsetX;
      sprite.y = centerY - offsetY;
      sprite.rotation = 0;
      sprite.alpha = 1;
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      sprite.x = this.defaultCardPosition.x;
      sprite.y = this.defaultCardPosition.y;
      gsap.to(sprite, {
        x: (index * 80) + offsetX,
        y: centerY - offsetY,
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

  rotatePlayer(_players) {
    const playerIndex = _players.findIndex((p) => p.id === this.playerId);
    // Rotate players so the current player is at the beginning
    const rotatedPlayers = _players.slice(playerIndex).concat(_players.slice(0, playerIndex));
    return rotatedPlayers;
  }

  private updatePlayer(player: Player, _player) {
    player.id = _player.id;
    player.chips = _player.chips;
    player.hand = _player.hand.map(h => new Card(h.rank, h.suit));
    player.currentBet = _player.currentBet;
    player.setBet(_player.currentBet, false)
    player.folded = _player.folded;
    player.allIn = _player.allIn;
    player.handName = _player.handName;
    player.handRank = _player.handRank;
    player.raiseBetAmount = _player.raiseBetAmount || this.blinds.big;
    player.smallBlinds = _player.smallBlinds;
    player.bigBlinds = _player.bigBlinds;
    player.user_id = _player.user_id;
  }
  async initPlayer(_player, insert: boolean = true) {
    const player = new Player(this, await Assets.load(_player.avatar), _player.name, _player.index, _player.id);
    this.updatePlayer(player, _player)
    if (insert) {
      this.players.push(player)
      this.playersContainer.addChild(player.ui)
      player.initialize();
    }
    this.positionPlayers();
    return player
  }

  async addPlayer(name: string, avatar: string, id: string) {
    if (this.players.length === Poker.MAX_PLAYERS) return;

    const player = new Player(this, await Assets.load(avatar), name, this.players.length, id);
    player.chips = this.betAmount;
    this.players.push(player);
    this.playersContainer.addChild(player.ui)

    player.initialize();

    this.positionPlayers();

    if (this.players.length === Poker.MAX_PLAYERS) this.startGame();
    this.updateUI();
  }

  playReady() {
    return !this.dealingCards && this.gameStarted
  }


  removePlayer(playerId) {
    const playerIndex = this.players.findIndex((p) => p.id === playerId);
    if (playerIndex !== -1) {
      this.players[playerIndex].leftGame = true;
      if (!this.gameStarted) {
        this.players[playerIndex].destroy();
        this.players.splice(playerIndex, 1);
        //Re-index
        for (let i = 0; i < this.players.length; i++) {
          this.players[i].index = i;
        }
        this.positionPlayers()
      }
      this.updateUI();
    }

  }

  localPlayerTurn() {
    if (this.offlineMode) return this.players[this.currentPlayerIndex]?.isLocal() && !this.dealingCards;
    return this.players[this.currentPlayerIndex]?.id === get(socketData)?.io.id && !this.dealingCards;;
  }

  localPlayer() {
    if (this.offlineMode) return this.players[0];
    return this.players.find(p => p.id === get(socketData)?.io.id)
  }


  async nextPlayer() {
    if (this.destroyed) return;
    this.currentPlayerIndex = this.currentPlayerIndex + 1 % this.players.length
    if (this.currentPlayerIndex === this.players.length) this.currentPlayerIndex = 0;
    while ((this.players[this.currentPlayerIndex].folded || this.players[this.currentPlayerIndex].allIn) && this.currentPlayerIndex !== this.roundStartIndex) this.currentPlayerIndex++;
    if (this.currentPlayerIndex === this.roundStartIndex) {
      await this.advanceGame();
      if (this.gameState === 'SHOWDOWN')
        return;
      // return await this.nextPlayer();
    }
    if (!this.currentPlayerIndex) this.soundManager.play(SoundConstants.CHIME_YOUR_TURN)

    if (this.offlineMode) this.checkAIPlay();
  }


  checkAIPlay() {

    if (this.currentPlayerIndex) {
      DumbAI.play(this, this.players[this.currentPlayerIndex]);
      setTimeout(async () => {
        await this.nextPlayer()
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

  async advanceGame() {
    this.dealingCards = true;
    if (this.destroyed) return;
    this.updateUI();
    switch (this.gameState) {
      case "PRE_FLOP":
        this.gameState = 'FLOP';

        // Collect all bets to pots

        this.pot += this.players.reduce((prev, curr) => prev + curr.currentBet, 0);
        //Reset Bets
        this.players.forEach(p => p.setBet(0));
        this.updateUI();





        // await this.toggleDealerContainer(true)
        // this.typewriteText(this.dealerText, 'Here comes the flop!', 50, async () => {
        //   this.toggleDealerContainer();

        // });
        await this.dealCommunityCards(this.deck.deal(3));
        this.dealingCards = false;
        this.updateUI();
        break;
      case "FLOP":
        this.gameState = 'TURN';

        // Collect all bets to pots
        this.pot += this.players.reduce((prev, curr) => prev + curr.currentBet, 0);;
        //Reset Bets
        this.players.forEach(p => p.setBet(0));
        this.updateUI();


        // await this.toggleDealerContainer(true)
        // this.typewriteText(this.dealerText, 'Here comes the turn!', 50, async () => {
        //   this.toggleDealerContainer();

        // });
        await this.dealCommunityCards(this.deck.deal(1));
        this.dealingCards = false;
        this.updateUI();
        break;
      case "TURN":
        this.gameState = 'RIVER';

        // Collect all bets to pots
        this.pot += this.players.reduce((prev, curr) => prev + curr.currentBet, 0);
        //Reset Bets
        this.players.forEach(p => p.setBet(0));
        this.updateUI();


        // await this.toggleDealerContainer(true)
        // this.typewriteText(this.dealerText, 'Here comes the river!', 50, async () => {
        //   this.toggleDealerContainer();

        // });
        await this.dealCommunityCards(this.deck.deal(1));
        this.dealingCards = false;
        this.updateUI();
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
        const response = await get(app)?.post({ players: handPayload }, 'poker/eval')
        this.players.forEach(p => {
          p.handRank = response.ranks[p.name].handRank;
          p.handName = response.ranks[p.name].handName;
        })
        const activePlayers = this.players.filter(p => !p.folded).sort((a, b) => b.handRank - a.handRank);

        // Give pot to winner;
        activePlayers[0].chips += this.pot;
        const winner = activePlayers[0];
        this.pot = 0;

        await this.toggleDealerContainer(true)
        this.soundManager.play(SoundConstants.AUDIENCE_CLAP_HAPPY);
        this.typewriteText(this.dealerText, `${winner.name} Won the pot ${activePlayers.length === 1 ? 'because everyone else folded' : `"${winner.handName}"`}`, 50, async () => {
          setTimeout(() => {
            this.toggleDealerContainer();
            this.gameEnded = true;
            this.dealingCards = false;
            this.updateUI()
          }, 2000)
        });
        break;
      case "SHOWDOWN":
    }
  }
  async dealCommunityCards(cards: Card[]) {
    for (const card of cards) {
      if (this.destroyed) break;
      card.revealCard(false);
      card.cardUI.scale.set(0.4, 0.4)
      this.cardsContainer.addChild(card.cardUI)
      this.communityCards.push(card)
      this.soundManager.play(SoundConstants.CARD_DEAL);
      await this.placeCommunityCard(card.cardUI)
    }
  }

  maxBet(): number {
    return this.players.map(p => p.currentBet).sort()[this.players.length - 1]
  }

  destroy() {
    this.destroyed = true;
    this.soundManager.canPlay = false;
    this.soundManager.stopAll()
    get(socketData)?.io.emit('leaveGame', { gameId: this.gameId });
    get(socketData)?.io.disconnect();
  }
}