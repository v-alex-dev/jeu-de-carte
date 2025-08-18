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
  }

  /**
   * Generates 5 unique random cards between 1 and 10 for the player.
   * Cards are sorted in ascending order.
   * @returns {number[]} - Array of 5 unique card values sorted in ascending order
   */
  // Génère 5 cartes aléatoires différentes entre 1 et 10
  generatePlayerCards() {
    const cards = [];
    while (cards.length < 5) {
      const randomCard = Math.floor(Math.random() * 10) + 1;
      if (!cards.includes(randomCard)) {
        cards.push(randomCard);
      }
    }
    // Tri croissant
    this.playerCards = cards.sort((a, b) => a - b);
    return this.playerCards;
  }

  /**
   * Generates a new computer card that hasn't been used yet.
   * @returns {number|null} - The generated card value (1-10) or null if no cards are available
   */
  // Génère une carte pour l'ordinateur (différente des cartes déjà utilisées)
  generateComputerCard() {
    const availableCards = [];
    for (let i = 1; i <= 10; i++) {
      if (!this.computerUsedCards.includes(i)) {
        availableCards.push(i);
      }
    }

    if (availableCards.length === 0) {
      return null; // Plus de cartes disponibles
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    this.currentComputerCard = availableCards[randomIndex];
    this.computerUsedCards.push(this.currentComputerCard);

    return this.currentComputerCard;
  }

  /**
   * Checks if the player has the selected card and if it matches the current computer card.
   * @param {number} selectedCard - The card value selected by the player
   * @returns {boolean} - True if the player has the card and it matches the computer card
   */
  // Vérifie si le joueur a la carte
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
  // Gère le clic sur une carte du joueur
  handleCardClick(selectedCard) {
    if (!this.isGameRunning) return false;

    if (this.checkPlayerCard(selectedCard)) {
      // Bonne réponse
      this.score++;
      this.removePlayerCard(selectedCard);
      return { correct: true, message: "Bonne réponse!" };
    } else {
      // Mauvaise réponse
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
      // Bonne réponse
      this.score++;
      this.removePlayerCard(selectedCard);
      return { correct: true, message: "Bonne réponse!" };
    } else {
      // Mauvaise réponse
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
  // Supprime une carte du jeu du joueur
  removePlayerCard(card) {
    this.playerCards = this.playerCards.filter((c) => c !== card);
  }

  /**
   * Checks if the game should end based on win/lose conditions.
   * @returns {Object} - Game status object with 'ended', 'win', and 'message' properties
   */
  // Vérifie les conditions de fin de jeu
  checkGameEnd() {
    // Victoire : toutes les cartes du joueur trouvées
    if (this.playerCards.length === 0) {
      return {
        ended: true,
        win: true,
        message: "Félicitations! Vous avez gagné!",
      };
    }

    // Défaite : temps écoulé
    if (this.timeLeft <= 0) {
      return {
        ended: true,
        win: false,
        message: "Temps écoulé! Vous avez perdu.",
      };
    }

    // Défaite : ordinateur a utilisé toutes les cartes
    if (this.computerUsedCards.length === 10) {
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
  // Démarre le timer
  startTimer(onTimerUpdate, onGameEnd) {
    this.isGameRunning = true;
    this.gameTimer = setInterval(() => {
      this.timeLeft--;
      onTimerUpdate(this.timeLeft);

      const gameStatus = this.checkGameEnd();
      if (gameStatus.ended) {
        this.stopTimer();
        onGameEnd(gameStatus);
      }
    }, 1000);
  }

  /**
   * Stops the game timer and marks the game as not running.
   */
  // Arrête le timer
  stopTimer() {
    this.isGameRunning = false;
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
  }

  /**
   * Resets the game to its initial state.
   * Stops the timer and clears all game data.
   */
  // Remet le jeu à zéro
  resetGame() {
    this.stopTimer();
    this.playerCards = [];
    this.computerUsedCards = [];
    this.currentComputerCard = null;
    this.score = 0;
    this.timeLeft = 30;
    this.isGameRunning = false;
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
}
