/**
 * Creates and returns the HTML template for the game area.
 * Includes timer, score display, computer card area, player cards, and game controls.
 * @returns {string} - The HTML template string for the game interface
 */
export function createGameTemplate() {
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
