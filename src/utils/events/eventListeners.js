import { showMessage } from "../ui/chronometer.js";
import { displayComputerCard } from "../display/displayComputerCard.js";
import { updateDisplay } from "../display/displayUpdater.js";
import { setupDragAndDrop } from "../dragAndDrop/dragAndDrop.js";

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
        updateDisplay(gameService);
        // Une nouvelle carte a été générée, le jeu continue
      } else {
        // Plus de cartes disponibles pour l'ordinateur
        console.log("Plus de cartes disponibles pour l'ordinateur");
        // SEULEMENT maintenant vérifier la fin de jeu
        const gameStatus = gameService.checkGameEnd(true); // Vérifier les cartes seulement après échec de génération
        if (gameStatus.ended) {
          console.log("Fin de jeu détectée:", gameStatus);
          endGameCallback(gameStatus, gameService);
        }
      }
    });
  }
};

export { setupEventListeners };
