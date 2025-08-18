import { showMessage } from "./chronometer.js";
import { displayComputerCard } from "./displayComputerCard.js";
import { updateDisplay } from "./displayUpdater.js";

const setupEventListeners = (gameService, endGameCallback) => {
  // Event listeners pour les cartes du joueur
  const playerCards = document.querySelectorAll(".player-card-item");
  playerCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!gameService.isRunning()) return;

      const cardValue = parseInt(card.dataset.cardValue);
      const result = gameService.handleCardClick(cardValue);

      if (result.correct) {
        showMessage(result.message);
        card.style.visibility = "hidden"; // Masquer la carte trouvée en gardant l'espace
        card.style.pointerEvents = "none"; // Désactiver les clics sur cette carte

        // Générer une nouvelle carte ordinateur
        const newComputerCard = gameService.generateComputerCard();
        if (newComputerCard) {
          displayComputerCard(gameService);
        }
      } else {
        showMessage(result.message, true);
      }

      updateDisplay(gameService);

      // Vérifier si le jeu est terminé
      const gameStatus = gameService.checkGameEnd();
      if (gameStatus.ended) {
        endGameCallback(gameStatus);
      }
    });
  });

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
