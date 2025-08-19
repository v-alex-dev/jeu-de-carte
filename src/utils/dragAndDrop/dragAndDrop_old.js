import { showMessage } from "../ui/chronometer.js";
import { displayComputerCard } from "../display/displayComputerCard.js";
import { updateDisplay } from "../display/displayUpdater.js";

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

  // Nettoyer les anciens événements de la drop zone si ils existent
  const newDropZone = dropZone.cloneNode(true);
  dropZone.parentNode.replaceChild(newDropZone, dropZone);
  const cleanDropZone = document.getElementById("drop-zone"); // Configure each player card for dragging
  playerCards.forEach((card) => {
    // Nettoyer les anciens événements sans cloner (pour garder les data-attributes)
    const newCard = card.cloneNode(true);
    // Préserver les data-attributes
    if (card.dataset.cardValue) {
      newCard.dataset.cardValue = card.dataset.cardValue;
    }
    card.parentNode.replaceChild(newCard, card);

    // Make card draggable
    newCard.draggable = true;

    // Drag start event
    newCard.addEventListener("dragstart", (e) => {
      if (!gameService.isRunning()) {
        e.preventDefault();
        return;
      }

      newCard.classList.add("dragging");
      // Store the card value in the dataTransfer
      e.dataTransfer.setData("text/plain", newCard.dataset.cardValue);
      e.dataTransfer.effectAllowed = "move";
    });

    // Drag end event
    newCard.addEventListener("dragend", () => {
      newCard.classList.remove("dragging");
    });
  });

  // Re-sélectionner les nouvelles cartes pour les événements
  const updatedPlayerCards = document.querySelectorAll(".player-card-item");

  // Configure drop zone
  cleanDropZone.addEventListener("dragover", (e) => {
    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = "move";
    cleanDropZone.classList.add("drag-over");
  });

  cleanDropZone.addEventListener("dragleave", (e) => {
    // Only remove highlight if we're actually leaving the drop zone
    if (!cleanDropZone.contains(e.relatedTarget)) {
      cleanDropZone.classList.remove("drag-over");
    }
  });

  cleanDropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    cleanDropZone.classList.remove("drag-over");

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
    if (gameStatus.ended || gameStatus.levelUp) {
      endGameCallback(gameStatus, gameService);
    }
  });
}
