import { showMessage } from "./chronometer.js";
import { displayComputerCard } from "./displayComputerCard.js";
import { updateDisplay } from "./displayUpdater.js";
import { setupDragAndDrop } from "./dragAndDrop.js";

/**
 * Sets up event listeners for the pass button and drag and drop functionality.
 * @param {GameService} gameService
 * @param {function} endGameCallback
 *
 */
const setupEventListeners = (gameService, endGameCallback) => {
  // Set up drag and drop functionality instead of click events
  setupDragAndDrop(gameService, endGameCallback);

  // Event listener pour le bouton "Passer"
  const passButton = document.getElementById("btn-pass");
  if (passButton) {
    passButton.addEventListener("click", () => {
      if (!gameService.isRunning()) return;

      const newComputerCard = gameService.generateComputerCard();
      if (newComputerCard) {
        displayComputerCard(gameService);
      } else {
        // Plus de cartes disponibles pour l'ordinateur
        const gameStatus = gameService.checkGameEnd();
        if (gameStatus.ended) {
          endGameCallback(gameStatus);
        }
      }
    });
  }
};

export { setupEventListeners };
