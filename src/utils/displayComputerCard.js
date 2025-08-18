import { GameService } from "../services/gameService.js";

const displayComputerCard = (gameService) => {
  const computerCard = gameService.getCurrentComputerCard();
  const computerCardElement = document.getElementById("computer-card");
  if (computerCardElement && computerCard) {
    computerCardElement.textContent = computerCard;
  }
};

export { displayComputerCard };
