import { showMessage } from "./chronometer.js";
import { displayComputerCard } from "./displayComputerCard.js";
import { updateDisplay } from "./displayUpdater.js";

/**
 * Sets up drag and drop functionality for player cards.
 * @param {GameService} gameService
 * @param {function} endGameCallback
 */
export function setupDragAndDrop(gameService, endGameCallback) {
  const dropZone = document.getElementById("drop-zone");
  const playerCards = document.querySelectorAll(".player-card-item");

  if (!dropZone) {
    console.error("Drop zone not found");
    return;
  }

  // Configure each player card for dragging
  playerCards.forEach((card) => {
    // Make card draggable
    card.draggable = true;

    // Drag start event
    card.addEventListener("dragstart", (e) => {
      if (!gameService.isRunning()) {
        e.preventDefault();
        return;
      }

      card.classList.add("dragging");
      // Store the card value in the dataTransfer
      e.dataTransfer.setData("text/plain", card.dataset.cardValue);
      e.dataTransfer.effectAllowed = "move";
    });

    // Drag end event
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  });

  // Configure drop zone
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = "move";
    dropZone.classList.add("drag-over");
  });

  dropZone.addEventListener("dragleave", (e) => {
    // Only remove highlight if we're actually leaving the drop zone
    if (!dropZone.contains(e.relatedTarget)) {
      dropZone.classList.remove("drag-over");
    }
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");

    if (!gameService.isRunning()) return;

    const cardValue = parseInt(e.dataTransfer.getData("text/plain"));
    const draggedCard = document.querySelector(
      `[data-card-value="${cardValue}"]`
    );

    if (!draggedCard) {
      console.error("Dragged card not found");
      return;
    }

    // Check if the card matches the computer card
    const result = gameService.handleCardDrop(cardValue);

    if (result.correct) {
      showMessage(result.message);

      // Hide the card (successful match)
      draggedCard.style.visibility = "hidden";
      draggedCard.style.pointerEvents = "none";
      draggedCard.draggable = false;

      // Generate new computer card
      const newComputerCard = gameService.generateComputerCard();
      if (newComputerCard) {
        displayComputerCard(gameService);
      }
    } else {
      showMessage(result.message, true);

      // Card returns to its original position automatically (drag failed)
      // Generate new computer card even on wrong answer
      const newComputerCard = gameService.generateComputerCard();
      if (newComputerCard) {
        displayComputerCard(gameService);
      }
    }

    updateDisplay(gameService);

    // Check if game is ended
    const gameStatus = gameService.checkGameEnd();
    if (gameStatus.ended) {
      endGameCallback(gameStatus);
    }
  });
}
