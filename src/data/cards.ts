// What one card looks like
export type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

// The 6 Nepali foods: each one becomes a pair
export const foods = ["🥟", "🍛", "🍜", "🍵", "🍩", "🥛"]; // Momo, Dal Bhat, Thukpa, Chiya, Sel Roti, Dahi

// Shuffle a list randomly (Fisher-Yates shuffle)
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]; // work on a copy, never the original
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random position from 0 to i
    [copy[i], copy[j]] = [copy[j], copy[i]]; // swap the two items
  }
  return copy;
}

// Build a fresh, shuffled deck of 12 cards
export function createDeck(): Card[] {
  const pairs = [...foods, ...foods]; // every food twice = 12 emojis
  return shuffle(pairs).map((emoji, index) => ({
    id: index + 1,
    emoji: emoji,
    isFlipped: false,
    isMatched: false,
  }));
}
