/**
 * Formats a time duration in seconds to a string in MM:SS format.
 * @param {number} seconds - The time duration in seconds.
 * @returns {string} - The formatted time string in MM:SS format.
 */
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export { formatTime };
