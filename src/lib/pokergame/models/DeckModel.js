// Card deck model
export default class DeckModel {
  constructor(numberOfDecks) {
    this._cards = new Array();
    numberOfDecks <= 0 && (numberOfDecks = 1);
    this._numberOfDecks = numberOfDecks;
    this._rebuildDeck();
  }

  // Get the next card in the deck
  getNextCard() {
    if (!(this._currentIndex >= this._cards.length)) {
      ++this._currentIndex;
      return this._cards[this._currentIndex - 1];
    }
  }

  // Get a card at a specific index
  getCard(cardIndex) {
    if (this.isDeckReady() && !(cardIndex < 0)) {
      return this._cards[cardIndex];
    }
  }

  // Check if the deck is ready
  isDeckReady() {
    if (this._currentIndex >= this._cards.length) {
      return true;
    }
  }

  // Rebuild the deck
  _rebuildDeck() {
    this._cards.length = 0;
    for (let deckIndex = 0; deckIndex < this._numberOfDecks; ++deckIndex) {
      for (let cardIndex = 0; cardIndex < 52; ++cardIndex) {
        this._cards.push(cardIndex);
      }
    }
    this.ShuffleCards();
  }

  // Shuffle the cards in the deck
  ShuffleCards() {
    for (
      let cardIndex = this._cards.length, shuffleIndex = 0;
      shuffleIndex !== cardIndex;

    ) {
      shuffleIndex = Math.floor(Math.random() * cardIndex);
      cardIndex -= 1;
      let temp = this._cards[cardIndex];
      this._cards[cardIndex] = this._cards[shuffleIndex];
      this._cards[shuffleIndex] = temp;
    }
    this._currentIndex = 0;
  }
}