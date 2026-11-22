import { MaterialCommunityIcons } from "@expo/vector-icons";

// The name of any icon in the MaterialCommunityIcons set
export type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

// What one card looks like
export type Card = {
  id: number;
  icon: IconName; // which icon is on the front
  color: string; // background colour of the front
  isFlipped: boolean;
  isMatched: boolean;
};

// The 6 card faces: each one becomes a pair
export const cardFaces: { icon: IconName; color: string }[] = [
  { icon: "crown", color: "#F5A623" }, // gold
  { icon: "diamond-stone", color: "#00BCD4" }, // cyan
  { icon: "fire", color: "#FF5722" }, // orange
  { icon: "lightning-bolt", color: "#7C4DFF" }, // purple
  { icon: "rocket-launch", color: "#2979FF" }, // blue
  { icon: "heart", color: "#E91E63" }, // pink
];

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
  const pairs = [...cardFaces, ...cardFaces]; // every face twice = 12 cards
  return shuffle(pairs).map((face, index) => ({
    id: index + 1,
    icon: face.icon,
    color: face.color,
    isFlipped: false,
    isMatched: false,
  }));
}
