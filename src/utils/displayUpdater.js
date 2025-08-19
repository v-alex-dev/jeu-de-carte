import { updateLevelDisplay } from "./displayLevel.js";
import { formatTime } from "./timeFormatter.js";
/**
 * Updates the display elements for time and score based on the current game state.
 * @param {GameService} gameService - The service managing the game state
 */
const updateDisplay = (gameService) => {
  const timeDisplay = document.getElementById("time-display");
  const scoreDisplay = document.getElementById("score-display");
  const passButton = document.getElementById("btn-pass");

  if (timeDisplay) {
    timeDisplay.textContent = formatTime(gameService.getTimeLeft());
  }

  if (scoreDisplay) {
    scoreDisplay.textContent = gameService.getScore();
  }

  // Mettre à jour l'affichage du niveau
  updateLevelDisplay(gameService);

  // Gérer l'état du bouton "Passer"
  if (passButton) {
    if (!gameService.isRunning() || !gameService.canGenerateMoreCards()) {
      passButton.disabled = true;
      passButton.textContent = "Plus de cartes";
    } else {
      passButton.disabled = false;
      passButton.textContent = "Passer";
    }
  }
};

export { updateDisplay };
