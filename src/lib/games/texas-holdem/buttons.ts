import { Application, Assets, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import gsap from "gsap";
export class Button {
    ui: Container;
    text: Text;
    subText: Text;
    enabled: boolean = true;
    constructor(bg: Texture, text: string, subText: string, width: number, height: number, callback = () => { }) {
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
          align: 'center',
          fontSize: 16,
        }
      })
      this.text.anchor.set(0.5); // Center the text horizontally
      this.text.x = this.ui.width / 2; // Center horizontally
      this.text.y = this.ui.height / 2 -10; // Adjust for vertical alignment
      this.subText = new Text({
        text: subText ? subText : "", style: {
          fontStyle: 'normal',
          fill: '#FFFFFF',
          align: 'center',
          fontSize: 16,
        }
      })
  
      this.subText.anchor.set(0.5); // Center the subText horizontally
  
      this.subText.x = this.ui.height / 2 + this.subText.width / 2; // Center horizontally
      this.subText.y = this.ui.height / 2 + 10; // Adjust for vertical alignment
  
  
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


 export class IconButton extends Button {
    constructor(bg: Texture, icon: Texture, size: number, callback = () => { }) {
      super(bg, '', '', size, size, callback)
      const is = Sprite.from(icon);
      is.anchor.set(0.5);
      is.width = 50
      is.height = 50
      is.y = this.ui.height / 2;
      is.x = this.ui.width / 2;
      this.ui.addChild(is);
    }
  }