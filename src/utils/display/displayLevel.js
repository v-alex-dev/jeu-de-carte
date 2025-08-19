/**
 * Met à jour l'affichage du niveau dans le DOM
 * @param {GameService} gameService - L'instance du service de jeu
 */
const updateLevelDisplay = (gameService) => {
  const levelDisplay = document.getElementById("level");
  if (levelDisplay) {
    levelDisplay.textContent = ` ${gameService.level} `;
  } else {
    console.error("Level display element not found in the DOM.");
  }
};

export { updateLevelDisplay };
