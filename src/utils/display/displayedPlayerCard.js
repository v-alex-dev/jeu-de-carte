import { GameService } from "../../services/gameService.js";

/**
 * Displays the player's cards in the designated DOM elements.
 * Shows visible cards and hides empty card slots while maintaining their layout space.
 * @param {GameService} gameService - The service managing the game state
 */
const displayPlayerCards = (gameService) => {
  const playerCards = gameService.getPlayerCards();
  playerCards.forEach((card, index) => {
    const cardElement = document.getElementById(`player-card-${index + 1}`);
    if (cardElement) {
      cardElement.textContent = card;
      cardElement.dataset.cardValue = card.toString(); // S'assurer que c'est une string
      cardElement.style.display = "flex";
      cardElement.style.visibility = "visible";
      cardElement.style.pointerEvents = "auto"; // Réactiver les interactions
      cardElement.draggable = true; // S'assurer que c'est draggable
    }
  });

  // Masquer les cartes vides en gardant leur espace
  for (let i = playerCards.length; i < 5; i++) {
    const cardElement = document.getElementById(`player-card-${i + 1}`);
    if (cardElement) {
      cardElement.style.visibility = "hidden";
      cardElement.style.display = "flex"; // Garder l'espace
      cardElement.style.pointerEvents = "none"; // Désactiver les interactions
      cardElement.draggable = false;
    }
  }
};

export { displayPlayerCards };
