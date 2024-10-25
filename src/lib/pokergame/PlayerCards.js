import { PlayingCardModel } from "./models/PlayingCardModel.js";

// Model for the player's cards

export class PlayerCards {
  constructor() {
    this.Card1 = new PlayingCardModel();
    this.Card2 = new PlayingCardModel();
  }
}
