import { showMessage } from "./chronometer.js";
import { gameNextLevel } from "./gameNextLevel.js";
/**
 * Ends the game and displays the final message.
 * @param {Object} gameStatus - The status of the game at the end.
 * @param {boolean} gameStatus.win - Indicates if the player won the game.
 * @param {string} gameStatus.message - The message to display at the end of the game.
 * @param {number} gameStatus.time - The time taken to complete the game.
 * @param {number} gameStatus.score - The final score of the player.
 * @param {GameService} gameService - L'instance du service de jeu
 */
const endGame = (gameStatus, gameService = null) => {
  if (gameStatus.levelUp && gameService) {
    showMessage("Niveau supérieur atteint !", false);
    // Attendre un peu avant de passer au niveau suivant
    setTimeout(() => {
      gameNextLevel(gameService, endGame);
    }, 2000);
    return;
  }
  showMessage(gameStatus.message, !gameStatus.win);

  // Désactiver les clics sur les cartes
  const playerCards = document.querySelectorAll(".player-card-item");
  playerCards.forEach((card) => {
    card.style.pointerEvents = "none";
    card.classList.remove("hover:bg-gray-400");
  });

  // Désactiver le bouton passer
  const passButton = document.getElementById("btn-pass");
  if (passButton) {
    passButton.disabled = true;
  }
};

export { endGame };
