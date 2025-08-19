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

  if (!dropZone) {
    console.error("Drop zone not found");
    return;
  }

  // Nettoyer les anciens événements de la drop zone
  const newDropZone = dropZone.cloneNode(true);
  dropZone.parentNode.replaceChild(newDropZone, dropZone);
  const cleanDropZone = document.getElementById("drop-zone");

  // Re-configurer toutes les cartes de joueur
  const playerCards = document.querySelectorAll(".player-card-item");

  playerCards.forEach((card) => {
    // Supprimer tous les anciens listeners en recréant l'élément
    const cardValue = card.dataset.cardValue;
    const cardText = card.textContent;
    const cardId = card.id;
    const cardClasses = card.className;

    if (!cardValue) return; // Ignorer les cartes sans valeur

    // Créer une nouvelle carte avec les mêmes propriétés
    const newCard = document.createElement("div");
    newCard.id = cardId;
    newCard.className = cardClasses;
    newCard.textContent = cardText;
    newCard.dataset.cardValue = cardValue;
    newCard.draggable = true;

    // Remplacer l'ancienne carte
    card.parentNode.replaceChild(newCard, card);

    // Ajouter les événements drag
    newCard.addEventListener("dragstart", (e) => {
      if (!gameService.isRunning()) {
        e.preventDefault();
        return;
      }

      newCard.classList.add("dragging");
      e.dataTransfer.setData("text/plain", newCard.dataset.cardValue);
      e.dataTransfer.effectAllowed = "move";
    });

    newCard.addEventListener("dragend", () => {
      newCard.classList.remove("dragging");
    });
  });

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

    // Chercher la carte avec le bon data-card-value
    const draggedCard = document.querySelector(
      `[data-card-value="${cardValue}"]`
    );

    if (!draggedCard) {
      console.error("Dragged card not found, cardValue:", cardValue);
      // Debug: lister toutes les cartes disponibles
      const allCards = document.querySelectorAll(".player-card-item");
      console.log(
        "Available cards:",
        Array.from(allCards).map((c) => c.dataset.cardValue)
      );
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

      // Vérifier d'abord si le joueur a gagné le niveau
      const gameStatus = gameService.checkGameEnd();
      if (gameStatus.levelUp) {
        // Victoire de niveau - pas besoin de générer une nouvelle carte
        gameService.stopTimer();
        updateDisplay(gameService);
        endGameCallback(gameStatus, gameService);
        return;
      }

      // Le joueur a encore des cartes, essayer de générer une nouvelle carte ordinateur
      const newComputerCard = gameService.generateComputerCard();
      if (newComputerCard) {
        displayComputerCard(gameService);
        // Ne pas vérifier la fin de jeu ici - laisser le joueur essayer de jouer la nouvelle carte
      } else {
        // L'ordinateur n'a plus de cartes - défaite du joueur
        const finalGameStatus = gameService.checkGameEnd(true); // Vérifier les cartes seulement quand on n'en a plus
        if (finalGameStatus.ended) {
          gameService.stopTimer();
          updateDisplay(gameService);
          endGameCallback(finalGameStatus, gameService);
          return;
        }
      }
    } else {
      showMessage(result.message, true);

      // Générer une nouvelle carte même en cas de mauvaise réponse
      const newComputerCard = gameService.generateComputerCard();
      if (newComputerCard) {
        displayComputerCard(gameService);
        // Ne pas vérifier la fin de jeu ici - laisser le joueur essayer de jouer la nouvelle carte
      } else {
        // L'ordinateur n'a plus de cartes - défaite du joueur
        const gameStatus = gameService.checkGameEnd(true); // Vérifier les cartes seulement quand on n'en a plus
        if (gameStatus.ended) {
          gameService.stopTimer();
          updateDisplay(gameService);
          endGameCallback(gameStatus, gameService);
          return;
        }
      }
    }

    updateDisplay(gameService);
  });
}
