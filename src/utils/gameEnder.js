import { showMessage } from "./chronometer.js";

const endGame = (gameStatus) => {
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
