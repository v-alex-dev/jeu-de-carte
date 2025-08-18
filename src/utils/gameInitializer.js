import { displayPlayerCards } from "./displayedPlayerCard.js";
import { displayComputerCard } from "./displayComputerCard.js";
import { updateDisplay } from "./displayUpdater.js";

/**
 * Initializes the game by setting up player and computer cards,
 * starting the timer, and setting up event listeners.
 * @param {GameService} gameService - The service managing the game state.
 * @param {function} endGameCallback - The callback function to call when the game ends
 *
 */
const initializeGame = (gameService, endGameCallback) => {
  // Générer les cartes du joueur
  gameService.generatePlayerCards();
  displayPlayerCards(gameService);

  // Générer la première carte de l'ordinateur
  gameService.generateComputerCard();
  displayComputerCard(gameService);

  // Démarrer le timer
  gameService.startTimer(
    (timeLeft) => updateDisplay(gameService),
    (gameStatus) => endGameCallback(gameStatus)
  );

  updateDisplay(gameService);
};

export { initializeGame };
