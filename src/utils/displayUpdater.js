import { formatTime } from "./timeFormatter.js";

const updateDisplay = (gameService) => {
  const timeDisplay = document.getElementById("time-display");
  const scoreDisplay = document.getElementById("score-display");

  if (timeDisplay) {
    timeDisplay.textContent = formatTime(gameService.getTimeLeft());
  }

  if (scoreDisplay) {
    scoreDisplay.textContent = gameService.getScore();
  }
};

export { updateDisplay };
