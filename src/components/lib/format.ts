/**
 * Formats seconds into a time string (MM:SS or HH:MM)
 * @param time - Time in seconds
 * @returns Formatted time string
 */
export const formatTime = (time: number): string => {
  // Formatting duration of video
  if (isNaN(time)) {
    return "00:00";
  }

  const date = new Date(time * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  
  if (hours) {
    // If video has hours
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds}`;
  }
};