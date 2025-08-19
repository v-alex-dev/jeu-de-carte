import { levelUpDisplay, updateLevelDisplay } from "./displayLevel.js";
import { formatTime } from "./timeFormatter.js";
/**
 * Updates the display elements for time and score based on the current game state.
 * @param {GameService} gameService - The service managing the game state
 */
const updateDisplay = (gameService) => {
  const timeDisplay = document.getElementById("time-display");
  const scoreDisplay = document.getElementById("score-display");

  if (timeDisplay) {
    timeDisplay.textContent = formatTime(gameService.getTimeLeft());
  }

  if (scoreDisplay) {
    scoreDisplay.textContent = gameService.getScore();
  }
  levelUpDisplay(gameService);
};

export { updateDisplay };
