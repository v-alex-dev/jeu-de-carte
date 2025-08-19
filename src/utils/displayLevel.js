import { GameService } from "../services/gameService.js";

const levelUpDisplay = () => {
  const gameService = new GameService();
  // Update the level display in the DOM
  if (!document.getElementById("level")) {
    console.error("Level display element not found in the DOM.");
    return;
  }
  // Assuming gameService has a method to get the current level
  // If not, you can directly access the level property
  // e.g., gameService.level
  // Ensure the level is updated in the GameService instance
  gameService.levelUp(); // Increment level for demonstration
  // Update the level display
  updateLevelDisplay(gameService);
};

const updateLevelDisplay = (gameService) => {
  const levelDisplay = document.getElementById("level");
  if (levelDisplay) {
    levelDisplay.textContent = ` ${gameService.level} `;
  } else {
    console.error("Level display element not found in the DOM.");
  }
};
export { levelUpDisplay, updateLevelDisplay };
