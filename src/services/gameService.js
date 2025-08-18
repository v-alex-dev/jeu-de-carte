export class GameService {
  constructor() {
    this.playerCards = [];
    this.computerUsedCards = [];
    this.currentComputerCard = null;
    this.score = 0;
    this.timeLeft = 30;
    this.gameTimer = null;
    this.isGameRunning = false;
  }

  // Génère 5 cartes aléatoires différentes entre 1 et 10
  generatePlayerCards() {
    const cards = [];
    while (cards.length < 5) {
      const randomCard = Math.floor(Math.random() * 10) + 1;
      if (!cards.includes(randomCard)) {
        cards.push(randomCard);
      }
    }
    // Tri croissant
    this.playerCards = cards.sort((a, b) => a - b);
    return this.playerCards;
  }

  // Génère une carte pour l'ordinateur (différente des cartes déjà utilisées)
  generateComputerCard() {
    const availableCards = [];
    for (let i = 1; i <= 10; i++) {
      if (!this.computerUsedCards.includes(i)) {
        availableCards.push(i);
      }
    }

    if (availableCards.length === 0) {
      return null; // Plus de cartes disponibles
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    this.currentComputerCard = availableCards[randomIndex];
    this.computerUsedCards.push(this.currentComputerCard);

    return this.currentComputerCard;
  }

  // Vérifie si le joueur a la carte
  checkPlayerCard(selectedCard) {
    return (
      this.playerCards.includes(selectedCard) &&
      selectedCard === this.currentComputerCard
    );
  }

  // Gère le clic sur une carte du joueur
  handleCardClick(selectedCard) {
    if (!this.isGameRunning) return false;

    if (this.checkPlayerCard(selectedCard)) {
      // Bonne réponse
      this.score++;
      this.removePlayerCard(selectedCard);
      return { correct: true, message: "Bonne réponse!" };
    } else {
      // Mauvaise réponse
      if (this.score > 0) {
        this.score--;
      }
      return { correct: false, message: "Mauvaise réponse!" };
    }
  }

  // Supprime une carte du jeu du joueur
  removePlayerCard(card) {
    this.playerCards = this.playerCards.filter((c) => c !== card);
  }

  // Vérifie les conditions de fin de jeu
  checkGameEnd() {
    // Victoire : toutes les cartes du joueur trouvées
    if (this.playerCards.length === 0) {
      return {
        ended: true,
        win: true,
        message: "Félicitations! Vous avez gagné!",
      };
    }

    // Défaite : temps écoulé
    if (this.timeLeft <= 0) {
      return {
        ended: true,
        win: false,
        message: "Temps écoulé! Vous avez perdu.",
      };
    }

    // Défaite : ordinateur a utilisé toutes les cartes
    if (this.computerUsedCards.length === 10) {
      return {
        ended: true,
        win: false,
        message: "L'ordinateur a utilisé toutes ses cartes! Vous avez perdu.",
      };
    }

    return { ended: false };
  }

  // Démarre le timer
  startTimer(onTimerUpdate, onGameEnd) {
    this.isGameRunning = true;
    this.gameTimer = setInterval(() => {
      this.timeLeft--;
      onTimerUpdate(this.timeLeft);

      const gameStatus = this.checkGameEnd();
      if (gameStatus.ended) {
        this.stopTimer();
        onGameEnd(gameStatus);
      }
    }, 1000);
  }

  // Arrête le timer
  stopTimer() {
    this.isGameRunning = false;
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
  }

  // Remet le jeu à zéro
  resetGame() {
    this.stopTimer();
    this.playerCards = [];
    this.computerUsedCards = [];
    this.currentComputerCard = null;
    this.score = 0;
    this.timeLeft = 30;
    this.isGameRunning = false;
  }

  // Getters
  getScore() {
    return this.score;
  }

  getTimeLeft() {
    return this.timeLeft;
  }

  getPlayerCards() {
    return [...this.playerCards];
  }

  getCurrentComputerCard() {
    return this.currentComputerCard;
  }

  isRunning() {
    return this.isGameRunning;
  }
}
