// Define card combination powers
const CardCombinationPowersID = {
  INVALID: -1,
  HIGH_CARD: 0,
  PAIR: 1,
  TWO_PAIR: 2,
  THREE_OF_A_KIND: 3,
  STRAIGHT: 4,
  FLUSH: 5,
  FULL_HOUSE: 6,
  FOUR_OF_A_KIND: 7,
  STRAIGHT_FLUSH: 8,
  ROYAL_FLUSH: 9
};

// Utility class for card combinations
class CardCombinationUtil {
  // Sort cards by value, handling Ace as high
  static simpleOrder(cards) {
    let cardValues = cards.filter(card => card >= 0);
    let cardIndexes = cardValues.map((_, index) => index);
    cardValues.forEach((cardValue, index) => {
      if (cardValue === 13) {
        cardValues.push(0);
        cardIndexes.push(index);
      }
    });
    let sorted = this._sortCards(cardValues, cardIndexes);
    return sorted;
  }

  // Sort cards by suit and value
  static _sortCards(cardValues, cardIndexes) {
    for (let i = 0; i < cardValues.length; ++i) {
      for (let j = 0; j < cardValues.length - 1; ++j) {
        if (cardValues[j] > cardValues[j + 1]) {
          let tempValue = cardValues[j];
          cardValues[j] = cardValues[j + 1];
          cardValues[j + 1] = tempValue;
          let tempIndex = cardIndexes[j];
          cardIndexes[j] = cardIndexes[j + 1];
          cardIndexes[j + 1] = tempIndex;
        }
      }
    }
    return [cardValues, cardIndexes];
  }

  // Remove a specific card value from the list
  static removeFromList(list, cardValue) {
    if (!list) return list;
    let index = list.indexOf(cardValue);
    if (index > -1) {
      list.splice(index, 1);
    }
    return list;
  }

  // Remove duplicate card values from the list
  static noDupeOrder(cards) {
    let uniqueCards = [];
    cards.forEach(card => {
      if (card >= 0 && !uniqueCards.includes(card)) {
        uniqueCards.push(card);
      }
    });
    return uniqueCards;
  }

  // Determine the card combination and winning cards
  static getCardCombination(
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7
  ) {
    if (card1 + card2 + card3 + card4 + card5 + card6 + card7 === -7) {
      return [CardCombinationPowersID.INVALID, -1];
    }

    // Combine all cards
    let cards = [card1, card2, card3, card4, card5, card6, card7].filter(
      card => card >= 0
    );

    // Extract suits and values
    let suits = cards.map(card => Math.floor(card / 13));
    let values = cards.map(card => Math.floor(card % 13) + 1);

    // Sort values and get indexes
    let [sortedValues, sortedIndexes] = this._sortCards(values, [...Array(7).keys()]);

    // Check for flush
    let flush = suits.every(suit => suit === suits[0]);

    // Check for straight
    let straight = false;
    let straightHighCard = -1;
    for (let i = 0; i < sortedValues.length - 4; ++i) {
      if (
        sortedValues[i] + 1 === sortedValues[i + 1] &&
        sortedValues[i + 1] + 1 === sortedValues[i + 2] &&
        sortedValues[i + 2] + 1 === sortedValues[i + 3] &&
        sortedValues[i + 3] + 1 === sortedValues[i + 4]
      ) {
        straight = true;
        straightHighCard = sortedValues[i + 4];
      }
    }

    // Check for pairs, three-of-a-kind, and four-of-a-kind
    let pairCount = 0;
    let threeOfAKindCount = 0;
    let fourOfAKindCount = 0;
    let pairs = [];
    let threeOfAKinds = [];
    let fourOfAKinds = [];
    for (let i = 0; i < sortedValues.length - 1; ++i) {
      if (sortedValues[i] === sortedValues[i + 1]) {
        if (i < sortedValues.length - 2 && sortedValues[i] === sortedValues[i + 2]) {
          if (i < sortedValues.length - 3 && sortedValues[i] === sortedValues[i + 3]) {
            fourOfAKindCount++;
            fourOfAKinds.push(sortedValues[i]);
          } else {
            threeOfAKindCount++;
            threeOfAKinds.push(sortedValues[i]);
          }
        } else {
          pairCount++;
          pairs.push(sortedValues[i]);
        }
      }
    }

    // Determine the card combination and winning cards
    let combination = CardCombinationPowersID.HIGH_CARD;
    let winningCards = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    if (flush && straight && straightHighCard === 13) {
      combination = CardCombinationPowersID.ROYAL_FLUSH;
      winningCards[0] = 12;
      winningCards[1] = 11;
      winningCards[2] = 10;
      winningCards[3] = 9;
      winningCards[4] = 8;
      winningCards[5] = 13;
      winningCards[6] = 12;
      winningCards[7] = 11;
      winningCards[8] = 10;
      winningCards[9] = 9;
      winningCards[10] = 8;
    } else if (flush && straight) {
      combination = CardCombinationPowersID.STRAIGHT_FLUSH;
      for (let i = 0; i < 5; ++i) {
        winningCards[i] = sortedIndexes[sortedValues.length - 5 + i];
      }
      winningCards[5] = straightHighCard;
    } else if (fourOfAKindCount > 0) {
      combination = CardCombinationPowersID.FOUR_OF_A_KIND;
      winningCards[0] = sortedIndexes[sortedValues.indexOf(fourOfAKinds[0])];
      winningCards[1] = sortedIndexes[sortedValues.indexOf(fourOfAKinds[0]) + 1];
      winningCards[2] = sortedIndexes[sortedValues.indexOf(fourOfAKinds[0]) + 2];
      winningCards[3] = sortedIndexes[sortedValues.indexOf(fourOfAKinds[0]) + 3];
      winningCards[4] = -1;
      let remainingValues = this.noDupeOrder(
        this.removeFromList(values, fourOfAKinds[0])
      );
      winningCards[5] = remainingValues[remainingValues.length - 1];
    } else if (threeOfAKindCount > 0 && pairCount > 0) {
      combination = CardCombinationPowersID.FULL_HOUSE;
      winningCards[0] = sortedIndexes[sortedValues.indexOf(threeOfAKinds[0])];
      winningCards[1] =
        sortedIndexes[sortedValues.indexOf(threeOfAKinds[0]) + 1];
      winningCards[2] =
        sortedIndexes[sortedValues.indexOf(threeOfAKinds[0]) + 2];
      winningCards[3] = sortedIndexes[sortedValues.indexOf(pairs[0])];
      winningCards[4] = sortedIndexes[sortedValues.indexOf(pairs[0]) + 1];
    } else if (flush) {
      combination = CardCombinationPowersID.FLUSH;
      for (let i = 0; i < 5; ++i) {
        winningCards[i] = sortedIndexes[sortedValues.length - 5 + i];
      }
    } else if (straight) {
      combination = CardCombinationPowersID.STRAIGHT;
      for (let i = 0; i < 5; ++i) {
        winningCards[i] = sortedIndexes[sortedValues.length - 5 + i];
      }
      winningCards[5] = straightHighCard;
    } else if (threeOfAKindCount > 0) {
      combination = CardCombinationPowersID.THREE_OF_A_KIND;
      winningCards[0] = sortedIndexes[sortedValues.indexOf(threeOfAKinds[0])];
      winningCards[1] =
        sortedIndexes[sortedValues.indexOf(threeOfAKinds[0]) + 1];
      winningCards[2] =
        sortedIndexes[sortedValues.indexOf(threeOfAKinds[0]) + 2];
      let remainingValues = this.noDupeOrder(
        this.removeFromList(values, threeOfAKinds[0])
      );
      winningCards[3] = remainingValues[remainingValues.length - 1];
      winningCards[4] = remainingValues[remainingValues.length - 2];
      winningCards[5] = threeOfAKinds[0];
    } else if (pairCount > 1) {
      combination = CardCombinationPowersID.TWO_PAIR;
      winningCards[0] = sortedIndexes[sortedValues.indexOf(pairs[0])];
      winningCards[1] = sortedIndexes[sortedValues.indexOf(pairs[0]) + 1];
      winningCards[2] = sortedIndexes[sortedValues.indexOf(pairs[1])];
      winningCards[3] = sortedIndexes[sortedValues.indexOf(pairs[1]) + 1];
      remainingValues = this.noDupeOrder(
        this.removeFromList(
          this.removeFromList(values, pairs[0]),
          pairs[1]
        )
      );
      winningCards[4] = -1;
      winningCards[5] = pairs[0];
      winningCards[6] = pairs[1];
      winningCards[7] = remainingValues[remainingValues.length - 1];
    } else if (pairCount > 0) {
      combination = CardCombinationPowersID.PAIR;
      winningCards[0] = sortedIndexes[sortedValues.indexOf(pairs[0])];
      winningCards[1] = sortedIndexes[sortedValues.indexOf(pairs[0]) + 1];
      remainingValues = this.noDupeOrder(this.removeFromList(values, pairs[0]));
      winningCards[2] = -1;
      winningCards[3] = -1;
      winningCards[4] = -1;
      winningCards[5] = pairs[0];
      winningCards[6] = remainingValues[remainingValues.length - 1];
      winningCards[7] = remainingValues[remainingValues.length - 2];
      winningCards[8] = remainingValues[remainingValues.length - 3];
      winningCards[9] = remainingValues[remainingValues.length - 4];
    } else {
      winningCards[0] = sortedIndexes[sortedValues.length - 1];
      winningCards[1] = -1;
      winningCards[2] = -1;
      winningCards[3] = -1;
      winningCards[4] = -1;
      winningCards[5] = sortedValues[sortedValues.length - 1];
      winningCards[6] = sortedValues[sortedValues.length - 2];
      winningCards[7] = sortedValues[sortedValues.length - 3];
      winningCards[8] = sortedValues[sortedValues.length - 4];
      winningCards[9] = sortedValues[sortedValues.length - 5];
    }

    return [combination, winningCards];
  }
}

export default CardCombinationUtil;