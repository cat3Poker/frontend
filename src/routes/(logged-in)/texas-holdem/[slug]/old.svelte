<script>
    // import {
    //   Application,
    //   Assets,
    //   Container,
    //   Text,
    //   Sprite,
    //   Graphics,
    // } from "pixi.js";
    // //   import evaluate from "poker-evaluator";
    // // import Deck from "./Deck";
    // // import Player from "./Player";
    // import { gsap } from "gsap";
  
    // import Gameview from "$lib/components/texas-holdem/gameview.svelte";
  
    // let app; // PIXI application
    // let assetsLoaded = false;
    // const banner1 = new URL("$lib/images/banner1.png", import.meta.url).href;
  
    // // Define the base path for your assets
    
    // let deck;
    // let newHandButton;
    // let gameState = "preflop"; // Initial game state
    // let pot = 0;
    // let currentBet = 0;
    // let activePlayerIndex = 0; // Index of the player whose turn it is
    // let players = [];
    // let cardBackTexture;
    // let communityCards = [];
    // let communityCardContainer;
    // let raiseAmount = 10;
    // let smallBlind = 10;
    // let bigBlind = 20;
    // let minRaise = bigBlind; // Minimum raise amount
  
    // // Initialize UI elements
    // let potText;
  
    // let foldButton, callButton, raiseButton, allInButton;
    // let winnerText; // To hold the winner announcement text
  
    // let raiseInput, raiseInputText;
  
    // // Betting logic and player turns
    // const nextPlayerTurn = () => {
    //   activePlayerIndex = (activePlayerIndex + 1) % players.length;
    //   // Skip folded players
    //   while (players[activePlayerIndex].folded) {
    //     activePlayerIndex = (activePlayerIndex + 1) % players.length;
    //   }
    //   // ... any additional logic for end of round, etc.
    // };
  
    // // Update UI to show whose turn it is (example)
    // const highlightActivePlayer = () => {
    //   players.forEach((player, index) => {
    //     if (index === activePlayerIndex) {
    //       player.ui.container.alpha = 1; // Or some visual indication
    //     } else {
    //       player.ui.container.alpha = 0.5; // Or reset to normal
    //     }
    //   });
    // };
  
    // const loadAssets = async (parent) => {
    //   app = new Application(); // Example size and color
    //   await app.init({
    //     width: 800,
    //     height: 600,
    //     backgroundColor: 0x000,
    //     resizeTo: parent,
    //   });
  
    //   parent.appendChild(app.canvas);
    //   // Create an array of asset objects with their paths
      
      
    // };
    // let startGameClicked = false;
    // let gameContainer;
  
    // $: if (gameContainer) {
    //   // loadAssets(gameContainer);
    // }
    // $: if (assetsLoaded) {
    //   // Create a sprite for the background
    //   const backgroundSprite = new Sprite(Assets.get("Backing_Landscape"));
  
    //   // Set the sprite to cover the entire background
    //   backgroundSprite.width = app.screen.width;
    //   backgroundSprite.height = app.screen.height;
    //   backgroundSprite.x = 0; // Position at the top-left corner
    //   backgroundSprite.y = 0;
  
    //   // Add the background sprite to the stage
    //   app.stage.addChild(backgroundSprite);
  
    //   // deck = new Deck();
    //   // deck.shuffle();
    //   // deck.createCardSprites(app); // Create the sprites
    //   cardBackTexture = Assets.get("MobileCards_Back"); // Store cardback texture
    //   // ... other game setup
  
    //   // players = [
    //   //   new Player("David", 2000),
    //   //   new Player("Maria", 2000),
    //   //   new Player("Samuel", 2000),
    //   //   new Player("Emma", 2000),
    //   //   new Player("Gabriel", 2000),
    //   //   new Player("Isabela", 2000),
    //   // ];
    //   // Start game logic after initializing players and the deck
  
    //   // Set up UI elements
    //   communityCardContainer = new Container();
    //   communityCardContainer.x = app.screen.width / 2; // Position centered, adjust Y as needed
    //   communityCardContainer.y = app.screen.height / 2 - 50;
    //   communityCardContainer.pivot.x = communityCardContainer.width / 2;
  
    //   // Pot display
    //   potText = new Text({
    //     text: `Pot: ${pot}`,
    //     style: {
    //       fontFamily: "Arial",
    //       fontSize: 16,
    //       fill: 0xffffff,
    //     },
    //   });
    //   potText.x = app.screen.width / 2;
    //   potText.y = app.screen.height / 2 + 100; // Adjust Y as needed
  
    //   potText.anchor.set(0.5, 0.5); // Center the text
  
    //   app.stage.addChild(potText);
  
    //   startGame();
  
    //   // Buttons
    //   foldButton = createButton("Fold", () => handleFold());
    //   callButton = createButton("Call", () => handleCall());
  
    //   raiseButton = createButton("Raise", () => handleRaise());
    //   allInButton = createButton("All-in", () => handleAllIn());
  
    //   // Positioning buttons
    //   foldButton.position.set(100, 500); // Example positions
    //   callButton.position.set(200, 500);
    //   raiseButton.position.set(300, 500);
  
    //   allInButton.position.set(400, 500);
  
    //   // Raise amount display
    //   raiseInputText = new Text({
    //     text: `Raise: ${raiseAmount}`,
    //     style: {
    //       fontFamily: "Arial",
    //       fontSize: 14,
    //       fill: 0xffffff,
    //     },
    //   });
    //   raiseInputText.x = 300; // Adjust position as needed
  
    //   raiseInputText.y = 550;
  
    //   app.stage.addChild(raiseInputText);
    //   // Raise increment/decrement buttons
    //   const raisePlusButton = createButton("+", () => {
    //     raiseAmount += 10;
    //     raiseInputText.text = `Raise: ${raiseAmount}`;
    //   });
    //   const raiseMinusButton = createButton("-", () => {
    //     raiseAmount = Math.max(10, raiseAmount - 10);
    //     raiseInputText.text = `Raise: ${raiseAmount}`;
    //   }); // Prevent going below 10
  
    //   raisePlusButton.position.set(380, 550);
    //   raiseMinusButton.position.set(250, 550);
  
    //   newHandButton = createButton("New Hand", () => resetGame());
  
    //   newHandButton.position.set(500, 500);
  
    //   winnerText = new Text({
    //     text: "",
    //     style: { fontFamily: "Arial", fontSize: 20, fill: 0xff0000 },
    //   });
    //   winnerText.x = app.screen.width / 2;
    //   winnerText.y = app.screen.height / 2 - 100; // Adjust as needed
    //   winnerText.anchor.set(0.5); // Center the text
    //   app.stage.addChild(winnerText);
    // }
  
    // // Side pot handling
    // const handleBets = () => {
    //   // Sort players by bet amount (ascending)
  
    //   players.sort((a, b) => a.currentBet - b.currentBet);
  
    //   let sidePots = [];
    //   let currentPot = 0;
  
    //   for (let i = 0; i < players.length; i++) {
    //     if (players[i].currentBet > 0) {
    //       const amountToSidePot =
    //         i > 0
    //           ? Math.min(
    //               players[i].currentBet - players[i - 1].currentBet,
    //               players[i].chips,
    //             ) // Take minimum to prevent issues where the player has less than another player's bet
    //           : Math.min(players[i].currentBet, players[i].chips);
  
    //       let eligiblePlayers = players.filter(
    //         (player, index) => index >= i && !player.folded,
    //       );
  
    //       // Update the current pot being built
    //       currentPot += amountToSidePot * eligiblePlayers.length;
  
    //       // Create a side pot if necessary
  
    //       if (
    //         (sidePots.length > 0 &&
    //           players[i].currentBet > players[i - 1].currentBet) ||
    //         i == 0
    //       ) {
    //         sidePots.push({
    //           amount: currentPot,
    //           eligiblePlayers: [...eligiblePlayers],
    //         }); // Create new side pot
    //         currentPot = 0; // Reset for next side pot
    //       }
    //     }
    //   }
  
    //   if (currentPot > 0) {
    //     let eligiblePlayers = players.filter((player) => !player.folded);
    //     sidePots.push({
    //       amount: currentPot,
    //       eligiblePlayers: [...eligiblePlayers],
    //     });
    //   }
  
    //   return sidePots;
    // };
  
    // // Game Reset
    // const resetGame = () => {
    //   gameStarted = false;
  
    //   //Reset winner text
  
    //   winnerText.text = "";
    //   // Clear community cards
    //   communityCards = [];
    //   communityCardContainer.removeChildren();
  
    //   // Clear player hands & reset folded status
    //   players.forEach((player) => {
    //     player.hand = [];
    //     player.resetFold();
    //     player.ui.cardContainer.removeChildren();
    //   });
  
    //   // Reset pot, bets, game state
    //   pot = 0;
    //   currentBet = 0;
    //   gameState = "preflop";
    //   activePlayerIndex = 0;
  
    //   updateUI();
  
    //   // Create and shuffle a new deck (important!)
  
    //   deck = new Deck(); // Create a new deck instance
    //   deck.shuffle();
    //   dealCards(); // Deal new cards
    // };
    // const createButton = (text, callback) => {
    //   const button = new Graphics()
    //     .rect(0, 0, 80, 30) // Example dimensions
    //     .fill(0x00ff00);
  
    //   const buttonText = new Text({
    //     text,
    //     style: {
    //       fontFamily: "Arial",
    //       fontSize: 14,
    //       fill: 0x000000,
    //     },
    //   });
    //   buttonText.anchor.set(0.5);
    //   buttonText.x = button.width / 2;
  
    //   buttonText.y = button.height / 2;
    //   button.addChild(buttonText);
  
    //   button.interactive = true; // Make clickable
    //   button.buttonMode = true;
    //   button.on("pointerdown", callback);
  
    //   app.stage.addChild(button);
  
    //   return button;
    // };
  
    // // Update startNextRound to handle blinds
    // const startNextRound = () => {
    //   currentBet = 0;
    //   players.forEach((player) => player.resetBet());
  
    //   if (gameState === "preflop") {
    //     // Blinds (adjust logic as needed for different blind structures)
    //     const sbIndex = activePlayerIndex; //small blind index
    //     const bbIndex = (activePlayerIndex + 1) % players.length; // big blind index
  
    //     players[sbIndex].bet(Math.min(smallBlind, players[sbIndex].chips)); // Post small blind (cannot exceed player's chips)
    //     players[bbIndex].bet(Math.min(bigBlind, players[bbIndex].chips)); //Post Big Blind
  
    //     // Set current bet to the big blind
    //     currentBet = bigBlind;
  
    //     // Advance the active player index to the player after the big blind
  
    //     activePlayerIndex = (bbIndex + 1) % players.length;
  
    //     while (players[activePlayerIndex].folded) {
    //       activePlayerIndex = (activePlayerIndex + 1) % players.length;
    //     }
    //   }
  
    //   updateUI();
    //   // Deal community cards if needed (flop, turn, river)
    //   if (["flop", "turn", "river"].includes(gameState)) {
    //     dealCommunityCards();
    //   }
    // };
  
    // const handleFold = () => {
    //   // ... Fold logic, update UI
    //   players[activePlayerIndex].fold();
  
    //   // Update UI, advance to next player, check round end, etc.
  
    //   updateUI(); // Update chip counts and highlight active player
    //   nextPlayerTurn();
    //   checkRoundEnd();
    // };
  
    // const handleCall = () => {
    //   // Call logic (match current bet), update UI, advance turn
    //   players[activePlayerIndex].bet(currentBet);
    //   pot += currentBet;
  
    //   updateUI();
    //   nextPlayerTurn();
    //   checkRoundEnd();
    // };
  
    // // Betting Limits in handleRaise
    // const handleRaise = () => {
    //   if (
    //     raiseAmount >= currentBet + minRaise &&
    //     raiseAmount <= players[activePlayerIndex].chips
    //   ) {
    //     players[activePlayerIndex].bet(raiseAmount);
    //     currentBet = raiseAmount;
    //     pot += raiseAmount;
    //     updateUI();
    //     nextPlayerTurn();
    //     checkRoundEnd();
    //   } else if (
    //     raiseAmount > players[activePlayerIndex].chips &&
    //     players[activePlayerIndex].chips > currentBet
    //   ) {
    //     handleAllIn(); // Go all in if raise amount is more than player has
    //   }
    // };
  
    // const handleAllIn = () => {
    //   // ... All-in logic (bet all chips), update UI, advance turn
    //   const allInAmount = players[activePlayerIndex].chips;
  
    //   players[activePlayerIndex].bet(allInAmount);
  
    //   currentBet = Math.max(currentBet, allInAmount); // Update currentBet if necessary
    //   pot += allInAmount;
  
    //   updateUI();
    //   nextPlayerTurn();
    //   checkRoundEnd();
    // };
    // const checkRoundEnd = () => {
    //   // Find all players who haven't folded and aren't all-in
    //   const activePlayers = players.filter((p) => !p.folded && p.chips > 0);
  
    //   const allPlayersCalledOrFolded = players.every(
    //     (player) =>
    //       player.folded || player.currentBet === currentBet || player.chips === 0,
    //   );
  
    //   if (allPlayersCalledOrFolded) {
    //     advanceGameStage();
    //   }
    // };
  
    // const advanceGameStage = () => {
    //   if (!deck) return;
    //   switch (gameState) {
    //     case "preflop":
    //       gameState = "flop";
  
    //       startNextRound(); // Betting round before flop
    //       break;
    //     case "flop":
    //       gameState = "turn";
    //       startNextRound();
    //       break;
  
    //     case "turn":
    //       gameState = "river";
  
    //       startNextRound();
  
    //       break;
    //     case "river":
    //       gameState = "showdown";
    //       const winners = determineWinner();
    //       // distributePot(winners);
    //       distributePots(winners);
  
    //       // Display winner(s) in the UI
    //       const winnerNames = winners.map((w) => w.name).join(", ");
    //       winnerText.text = `Winner(s): ${winnerNames}`;
  
    //       updateUI(); // Update the UI to show final chip counts
  
    //       // Show "New Hand" button
    //       newHandButton.visible = true;
    //       break;
    //     default:
    //       break;
    //   }
    // };
  
    // const createPlayerUI = (player, index) => {
    //   const playerContainer = new Container();
    //   player.ui.container = playerContainer;
  
    //   // Player's name
    //   const nameText = new Text({
    //     text: player.name,
    //     style: {
    //       fontFamily: "Arial",
    //       fontSize: 14,
    //       fill: 0xffffff,
    //     },
    //   });
    //   player.ui.name = nameText;
  
    //   nameText.x = 0; // Position relative to the container
    //   nameText.y = 0;
  
    //   // Player's chip count display
    //   const chipsText = new Text({
    //     text: `${player.chips}`,
    //     style: {
    //       fontFamily: "Arial",
    //       fontSize: 14,
    //       fill: 0xffff00,
    //     },
    //   });
    //   player.ui.chips = chipsText;
    //   chipsText.x = 0;
    //   chipsText.y = 20; // Position below name
  
    //   // Add elements to the player's container
    //   playerContainer.addChild(nameText, chipsText);
  
    //   // Store players in circular form in the canvas
    //   const angle = (index * 2 * Math.PI) / players.length; // Calculate the angle
    //   const radius = 200; // Adjust radius as needed
    //   playerContainer.x = app.screen.width / 2 + radius * Math.cos(angle);
    //   playerContainer.y = app.screen.height / 2 + radius * Math.sin(angle);
  
    //   app.stage.addChild(playerContainer);
  
    //   // Add card display area (empty initially)
    //   player.ui.cardContainer = new Container();
    //   player.ui.cardContainer.x = 0; // Position relative to playerContainer
    //   player.ui.cardContainer.y = 40; // Below name and chips
    //   playerContainer.addChild(player.ui.cardContainer);
    // };
  
    // // update UI based on game state
  
    // const updateUI = () => {
    //   players.forEach((player, index) => {
    //     // Update player UI elements here (chip count, bet, etc.)
    //     // Update chip count
    //     if (player.ui?.chips?.text) player.ui.chips.text = `${player.chips}`;
  
    //     // ... Update other UI elements as needed
    //   });
  
    //   potText.text = `Pot: ${pot}`; // Update pot display
  
    //   highlightActivePlayer();
    // };
  
    // const dealCards = () => {
    //   players.forEach((player) => {
    //     const cards = deck.deal(2);
    //     player.addCards(cards);
  
    //     cards.forEach((card, index) => {
    //       // The key change is here: Use player.cardSprites to store sprites
    //       player.cardSprites[index] = card.createSprite(cardBackTexture);
    //       let cardSprite = player.cardSprites[index];
  
    //       cardSprite.x = 20 * index;
    //       cardSprite.y = 0;
    //       cardSprite.anchor.set(0.5);
    //       cardSprite.scale.set(0.5);
    //       // Ensure cardContainer exists and add the sprite
    //       if (!player.ui.cardContainer) {
    //         player.ui.cardContainer = new Container();
    //         player.ui.container.addChild(player.ui.cardContainer); // Add to player's UI container
    //       }
    //       player.ui.cardContainer.addChild(cardSprite);
    //     });
  
    //     //   cards.forEach((card, index) => {
    //     //     const cardSprite = card.createSprite(
    //     //       cardBackTexture, // Use cardBack initially
    //     //     );
    //     //     // cardSprite.anchor.set(0.5);
    //     //     // cardSprite.scale.set(0.5);
    //     //     cardSprite.x = 20 * index; // Spread the cards out
    //     //     cardSprite.y = 0;
    //     //     player.ui.cardContainer.addChild(cardSprite);
    //     //   });
    //   });
  
    //   updateUI();
    //   startNextRound(); // Start the first betting round (preflop)
    // };
  
    // //   const dealCards = () => {
    // //     players.forEach((player, playerIndex) => {
    // //       const cards = deck.deal(2);
  
    // //       player.addCards(cards);
  
    // //       cards.forEach((card, cardIndex) => {
    // //         const cardSprite = card.createSprite(cardBackTexture);
  
    // //         cardSprite.anchor.set(0.5); //Center anchor for rotation
  
    // //         cardSprite.x = 20 * cardIndex;
    // //         cardSprite.y = 0;
    // //         player.ui.cardContainer.addChild(cardSprite);
  
    // //         // Animation: Deal cards from the deck to the players
    // //         // Calculate the player position for angle calculations
  
    // //         const angle = (playerIndex * 2 * Math.PI) / players.length;
  
    // //         //Set initial position
  
    // //         cardSprite.x = app.screen.width / 2;
    // //         cardSprite.y = app.screen.height / 2;
  
    // //         gsap.to(cardSprite, {
    // //           duration: 0.5, // Animation duration
  
    // //           delay: (playerIndex * 2 + cardIndex) * 0.1, // Stagger the deal
    // //           x: 20 * cardIndex + player.ui.cardContainer.x + player.ui.container.x,
    // //           y: player.ui.cardContainer.y + player.ui.container.y,
  
    // //           rotation: angle, // Set the rotation to face the player
    // //           ease: "power1.out", // Easing function (adjust as desired)
    // //         });
    // //       });
    // //     });
  
    // //     updateUI();
    // //     setTimeout(startNextRound, 1500); // Start the first betting round (preflop)
    // //   };
  
    // const dealCommunityCards = () => {
    //   const numCards = gameState === "flop" ? 3 : 1;
    //   const cards = deck.deal(numCards);
    //   communityCards = communityCards.concat(cards);
  
    //   // Add community cards to the stage with a delay between each card
    //   cards.forEach((card, i) => {
    //     setTimeout(() => {
    //       let cardTexture = Assets.get(card.getName());
    //       const cardSprite = new Sprite(cardTexture);
    //       // cardSprite.scale.set(0.5); // Scale community cards
    //       cardSprite.x = i * (cardSprite.width + 10) + 20;
    //       cardSprite.y = 0;
    //       communityCardContainer.addChild(cardSprite);
    //     }, i * 500); // 500ms delay between each card
    //   });
  
    //   // Reveal player hands once the river is dealt
    //   if (gameState == "river") {
    //     revealPlayerHands();
    //   }
  
    //   updateUI();
    // };
  
    // const revealPlayerHands = () => {
    //   players.forEach((player) => {
    //     player.hand.forEach((card, i) => {
    //       // Access the stored sprite directly
    //       let cardSprite = player.cardSprites[i];
    //       let cardTexture = Assets.get(card.getName());
    //       if (cardSprite && cardTexture) {
    //         cardSprite.texture = cardTexture;
    //       } else {
    //         console.error("Error: Could not find card sprite or texture.");
    //       }
    //     });
    //   });
    //   // players.forEach((player) => {
    //   //   player.hand.forEach((card, i) => {
    //   //     const texture =
    //   //       app.loader.resources[`card_${card.rank}${card.suit}`].texture;
    //   //     player.ui.cardContainer.children[i].texture = texture;
    //   //   });
    //   // });
    // };
  
    // let gameStarted = false;
    // const startGame = () => {
    //   if (!gameStarted) {
    //     gameStarted = true;
  
    //     if (!deck) {
    //       //Check to prevent shuffling an uninitialized deck
    //       deck = new Deck();
    //       deck.shuffle();
    //       deck.createCardSprites(app);
    //     }
    //     if (!players.length) {
          
    //     }
    //     players = [
    //         new Player("David", 2000),
    //         new Player("Maria", 2000),
    //         new Player("Samuel", 2000),
    //         new Player("Emma", 2000),
    //         new Player("Gabriel", 2000),
    //         new Player("Isabela", 2000),
    //       ];
  
    //       players.forEach((player, index) => createPlayerUI(player, index));
  
    //     dealCards();
    //   }
    // };
  
    // const determineWinner = () => {
    //   const showdownPlayers = players.filter((player) => !player.folded);
  
    //   const handValues = showdownPlayers.map((player) => {
    //     // Convert cards to the format poker-evaluator expects (e.g., 'As', 'Kd', '2h')
    //     const evalHand = player.hand
    //       .concat(communityCards)
    //       .map((card) => `${card.rank}${card.suit.toLowerCase()}`);
    //     const handRank = evaluateHand(evalHand); //evaluate.evalHand(evalHand);
  
    //     return { player, handRank };
    //   });
  
    //   handValues.sort((a, b) => b.handRank.value - a.handRank.value); // Sort by hand value
  
    //   const winners = [];
  
    //   winners.push(handValues[0].player);
    //   for (let i = 1; i < handValues.length; i++) {
    //     if (handValues[i].handRank.value === handValues[0].handRank.value) {
    //       winners.push(handValues[i].player);
    //     } else {
    //       break;
    //     }
    //   }
  
    //   return winners;
    // };
  
    // const distributePots = (winners) => {
    //   const sidePots = handleBets();
  
    //   sidePots.forEach((sidePot) => {
    //     // Find eligible winners
  
    //     const eligibleWinners = winners.filter((winner) =>
    //       sidePot.eligiblePlayers.includes(winner),
    //     );
    //     if (eligibleWinners.length > 0) {
    //       const splitPot = sidePot.amount / eligibleWinners.length;
    //       eligibleWinners.forEach((winner) => (winner.chips += splitPot));
    //     }
    //   });
  
    //   pot = 0;
    //   updateUI();
    // };
  
    // const distributePot = (winners) => {
    //   const splitPot = pot / winners.length;
    //   winners.forEach((winner) => (winner.chips += splitPot));
    //   pot = 0; // Reset pot
    // };
  
    // // Placeholder hand evaluator (replace with a proper library)
    // const evaluateHand = (hand) => {
    //   // This is just a placeholder, it doesn't evaluate hands correctly!
    //   // Replace with a real hand evaluator
    //   return { value: Math.random() }; // Just a random value for now
    // };
    import { pokerGames } from "$lib/store/poker";
    import {app} from "$lib/store/activities.js";
    export let data
    $: isMusic = true
    $: isCopy = false
    $: joiningGame = data?.slug
    $: availableGames = $pokerGames.reverse().slice(0, 5);
    $: isQuit = false
    let link = "https://cat3poker.netlify.app/texas-holdem/kagx13s5cds"
  
  </script> 
  
  <div class="sc-lhMiDA ePAxUv" style="opacity: 1; transform: none;">
    <div id="game-crash" class="sc-haTkiu lmWKWf game-style1 sc-cBIieI ikZPEu">  
        <div class="game-area">
            <div class="game-main">
              <div class="game-view">
                <!-- <div class="sc-hoHwyw fIoiVG game-recent sc-bjztik kQtbd">
                  <div class="recent-list-wrap">
                    <div class="recent-list" style="width: 133.333%; transform: translate(0%, 0px);">
                      <div class="game-item " style="width: 100%;">
                        <div class="issus">Share: {link}</div>
                        <svg on:click={()=> $app.copyToClipboard(link)} xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                          <use xlink:href="#icon_Copy"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button class="sc-iLOkMM kCvsnZ flex-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    <div>
                      Exit
                    </div>
                  </button>
                </div> -->
                <div class="sc-hcupDf dqwCNK game-box sc-eZKLwX gcZuwC">
                  <div class="sc-eTwdGJ dgiRGq">
                    <!-- <canvas class="" width="1034" height="514"></canvas> -->
                     <div style="width:1034px; height:534px;">
                      <!-- <Gameview gameId={joiningGame} on:onExit={() => {
                        joiningGame = '';
                      }} /> -->
                      
                     </div>
                
                  </div>
                  <svg class="box-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 996 46">
                    <defs>
                      <linearGradient id="gcardBg" x1="50%" x2="50%" y1="0%" y2="100%">
                        <stop offset="0%" stop-color="#31343C"></stop>
                        <stop offset="100%" stop-color="#1E2024" stop-opacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <g opacity=".899">
                      <path fill="url(#gcardBg)" fill-rule="evenodd" d="M0 0h996L892 46H96z" opacity=".598" transform="rotate(-180 498 23)"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="game-actions">
                <button on:click={()=> isMusic =! isMusic} class="action-item  {isMusic ?"active" : ""}">
                  <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                    <use xlink:href="#{isMusic ? "icon_MusicOn" : "icon_MusicOff"}"></use>
                  </svg>
                </button>
                <button on:click={()=> isCopy = true} class="action-item  ">
                  <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                    <use xlink:href="#icon_LiveStats"></use>
                  </svg>
                </button>
                <button on:click={()=> isQuit = true} class="action-item  ">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                </button>
              </div>
            </div>
        </div>
    </div>
  </div>
  
  {#if isQuit}
    <div class="sc-bkkeKt kBjSXI" style="opacity: 1;">
      <div class="sc-dlVxhl gvBCkE" style="transform: scale(1); opacity: 1;">
        <button on:click={()=> isQuit = false} class="sc-ieecCq fLASqZ close-icon dialog-close"><svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon"><use xlink:href="#icon_Close"></use></svg></button>
        <div class="pop sc-eBhrFy kAPbrV" id="">
          <div class="pop-title">Do you want quit?</div>
            <button class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal submit-btn">
              <div class="button-inner">Yes</div>
            </button>
          </div>
        </div>
      </div>
  {/if}
  
  <style>
  .gvBCkE {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 0px;
      height: 0px;
  }
  .fLASqZ {
      position: absolute;
      right: -200px;
      top: -190px;
  }
  .lmWKWf .action-item.active .icon {
      fill: rgb(67, 179, 9);
  }
  .fLASqZ:hover svg {
      transform: rotate(-90deg);
      fill: rgb(245, 246, 247);
  }
  .gvBCkE .pop {
      border-radius: 1.25rem;
      position: relative;
      overflow: hidden;
      background-color: rgb(23, 24, 27);
      font-size: 0.8125rem;
      padding: 1.25rem;
  }
  .gvBCkE .pop-title {
      color: rgb(255, 255, 255);
      font-size: 1rem;
      line-height: 1rem;
      font-weight: bold;
      text-align: center;
      padding-bottom: 70px;
      padding-top: 70px;
  }
  .gvBCkE .pop {
      transform: translate(-50%, -50%);
      min-width: 420px;
      min-height: 370px;
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 1.25rem;
      position: relative;
      overflow: hidden;
      background-color: rgb(23, 24, 27);
      font-size: 0.8125rem;
      padding: 1.25rem;
  }
  .kAPbrV .submit-btn {
      margin: 1.875rem auto 0.625rem;
      width: 13.75rem;
  }
  .lmWKWf .game-actions {
      display: flex;
      order: 10;
      -webkit-box-align: center;
      align-items: center;
      height: 4rem;
      position: relative;
  }
  .lmWKWf .action-item:hover {
      background: rgba(49, 52, 60, 0.35);
  }
  .lmWKWf .action-item:hover .icon {
      font-size: 1rem;
      fill: rgb(245, 246, 247);
  }
  .lmWKWf .game-actions::before {
      content: "";
      flex: 1 1 0%;
  }
  .lmWKWf .action-item {
      cursor: pointer;
      margin-right: 0.5rem;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
  }
  .lmWKWf .action-item .icon {
      fill: rgb(153, 164, 176);
      transition: 0.3s ease-in-out;
  }
   .lmWKWf.game-style1 {
      max-width: 1468px;
      margin: 0px auto;
      padding: 0 0 20% 0;
  }
  .lmWKWf {
      min-height: 50vh;
  }
   .lmWKWf.game-style1 .game-area {
      display: flex;
      flex-wrap: wrap;
  } .lmWKWf.game-style1 .game-area {
      display: flex;
      flex-wrap: wrap;
  }
  .ikZPEu .game-main.game-main {
      min-height: auto;
  }
   .lmWKWf.game-style1 .game-main  {
      display: flex;
      flex-direction: column;
      flex: 1 1 0%;
      overflow: hidden;
  }
  .ikZPEu .game-main.game-main {
      min-height: auto;
  }
  .lmWKWf .game-main {
      position: relative;
      border-radius: 1.25rem;
      background-color: rgb(23, 24, 27);
  }
   .lmWKWf.game-style1 .game-view {
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
  }
  
  .gcZuwC {
      position: relative;
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      padding: 0px 1.075rem 1.075rem;
  }
  .dgiRGq {
      position: relative;
      margin-top: 1.075rem;
      margin-bottom: 1.25rem;
  }
  .dgiRGq::after {
      content: "";
      display: block;
      padding-top: 0.1%;
  }
  
  </style>