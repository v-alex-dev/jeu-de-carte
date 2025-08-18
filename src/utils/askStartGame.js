export default function askStartGame(domElement) {
  const template = `
        <div class="card">
        <h2>Bienvenue dans le jeu de carte</h2>
        <p>Utilisez les boutons pour jouer.</p>
        <button id="start-game">Démarrer le jeu</button>
      </div>
      `;

  if (!domElement || !domElement.querySelector) {
    console.error("Invalid DOM element provided.");
    return;
  } else {
    domElement.innerHTML = template;
  }
}
