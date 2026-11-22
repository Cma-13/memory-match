// Turns seconds into "minutes:seconds", e.g. 75 → "1:15", 9 → "0:09"
export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60); // whole minutes
  const seconds = totalSeconds % 60; // leftover seconds
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
