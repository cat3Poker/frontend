import { Assets, Container, Sprite, Text, Texture } from "pixi.js";
import type Card from "./Card.js";
import type Poker from "./Poker.js";
import gsap from "gsap";
import { SoundConstants } from "./SoundManager.js";
const CHIP_VALUES: { [color: string]: number } = {
  "Blue": 10,
  "Green": 25,
  "Purple": 50,
  "Red": 100,
  "Yellow": 500,
};
class Player {

  id: string;
  user_id: string;
  leftGame: boolean;
  chips: number = 2000;
  hand: Card[];
  currentBet: number = 0;
  raisedBet: number = 0;
  folded: boolean;
  ui: Container;
  game: Poker;
  frameContainer: Container;
  actionIndicator: Container;
  avatarFrame: Sprite;
  avatarFrameActive: Sprite;
  actionUI: Container;
  actionUI_BG: Sprite;
  actionUIText: Text;
  chipsText: Text;
  chipsBackgroundNormal: Sprite;
  chipsBackgroundActive: Sprite;

  betChipsUI: Container;
  betChipsIcon: Sprite;
  betChipsText: Text;
  isDealer: boolean;
  index: number;
  raiseBetAmount: number;
  allIn: boolean;
  name: string;
  handRank: any;
  handName: any;
  smallBlinds: boolean;
  bigBlinds: boolean;
  initialized: boolean;
  constructor(game: Poker, private avatar: Texture, name: string = "Guest001", index: number, id: string) {
    this.id = id;
    this.game = game;
    this.index = index;
    this.name = name;
    this.hand = [];  // Player's cards
    this.currentBet = 0;
    this.folded = false; // To track if the player has folded
    this.ui = new Container(); // To hold UI elements (name display, chip count, etc.)

    this.actionIndicator = new Container();
    this.frameContainer = new Container();

  }

  // Method to add cards to the player's hand
  async addCards(cards: Card[]) {
    this.hand = this.hand.concat(cards)
  }

  betUi() {
    return {
      view: this.betChipsUI
    }
  }

  async leaveGame() {

    // TODO:  post socket leave game;
    this.leftGame = true;
  }


  initialize() {
    if (this.initialized) return;
    if (this.isLocal()) {

      this.ui.width = 200;
      this.ui.height = 80

      this.chipsBackgroundNormal = Sprite.from(Assets.get('Balance_User_Normal'))
      this.chipsBackgroundActive = Sprite.from(Assets.get('Balance_User_Glow'))

      const chipsIcon = Sprite.from(Assets.get('Chip_Arkadium_Blue'))
      this.chipsText = new Text({
        text: this.chips.toLocaleString(), style: {
          fill: '#ffff',
          align: 'center',
          fontSize: 60
        }
      });
      this.ui.addChild(this.chipsBackgroundActive, this.chipsBackgroundNormal, this.chipsText, chipsIcon)
      this.chipsText.anchor.set(0.5, 0.5)
      this.chipsText.x = this.ui.width / 2;
      this.chipsText.y = this.ui.height / 2 - 20;
      chipsIcon.scale.set(0.6, 0.6)

      chipsIcon.anchor.set(0.5, 0.5);
      chipsIcon.y = this.ui.height / 2 - 20;
      chipsIcon.x = 100;
      // this.chipsBackgroundActive.anchor.set(0.5, 0.5)


      this.ui.scale.set(0.7)


    } else {
      const shadow = Sprite.from(Assets.get('Shadow'));
      this.avatarFrame = Sprite.from(Assets.get('PlayerDisplay'));
      this.avatarFrameActive = Sprite.from(Assets.get('PlayerDisplay_On'));

      //Actions
      this.actionUI = new Container();
      this.actionUI_BG = Sprite.from(Assets.get('Action_Tan'));


      this.actionUIText = new Text({
        text: '', style: {
          fill: '#ffff',
          align: 'center'
        }
      })
      this.actionUI.alpha = 0;
      this.actionUIText.anchor.set(0.5)
      this.actionUIText.x = this.actionUI_BG.width / 2;
      this.actionUIText.y = 10;
      this.actionUI.addChild(this.actionUI_BG, this.actionUIText);

      const image = Sprite.from(this.avatar);

      
      this.frameContainer.addChild(shadow, this.avatarFrame, this.avatarFrameActive, image)
      image.width = 200;
      image.height = 200;
      image.anchor.set(0.5, 0.5)
      image.x = this.frameContainer.width / 2 - image.width / 3
      image.y =  this.frameContainer.height / 2 - image.height / 2

      this.ui.addChild(this.frameContainer);

      const nameText = new Text({
        text: this.name, style: {
          fill: '#ffff',
          align: 'center'
        }
      });
      nameText.anchor.set(0.5)
      nameText.x = this.ui.width / 2;
      nameText.y = this.ui.height - 5;

      this.actionUI.x = this.ui.width / 2 - (this.actionUI_BG.width / 2)

      this.ui.addChild(nameText, this.actionUI)

      this.chipsText = new Text({
        text: this.chips.toLocaleString(), style: {
          fill: '#ffff',
          align: 'center',
          fontSize: 40
        }
      });
      this.frameContainer.addChild(this.chipsText);
      this.chipsText.anchor.set(0.5)
      this.chipsText.x = this.frameContainer.width / 2 - 10;
      this.chipsText.y = this.frameContainer.height - 75;



      this.ui.scale.set(0.6, 0.6)

    }


    this.betChipsUI = new Container();

    this.betChipsText = new Text({
      text: '',
      style: {
        fill: '#ffffff',
        fontWeight: 'bold',
        align: 'center'
      }
    });
    this.betChipsText.anchor.set(0.5, 0.5);
    this.betChipsText.x = 70;
    this.betChipsUI.addChild(this.betChipsText);


    this.betChipsIcon = Sprite.from('Chip_Green');
    this.betChipsIcon.anchor.set(0.5, 0.5);
    this.betChipsIcon.scale.set(0.2);
    this.betChipsUI.addChild(this.betChipsIcon, this.betChipsText);



    this.ui.addChild(this.betChipsUI)
    if (!this.index) {
      this.betChipsUI.x = (this.ui.width / 2) + this.betChipsUI.width / 2;
      this.betChipsUI.y = 200
    } else if (this.index <= 3) {
      this.betChipsUI.x = 250
      this.betChipsUI.y = 100
    } else {
      this.betChipsUI.x = -70
      this.betChipsUI.y = 100
    }



    this.raiseBetAmount = this.game.blinds.big;
    this.updateUI();
    this.initialized = true;
  }

  isLocal() {
    return this.game.playerId === this.id;
  }

  setBet(amount: number, updateChips: boolean = false) {
    this.currentBet = Math.min(this.chips, amount);
    if (updateChips) this.chips -= amount;
    if (this.actionUI) this.actionUI.alpha = (!this.currentBet || updateChips) ? 0 : 1;
    this.game.currentBet = this.currentBet;
    this.raisedBet = 0;
  }

  bet() {

    const prevBet = this.game.currentBet;
    console.log(`${this.name} :> currentBet => ${this.currentBet}, Raised Bet => ${this.raisedBet}`)

    let betting = Math.max(this.currentBet, prevBet, this.raisedBet);

    if (!this.currentBet) this.currentBet = betting
    else {
      //blinds player
      betting -= this.currentBet;
      this.currentBet = betting + this.currentBet;
    }

    console.log('prevBet, betting', prevBet, betting)


    if (betting === this.chips) {
      console.log('All In Bet')
      this.game.soundManager.play(SoundConstants.CHIME_ALL_IN);
      this.setAction('Action_Blue', 'All In');
      this.allIn = true;
    } else if (betting > prevBet) { // RAISE
      console.log('Raise Bet')
      this.setAction('Action_Green', 'Raise');
      this.game.soundManager.play(SoundConstants.CHIME_RAISE);
    } else {
      console.log('Call Bet')
      this.setAction('Action_Tan', !prevBet ? 'Check' : 'Call');
      this.game.soundManager.play(!prevBet ? SoundConstants.CHIME_CHECK : SoundConstants.CHIME_CALL)
    }
    this.chips -= betting
    this.game.currentBet = this.currentBet
    this.raiseBetAmount = this.game.blinds.big;
    this.updateUI();
  }

  setServerAction(action: string, prevBet) {
    switch (action) {
      case 'raise': {
        this.setAction('Action_Green', 'Raise');
        this.game.soundManager.play(SoundConstants.CHIME_RAISE)
        break;
      }
      case 'allIn': {
        this.game.soundManager.play(SoundConstants.CHIME_ALL_IN);
        this.setAction('Action_Blue', 'All In');
        this.allIn = true;
        break;
      }
      case 'call': {
        this.setAction('Action_Tan', !prevBet ? 'Check' : 'Call');
        this.game.soundManager.play(!prevBet ? SoundConstants.CHIME_CHECK : SoundConstants.CHIME_CALL)
        break;
      }
      case 'fold': {
        this.folded = true;
        this.setAction('Action_Red', 'Fold');
        this.game.soundManager.play(SoundConstants.CHIME_FOLD)
        break;
      }
      default:
        break;
    }
  }

  private setAction(bg: string, text: string) {
    if (!this.actionUI) return;
    this.actionUI_BG.texture = Assets.get(bg);
    this.actionUIText.text = text;
    this.animateAction();
  }

  animateAction() {
    // Animate the actionUI with a bouncing effect and fade in
    gsap.fromTo(this.actionUI,
      { alpha: 0, y: -10 },
      { alpha: 1, y: 0, duration: 0.5, ease: "bounce.out" }
    );
  }

  raise(amount: number = this.raiseBetAmount) {
    this.raisedBet = Math.min(this.chips, (amount + this.game.maxBet()));
    this.bet();
  }

  raiseBet(increment: boolean) {
    this.raiseBetAmount = Math.max(this.game.blinds.big, Math.min(this.chips, this.raiseBetAmount + ((increment ? 1 : -1) * this.game.blinds.big)))
  }


  resetBet() {
    this.setBet(0);
    this.raiseBetAmount = this.game.blinds.big;
    this.updateUI();
  }

  fold() {
    this.folded = true;
    this.setAction('Action_Red', 'Fold');

    this.game.soundManager.play(SoundConstants.CHIME_FOLD)

    this.updateUI();
  }

  resetFold() {
    this.folded = false;
  }

  getChipColor(betAmount: number): string | null {
    if (betAmount >= 0 && betAmount < CHIP_VALUES["Green"]) {
      return "Blue";
    } else if (betAmount >= CHIP_VALUES["Green"] && betAmount < CHIP_VALUES["Purple"]) {
      return "Green";
    } else if (betAmount >= CHIP_VALUES["Purple"] && betAmount < CHIP_VALUES["Red"]) {
      return "Purple";
    } else if (betAmount >= CHIP_VALUES["Red"] && betAmount < CHIP_VALUES["Yellow"]) {
      return "Red";
    } else if (betAmount >= CHIP_VALUES["Yellow"]) {
      return "Yellow";
    } else {
      return null; // Or handle invalid bet amounts as needed
    }
  }

  updateUI() {
    if (this.isLocal()) {
      this.chipsBackgroundActive.alpha = this.index === this.game.currentPlayerIndex ? 1 : 0;
      this.chipsBackgroundNormal.alpha = this.index === this.game.currentPlayerIndex ? 0 : 1;
      this.ui.alpha = this.folded ? 0.5 : 1
    } else {
      this.frameContainer.alpha = (this.folded || this.leftGame) ? 0.5 : 1;
      this.avatarFrame.alpha = this.index === this.game.currentPlayerIndex ? 0 : 1
      this.avatarFrameActive.alpha = this.index === this.game.currentPlayerIndex ? 1 : 0
    }
    this.betChipsUI.alpha = !!this.currentBet ? 1 : 0

    this.chipsText.text = this.chips.toFixed(4);
    this.betChipsText.text = this.currentBet.toFixed(4);
    const chipColor = this.getChipColor(this.currentBet);
    if (chipColor) {
      this.betChipsIcon.texture = Texture.from(`Chip_${chipColor}`);
    }

  }

  isActive() {
    return this.folded && !this.leftGame;
  }


  reset() {
    this.resetFold();
    this.resetBet();
    if (this.actionUI) this.actionUI.alpha = 0;
    this.allIn = false;
    this.isDealer = false;
    this.hand = [];
  }

  updateChips(newChips: number) {
    this.chips += newChips;
    this.updateUI();
  }
  destroy() {
    this.ui.removeFromParent();
    this.ui.destroy()
  }
}



export default Player;