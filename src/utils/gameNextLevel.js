import { displayPlayerCards } from "./displayedPlayerCard.js";
import { displayComputerCard } from "./displayComputerCard.js";
import { updateDisplay } from "./displayUpdater.js";
import { setupDragAndDrop } from "./dragAndDrop.js";

/**
 * Gère le passage au niveau suivant
 * @param {GameService} gameService - L'instance du service de jeu
 * @param {function} endGameCallback - Callback pour la fin de jeu
 */
const gameNextLevel = (gameService, endGameCallback) => {
  // Passer au niveau suivant automatiquement
  gameService.passToNextLevel(
    (timeLeft) => updateDisplay(gameService),
    (gameStatus) => endGameCallback(gameStatus, gameService)
  );

  // Mettre à jour l'interface
  displayPlayerCards(gameService);

  // IMPORTANT: Re-configurer le drag & drop pour les nouvelles cartes
  setupDragAndDrop(gameService, endGameCallback);

  // Générer et afficher une nouvelle carte ordinateur
  const newComputerCard = gameService.generateComputerCard();
  if (newComputerCard) {
    displayComputerCard(gameService);
  }

  // Mettre à jour l'affichage complet
  updateDisplay(gameService);
};

export { gameNextLevel };
