/**
 * Creates and returns the HTML template for the end game modal.
 * Displays win/lose message, final score, and restart button.
 * @param {boolean} isWin - Whether the player won or lost
 * @param {number} finalScore - The player's final score
 * @param {number} level - The current level reached
 * @returns {string} - The HTML template string for the modal
 */
export function createEndGameModal(isWin, finalScore, level) {
  const title = isWin ? "🎉 Félicitations !" : "😔 Partie terminée";
  const message = isWin
    ? `Vous avez gagné ! Excellent travail !`
    : `Vous avez perdu... Réessayez !`;
  const titleColor = isWin ? "text-green-600" : "text-red-600";
  const buttonText = "Recommencer";

  return `
    <div id="end-game-modal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title ${titleColor}">${title}</h2>
        </div>
        <div class="modal-body">
          <p class="modal-message">${message}</p>
          <div class="score-section">
            <div class="score-item">
              <span class="score-label">Score final:</span>
              <span class="score-value">${finalScore}</span>
            </div>
            <div class="score-item">
              <span class="score-label">Niveau atteint:</span>
              <span class="score-value">${level}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button id="restart-game-btn" class="restart-btn">
            ${buttonText}
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Shows the end game modal in the DOM
 * @param {boolean} isWin - Whether the player won or lost
 * @param {number} finalScore - The player's final score
 * @param {number} level - The current level reached
 * @param {Function} onRestart - Callback function to execute when restart button is clicked
 */
export function showEndGameModal(isWin, finalScore, level, onRestart) {
  // Remove existing modal if any
  const existingModal = document.getElementById("end-game-modal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create and insert modal
  const modalHTML = createEndGameModal(isWin, finalScore, level);
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Add event listeners
  const modal = document.getElementById("end-game-modal");
  const restartBtn = document.getElementById("restart-game-btn");

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideEndGameModal();
    }
  });

  // Restart game when clicking restart button
  restartBtn.addEventListener("click", () => {
    console.log("Restart button clicked"); // Debug log
    hideEndGameModal();
    if (onRestart && typeof onRestart === "function") {
      console.log("Calling restart function"); // Debug log
      onRestart();
    } else {
      console.error("onRestart is not a function:", onRestart); // Debug log
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", handleEscapeKey);
}

/**
 * Hides and removes the end game modal from the DOM
 */
export function hideEndGameModal() {
  const modal = document.getElementById("end-game-modal");
  if (modal) {
    modal.remove();
  }
  document.removeEventListener("keydown", handleEscapeKey);
}

/**
 * Handles Escape key press to close modal
 * @param {KeyboardEvent} e - The keyboard event
 */
function handleEscapeKey(e) {
  if (e.key === "Escape") {
    hideEndGameModal();
  }
}
