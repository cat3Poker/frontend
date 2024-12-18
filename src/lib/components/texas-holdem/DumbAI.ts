import type Player from "./Player";
import type Poker from "./Poker";

export default class DumbAI {
  static play(game: Poker, player: Player) {
    const maxBet = game.maxBet();
     if (player.chips < maxBet) {
      player.fold();
    } else {
      Math.random() < 0.6
        ? player.bet()
        : player.raise()
    }
  }
}