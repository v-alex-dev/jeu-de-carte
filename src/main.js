import "./style.css";
import askStartGame from "./utils/askStartGame";
import { GameService } from "./services/gameService";
import { createGameTemplate } from "./templates/gamesArea";
import { initializeGame } from "./utils/gameInitializer.js";
import { setupEventListeners } from "./utils/eventListeners.js";
import { endGame } from "./utils/gameEnder.js";

const app = document.getElementById("app");
if (!app) {
  console.error("App element not found in the DOM.");
}

const gameService = new GameService();

askStartGame(app);

// Add event listener for the start game button
const startGameButton = document.getElementById("start-game");
if (startGameButton) {
  startGameButton.addEventListener("click", () => {
    app.innerHTML = createGameTemplate();
    initializeGame(gameService, endGame);
    setupEventListeners(gameService, endGame);
  });
} else {
  console.error("Start game button not found in the DOM.");
}
