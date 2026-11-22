import AsyncStorage from "@react-native-async-storage/async-storage";

// The name we save the best score under on the phone
const BEST_SCORE_KEY = "memory-match:best-score";

// What a score looks like
export type Score = {
  moves: number;
  seconds: number;
};

// Read the saved best score (returns null if there isn't one yet)
export async function loadBestScore(): Promise<Score | null> {
  try {
    const saved = await AsyncStorage.getItem(BEST_SCORE_KEY);
    return saved ? (JSON.parse(saved) as Score) : null;
  } catch {
    return null; // if reading fails, act like there's no best score
  }
}

// Save a new best score on the phone
export async function saveBestScore(score: Score): Promise<void> {
  try {
    await AsyncStorage.setItem(BEST_SCORE_KEY, JSON.stringify(score));
  } catch {
    // if saving fails, the game still works, it just won't remember
  }
}

// Is the new score better? Fewer moves wins; if moves are equal, faster time wins
export function isBetterScore(
  newScore: Score,
  oldScore: Score | null,
): boolean {
  if (!oldScore) {
    return true; // no best score yet, so any win is the best
  }
  if (newScore.moves !== oldScore.moves) {
    return newScore.moves < oldScore.moves;
  }
  return newScore.seconds < oldScore.seconds;
}
