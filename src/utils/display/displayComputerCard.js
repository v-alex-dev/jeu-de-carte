import { GameService } from "../../services/gameService.js";

/**
 * Displays the current computer card in the designated DOM element.
 * @param {GameService} gameService - The service managing the game state
 */
const displayComputerCard = (gameService) => {
  const computerCard = gameService.getCurrentComputerCard();
  const computerCardElement = document.getElementById("computer-card");
  if (computerCardElement && computerCard) {
    computerCardElement.textContent = computerCard;
  }
};

export { displayComputerCard };
