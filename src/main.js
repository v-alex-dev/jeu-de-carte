import "./style.css";
import askStartGame from "./utils/askStartGame";
import { GameService } from "./services/gameService";

const app = document.getElementById("app");
if (!app) {
  console.error("App element not found in the DOM.");
}

const gameService = new GameService();

askStartGame(app);

function createGameTemplate() {
  return `
      <div id="game-area" class="game-area">
        <div class="b-10 flex justify-center items-center">
          <h2 id="timer">Niveau 1 - <span id="time-display">00:30</span></h2>
          <div class="ml-4">
            <span class="font-bold">Score: <span id="score-display">0</span></span>
          </div>
        </div>
        <div class="computer" id="computer">
          <div class="game_card flex items-center justify-center text-white text-2xl font-bold" id="computer-card">
            ?
          </div>
        </div>
        <div class="menu" id="menu">
          <div class="flex w-full justify-center relative">
            <button class="btn-pass" id="btn-pass">Passer</button>
          </div>
        </div>
        <div id="player">
          <div class="player__card" id="player-card">
            <div class="game_card player-card-item" id="player-card-1"></div>
            <div class="game_card player-card-item" id="player-card-2"></div>
            <div class="game_card player-card-item" id="player-card-3"></div>
            <div class="game_card player-card-item" id="player-card-4"></div>
            <div class="game_card player-card-item" id="player-card-5"></div>
          </div>
        </div>
        <div id="game-message" class="text-center mt-4 text-lg font-bold"></div>
      </div>
      `;
}

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

function displayPlayerCards() {
  const playerCards = gameService.getPlayerCards();
  playerCards.forEach((card, index) => {
    const cardElement = document.getElementById(`player-card-${index + 1}`);
    if (cardElement) {
      cardElement.textContent = card;
      cardElement.dataset.cardValue = card;
      cardElement.style.display = "flex";
      cardElement.style.visibility = "visible";
    }
  });

  // Masquer les cartes vides en gardant leur espace
  for (let i = playerCards.length; i < 5; i++) {
    const cardElement = document.getElementById(`player-card-${i + 1}`);
    if (cardElement) {
      cardElement.style.visibility = "hidden";
      cardElement.style.display = "flex"; // Garder l'espace
    }
  }
}

function displayComputerCard() {
  const computerCard = gameService.getCurrentComputerCard();
  const computerCardElement = document.getElementById("computer-card");
  if (computerCardElement && computerCard) {
    computerCardElement.textContent = computerCard;
  }
}

function showMessage(message, isError = false) {
  const messageElement = document.getElementById("game-message");
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = `text-center mt-4 text-lg font-bold ${
      isError ? "text-red-500" : "text-green-500"
    }`;

    // Effacer le message après 5 secondes
    setTimeout(() => {
      messageElement.textContent = "";
    }, 5000);
  }
}

function initializeGame() {
  // Générer les cartes du joueur
  gameService.generatePlayerCards();
  displayPlayerCards();

  // Générer la première carte de l'ordinateur
  gameService.generateComputerCard();
  displayComputerCard();

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
          displayComputerCard();
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
        displayComputerCard();
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
