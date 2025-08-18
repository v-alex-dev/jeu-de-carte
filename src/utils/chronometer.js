/**
 * Displays a message in the game message area with appropriate styling.
 * The message automatically disappears after 10 seconds.
 * @param {string} message - The message to display
 * @param {boolean} [isError=false] - Whether the message is an error (affects styling)
 */
const showMessage = (message, isError = false) => {
  const messageElement = document.getElementById("game-message");
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = `text-center mt-4 text-lg font-bold ${
      isError ? "text-red-700" : "text-green-800"
    }`;

    // Effacer le message après 5 secondes
    setTimeout(() => {
      messageElement.textContent = "";
    }, 10000);
  }
};

export { showMessage };
