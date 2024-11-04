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
  chips: number = 2000;
  hand: Card[];
  currentBet: number;
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
  constructor(game: Poker, private avatar: Texture, name: string = "Guest001", index: number) {
    this.game = game;
    this.index = index;
    this.name = name;
    this.hand = [];  // Player's cards
    this.hand = [];
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


  initialize() {

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

      this.frameContainer.addChild(shadow, this.avatarFrame, this.avatarFrameActive, Sprite.from(this.avatar))

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

      this.actionUI.x = this.ui.width / 2 - (this.actionUI_BG.width/2)

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
    this.betChipsText.x = 50;
    this.betChipsUI.addChild(this.betChipsText);

 
    this.betChipsIcon = Sprite.from('Chip_Green');
    this.betChipsIcon.anchor.set(0.5, 0.5);
    this.betChipsIcon.scale.set(0.2);
    this.betChipsUI.addChild(this.betChipsIcon, this.betChipsText);
    


    this.ui.addChild(this.betChipsUI)
    if (!this.index) {
      this.betChipsUI.x = (this.ui.width / 2) + this.betChipsUI.width / 2;
      this.betChipsUI.y = 200
    } else if (this.index < 3) {
      this.betChipsUI.x = 250
      this.betChipsUI.y = 200
    } else {
      this.betChipsUI.x = -60
      this.betChipsUI.y = 210
    }


   
    this.raiseBetAmount = Math.max(this.game.maxBet(), this.game.blinds.big);
    this.updateUI();
  }

  isLocal() {
    return !this.index;
  }

  setBet(amount: number) {
    this.currentBet = amount;
  }

  bet() {

    const maxBet = this.game.maxBet();

    const amount = Math.max(this.currentBet, maxBet);

    

    if (!this.isLocal()) {
      if (amount === this.chips) {
        this.game.soundManager.play(SoundConstants.CHIME_ALL_IN);
        this.actionUI_BG.texture = Assets.get('Action_Blue')
        this.actionUIText.text = 'All In'
        this.allIn = true;
      } else if (this.currentBet > maxBet) { // RAISE
        this.actionUI_BG.texture = Assets.get('Action_Green')
        this.actionUIText.text = 'Raise'
        this.game.soundManager.play(SoundConstants.CHIME_RAISE);
      } else {
        this.actionUI_BG.texture = Assets.get('Action_Tan')
        this.actionUIText.text = !maxBet ? 'Check' : 'Call'
        this.game.soundManager.play(!maxBet ? SoundConstants.CHIME_CHECK : SoundConstants.CHIME_CALL)
      }

      this.animateAction();
    }

    this.chips -= amount
    this.game.currentBet = amount
    this.raiseBetAmount = this.game.blinds.big;
    if (this.allIn) this.game.createSidePot();
    this.updateUI();

  }

  animateAction() {
    // Animate the actionUI with a bouncing effect and fade in
    gsap.fromTo(this.actionUI,
      { alpha: 0, y: -10 },
      { alpha: 1, y: 0, duration: 0.5, ease: "bounce.out" }
    );
  }

  raise() {
    this.currentBet = Math.min(this.chips, this.raiseBetAmount + this.game.maxBet());
    if (this.currentBet === this.chips) this.allIn = true;
    this.bet();
  }

  raiseBet(increment: boolean) {
    this.raiseBetAmount = Math.max(this.game.currentBet, Math.min(this.chips, this.raiseBetAmount + ((increment ? 1 : -1) * this.game.blinds.big)))
  }


  resetBet() {
    this.currentBet = 0;
    this.raiseBetAmount = Math.max(this.game.maxBet(), this.game.blinds.big);
    this.updateUI();
  }

  fold() {
    this.folded = true;
    this.actionUI_BG.texture = Assets.get('Action_Red')
    this.actionUIText.text = 'Fold'
    this.game.soundManager.play(SoundConstants.CHIME_FOLD)
    this.animateAction();
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
    } else {
      this.frameContainer.alpha = this.folded ? 0.5 : 1;
      this.avatarFrame.alpha = this.index === this.game.currentPlayerIndex ? 0 : 1
      this.avatarFrameActive.alpha = this.index === this.game.currentPlayerIndex ? 1 : 0 

      if (!this.currentBet && !this.actionUI.alpha) {
        this.actionUI.alpha = 0;
      }
    }
    this.betChipsUI.alpha = !!this.currentBet ? 1 : 0
  
    this.chipsText.text = this.chips.toLocaleString();
    this.betChipsText.text = this.currentBet.toLocaleString();
    const chipColor = this.getChipColor(this.currentBet);
    if (chipColor) {
      this.betChipsIcon.texture = Texture.from(`Chip_${chipColor}`); 
    }

  }


  reset() {
    this.resetFold();
    this.resetBet();
    this.actionUI.alpha = 0;
    this.allIn = false;
    this.isDealer = false;
  }

  updateChips(newChips: number) {
    this.chips += newChips;
    this.updateUI();
  }

}



export default Player;