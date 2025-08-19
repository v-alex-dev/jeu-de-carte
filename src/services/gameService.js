/**
 * Service class that manages the game state, logic, and interactions.
 * Handles player cards, computer cards, scoring, timing, and game flow.
 */
export class GameService {
  /**
   * Creates a new GameService instance and initializes the game state.
   */
  constructor() {
    this.playerCards = [];
    this.computerUsedCards = [];
    this.currentComputerCard = null;
    this.score = 0;
    this.timeLeft = 30;
    this.gameTimer = null;
    this.isGameRunning = false;
    this.level = 1;
  }

  /**
   * Generates 5 unique random cards between 1 and 10 for the player.
   * Cards are sorted in ascending order.
   * @returns {number[]} - Array of 5 unique card values sorted in ascending order
   */
  generatePlayerCards() {
    const cards = [];
    while (cards.length < 5) {
      const randomCard = Math.floor(Math.random() * 10) + 1;
      if (!cards.includes(randomCard)) {
        cards.push(randomCard);
      }
    }
    // For level 1 sort the cards in ascending order
    if (this.level === 1) {
      this.playerCards = cards.sort((a, b) => a - b);
    } else {
      // For level 2+, keep the cards in random order
      this.playerCards = cards;
    }

    return this.playerCards;
  }

  /**
   * Generates a new computer card that hasn't been used yet.
   * @returns {number|null} - The generated card value (1-10) or null if no cards are available
   */
  // Generates a card for the computer (different from the cards already used)
  generateComputerCard() {
    const availableCards = [];
    for (let i = 1; i <= 10; i++) {
      if (!this.computerUsedCards.includes(i)) {
        availableCards.push(i);
      }
    }

    console.log(
      `Cartes disponibles: ${availableCards.length}/10`,
      availableCards
    );
    console.log(
      `Cartes utilisées: ${this.computerUsedCards.length}/10`,
      this.computerUsedCards
    );

    if (availableCards.length === 0) {
      console.log("Plus de cartes disponibles pour l'ordinateur!");
      return null; // No more available cards
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    this.currentComputerCard = availableCards[randomIndex];
    this.computerUsedCards.push(this.currentComputerCard);

    console.log(`Nouvelle carte ordinateur: ${this.currentComputerCard}`);
    return this.currentComputerCard;
  }

  /**
   * Checks if the player has the selected card and if it matches the current computer card.
   * @param {number} selectedCard - The card value selected by the player
   * @returns {boolean} - True if the player has the card and it matches the computer card
   */
  // Checks if the player has the card
  checkPlayerCard(selectedCard) {
    return (
      this.playerCards.includes(selectedCard) &&
      selectedCard === this.currentComputerCard
    );
  }

  /**
   * Handles a player's card selection, updates score, and removes matched cards.
   * @param {number} selectedCard - The card value selected by the player
   * @returns {Object} - Result object with 'correct' boolean and 'message' string
   */
  // Handles the click on a player's card
  handleCardClick(selectedCard) {
    if (!this.isGameRunning) return false;

    if (this.checkPlayerCard(selectedCard)) {
      // Correct answer
      this.score++;
      this.removePlayerCard(selectedCard);
      return { correct: true, message: "Bonne réponse!" };
    } else {
      // Bad answer
      if (this.score > 0) {
        this.score--;
      }
      return { correct: false, message: "Mauvaise réponse!" };
    }
  }

  /**
   * Handles a player's card drop on the drop zone (drag and drop functionality).
   * @param {number} selectedCard - The card value dropped by the player
   * @returns {Object} - Result object with 'correct' boolean and 'message' string
   */
  handleCardDrop(selectedCard) {
    if (!this.isGameRunning)
      return { correct: false, message: "Jeu non actif" };

    if (this.checkPlayerCard(selectedCard)) {
      // Correct answer
      this.score++;
      this.removePlayerCard(selectedCard);
      return { correct: true, message: "Bonne réponse!" };
    } else {
      // Bad answer
      if (this.score > 0) {
        this.score--;
      }
      return { correct: false, message: "Mauvaise réponse!" };
    }
  }

  /**
   * Removes a specific card from the player's hand.
   * @param {number} card - The card value to remove from the player's cards
   */
  // Delete a card from the player's hand
  removePlayerCard(card) {
    this.playerCards = this.playerCards.filter((c) => c !== card);
  }

  /**
   * Checks if the game should end based on win/lose conditions.
   * @param {boolean} checkNoMoreCards - Whether to check if computer has no more cards
   * @returns {Object} - Game status object with 'ended', 'win', and 'message' properties
   */
  // Checks the end game conditions
  checkGameEnd(checkNoMoreCards = false) {
    // Victory: all player cards found
    if (this.playerCards.length === 0) {
      if (this.level < 5) {
        // NE PAS incrémenter ici, ça sera fait dans passToNextLevel()
        return {
          ended: false,
          levelUp: true,
          message: `Niveau ${this.level} terminé! Passez au niveau suivant.`,
        };
      } else {
        return {
          ended: true,
          win: true,
          message: "Félicitations! Vous avez gagné le jeu!",
        };
      }
    }

    // Defeat: time runs out
    if (this.timeLeft <= 0) {
      return {
        ended: true,
        win: false,
        message: "Temps écoulé! Vous avez perdu.",
      };
    }

    // Defeat: computer has used all cards AND can't generate more
    // Ne vérifier cette condition que si explicitement demandé
    if (checkNoMoreCards && !this.canGenerateMoreCards()) {
      return {
        ended: true,
        win: false,
        message: "L'ordinateur a utilisé toutes ses cartes! Vous avez perdu.",
      };
    }

    return { ended: false };
  }

  /**
   * Starts the game timer and sets up callback functions for timer updates and game end.
   * @param {function} onTimerUpdate - Callback function called every second with remaining time
   * @param {function} onGameEnd - Callback function called when the game ends
   */
  // Starts the timer
  startTimer(onTimerUpdate, onGameEnd) {
    this.isGameRunning = true;
    this.gameTimer = setInterval(() => {
      this.timeLeft--;
      onTimerUpdate(this.timeLeft);

      const gameStatus = this.checkGameEnd();
      if (gameStatus.ended) {
        this.stopTimer();
        onGameEnd(gameStatus);
      } else if (gameStatus.levelUp) {
        this.stopTimer();
        onGameEnd(gameStatus);
      }
    }, 1000);
  }

  /**
   * Stops the game timer and marks the game as not running.
   */
  // Stops the timer
  stopTimer() {
    this.isGameRunning = false;
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
  }

  passToNextLevel(onTimerUpdate, onGameEnd) {
    // Incrémenter le niveau ICI au bon moment
    this.levelUp();

    // Réinitialiser le timer à 30 secondes
    this.timeLeft = 30;

    // Réinitialiser les cartes utilisées par l'ordinateur
    this.computerUsedCards = [];
    this.currentComputerCard = null;

    // Générer de nouvelles cartes pour le joueur
    this.generatePlayerCards();

    // Redémarrer le timer avec les nouvelles conditions
    this.stopTimer(); // Arrêter l'ancien timer s'il existe
    this.startTimer(onTimerUpdate, onGameEnd);

    return {
      level: this.level,
      score: this.score,
      timeLeft: this.timeLeft,
      message: `Niveau ${this.level} ! Nouvelles cartes générées.`,
    };
  }
  /**
   * Resets the game to its initial state.
   * Stops the timer and clears all game data.
   */
  // Resets the game to its initial state
  resetGame() {
    this.stopTimer();
    this.playerCards = [];
    this.computerUsedCards = [];
    this.currentComputerCard = null;
    this.score = 0;
    this.timeLeft = 30;
    this.isGameRunning = false;
  }

  /**
   * Increments the level by 1.
   */
  levelUp() {
    this.level++;
  }

  // Getters
  /**
   * Gets the current score.
   * @returns {number} - The current score
   */
  getScore() {
    return this.score;
  }

  /**
   * Gets the remaining time in seconds.
   * @returns {number} - The time left in seconds
   */
  getTimeLeft() {
    return this.timeLeft;
  }

  /**
   * Gets a copy of the player's current cards.
   * @returns {number[]} - Array of the player's card values
   */
  getPlayerCards() {
    return [...this.playerCards];
  }

  /**
   * Gets the current computer card value.
   * @returns {number|null} - The current computer card value or null if none
   */
  getCurrentComputerCard() {
    return this.currentComputerCard;
  }

  /**
   * Checks if the game is currently running.
   * @returns {boolean} - True if the game is running, false otherwise
   */
  isRunning() {
    return this.isGameRunning;
  }

  /**
   * Checks if the computer can generate more cards.
   * @returns {boolean} - True if more cards are available, false otherwise
   */
  canGenerateMoreCards() {
    return this.computerUsedCards.length < 10;
  }

  getLevel() {
    return this.level;
  }
}
