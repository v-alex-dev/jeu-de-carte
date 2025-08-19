import "./style.css";
import askStartGame from "./utils/ui/askStartGame";
import { GameService } from "./services/gameService";
import { createGameTemplate } from "./templates/gamesArea";
import { initializeGame } from "./utils/game/gameInitializer.js";
import { setupEventListeners } from "./utils/events/eventListeners.js";
import { endGame } from "./utils/game/gameEnder.js";

const app = document.getElementById("app");
if (!app) {
  console.error("App element not found in the DOM.");
}

let gameService = new GameService();

/**
 * Starts a new game session
 */
function startNewGame() {
  console.log("Starting new game"); // Debug log
  gameService.resetGame(); // Reset existing game service instead of creating new one
  app.innerHTML = createGameTemplate();

  // Réactiver le bouton passer après avoir créé le template
  const passButton = document.getElementById("btn-pass");
  if (passButton) {
    passButton.disabled = false;
  }

  initializeGame(gameService, (gameStatus, gameServiceInstance) =>
    endGame(gameStatus, gameServiceInstance, restartGame)
  );
  setupEventListeners(gameService, (gameStatus, gameServiceInstance) =>
    endGame(gameStatus, gameServiceInstance, restartGame)
  );
}

/**
 * Restarts the game by resetting everything and starting fresh
 */
function restartGame() {
  console.log("restartGame function called"); // Debug log
  startNewGame();
}

askStartGame(app);

// Add event listener for the start game button
const startGameButton = document.getElementById("start-game");
if (startGameButton) {
  startGameButton.addEventListener("click", startNewGame);
} else {
  console.error("Start game button not found in the DOM.");
}
