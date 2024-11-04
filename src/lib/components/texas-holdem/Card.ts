import {Assets, Container, Sprite} from 'pixi.js'
import { gsap } from "gsap";
class Card {
    
    rank: string;
    suit: string;
    value: number;
    sprite: Sprite;
    cardUI: Container;
    glowOver: Sprite;
    glowUnder: Sprite;
    cardBack: Sprite;
    cardFront: Sprite;
    cardHighlighted: boolean = false;
    constructor(rank: string, suit: string) {
        this.rank = rank;
        this.suit = suit;
        this.value = this.getValue();  // Assign numerical value
        this.cardUI = new Container();
        this.glowOver = Sprite.from(`Glow_Card_Over`);
        this.glowUnder = Sprite.from(`Glow_Card_Under`);
        this.glowOver.alpha = 0;
        this.glowUnder.alpha = 0;
        this.glowUnder.x = -25;
        this.glowUnder.y = -25;
        this.cardBack = Sprite.from(`MobileCards_Back`);
        this.cardFront = Sprite.from(`MobileCards_${suit}_${rank}`);
        this.sprite = this.cardBack; // To hold the PIXI.Sprite later
        this.sprite.anchor.set(0.5, 0.5)
        this.sprite.x = this.sprite.width / 2;
        this.sprite.y = this.sprite.height / 2;

        this.cardUI.addChild(this.glowUnder, this.sprite, this.glowOver)
        this.cardUI.scale.set(0.2, 0.2)
        this.cardUI.alpha = 0;
        this.cardUI.rotation = 180;
    }

    getValue() { // Assigns numerical values to ranks
        if (this.rank === 'A') return 14; // Ace is high
        if (['J', 'Q', 'K'].includes(this.rank)) return 11 + ['J', 'Q', 'K'].indexOf(this.rank);
        return parseInt(this.rank);
    }

    getName() {
        return `MobileCards_${this.suit}_${this.rank}`
    }
    stringName(): any {
       return `${this.rank}${this.suit}`;
    }

    async revealCard(animate: boolean = true) {
        
        if (!animate) {
            this.sprite.texture = this.cardFront.texture;
            return Promise.resolve();
        }
        return new Promise<void>((resolve) => { // Wrap animation in a Promise
            const originalScaleX = this.sprite.scale.x;
            this.cardUI.alpha = 1;
            gsap.to(this.sprite.scale, {
                x: 0, duration: 0.25, ease: "power2.in", onComplete: () => {
                    this.sprite.texture = this.cardFront.texture;
                    gsap.to(this.sprite.scale, {
                        duration: 0.25,
                        x: originalScaleX,
                        ease: "power2.out",
                        onComplete: () => {
                            resolve();
                        }
                    });
                    
                }
            });
        });
    }
}

export default Card;