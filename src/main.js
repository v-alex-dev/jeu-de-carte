import "./style.css";
import askStartGame from "./utils/askStartGame";
import { GameService } from "./services/gameService";
import { displayPlayerCards } from "./utils/displayedPlayerCard";
import { displayComputerCard } from "./utils/displayComputerCard";
import { showMessage } from "./utils/chronometer";
import { createGameTemplate } from "./templates/gamesArea";

const app = document.getElementById("app");
if (!app) {
  console.error("App element not found in the DOM.");
}

const gameService = new GameService();

askStartGame(app);

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

function updateDisplay() {
  const timeDisplay = document.getElementById("time-display");
  const scoreDisplay = document.getElementById("score-display");

  if (timeDisplay) {
    timeDisplay.textContent = formatTime(gameService.getTimeLeft());
  }

  if (scoreDisplay) {
    scoreDisplay.textContent = gameService.getScore();
  }
}

function initializeGame() {
  // Générer les cartes du joueur
  gameService.generatePlayerCards();
  displayPlayerCards(gameService);

  // Générer la première carte de l'ordinateur
  gameService.generateComputerCard();
  displayComputerCard(gameService);

  // Démarrer le timer
  gameService.startTimer(
    (timeLeft) => updateDisplay(),
    (gameStatus) => endGame(gameStatus)
  );

  updateDisplay();
}

function endGame(gameStatus) {
  showMessage(gameStatus.message, !gameStatus.win);

  // Désactiver les clics sur les cartes
  const playerCards = document.querySelectorAll(".player-card-item");
  playerCards.forEach((card) => {
    card.style.pointerEvents = "none";
    card.classList.remove("hover:bg-gray-400");
  });

  // Désactiver le bouton passer
  const passButton = document.getElementById("btn-pass");
  if (passButton) {
    passButton.disabled = true;
  }
}

function setupEventListeners() {
  // Event listeners pour les cartes du joueur
  const playerCards = document.querySelectorAll(".player-card-item");
  playerCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!gameService.isRunning()) return;

      const cardValue = parseInt(card.dataset.cardValue);
      const result = gameService.handleCardClick(cardValue);

      if (result.correct) {
        showMessage(result.message);
        card.style.visibility = "hidden"; // Masquer la carte trouvée en gardant l'espace
        card.style.pointerEvents = "none"; // Désactiver les clics sur cette carte

        // Générer une nouvelle carte ordinateur
        const newComputerCard = gameService.generateComputerCard();
        if (newComputerCard) {
          displayComputerCard(gameService);
        }
      } else {
        showMessage(result.message, true);
      }

      updateDisplay();

      // Vérifier si le jeu est terminé
      const gameStatus = gameService.checkGameEnd();
      if (gameStatus.ended) {
        endGame(gameStatus);
      }
    });
  });

  // Event listener pour le bouton "Passer"
  const passButton = document.getElementById("btn-pass");
  if (passButton) {
    passButton.addEventListener("click", () => {
      if (!gameService.isRunning()) return;

      const newComputerCard = gameService.generateComputerCard();
      if (newComputerCard) {
        displayComputerCard(gameService);
      } else {
        // Plus de cartes disponibles pour l'ordinateur
        const gameStatus = gameService.checkGameEnd();
        if (gameStatus.ended) {
          endGame(gameStatus);
        }
      }
    });
  }
}

// Add event listener for the start game button
const startGameButton = document.getElementById("start-game");
if (startGameButton) {
  startGameButton.addEventListener("click", () => {
    app.innerHTML = createGameTemplate();
    initializeGame();
    setupEventListeners();
  });
} else {
  console.error("Start game button not found in the DOM.");
}
