const showMessage = (message, isError = false) => {
  const messageElement = document.getElementById("game-message");
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = `text-center mt-4 text-lg font-bold ${
      isError ? "text-red-500" : "text-green-500"
    }`;

    // Effacer le message après 5 secondes
    setTimeout(() => {
      messageElement.textContent = "";
    }, 10000);
  }
};

export { showMessage };
