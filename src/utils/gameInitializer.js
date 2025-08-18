import { displayPlayerCards } from "./displayedPlayerCard.js";
import { displayComputerCard } from "./displayComputerCard.js";
import { updateDisplay } from "./displayUpdater.js";

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
