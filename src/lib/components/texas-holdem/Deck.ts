import Card from './Card.js';

class Deck {
  
  suits: string[];
  ranks: string[];
  cards: Card[];
  constructor() {
    this.suits = ['C', 'D', 'H', 'S'];
    this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    this.cards = [];
  }

  createDeck() {
    return this.suits.flatMap(suit => this.ranks.map(rank => new Card(rank, suit)));
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Swap
    }
  }
  reset() {
    this.cards = this.createDeck();
    this.shuffle();
  }


  deal(numCards: number) {
    return this.cards.splice(0, numCards); // Returns the dealt cards and removes them from the deck
  }
  initializeDeck(decks: [{rank: string, suit: string}]) {
    this.cards = decks.map(d => new Card(d.rank, d.suit))
  }

}


export default Deck;