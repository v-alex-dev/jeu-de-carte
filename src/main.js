import "./style.css";
import askStartGame from "./utils/askStartGame";

const app = document.getElementById("app");
if (!app) {
  console.error("App element not found in the DOM.");
}

askStartGame(app);

// Add event listener for the start game button
const startGameButton = document.getElementById("start-game");
if (startGameButton) {
  startGameButton.addEventListener("click", () => {
    // Here you can implement the logic to start the game
  });
} else {
  console.error("Start game button not found in the DOM.");
}
