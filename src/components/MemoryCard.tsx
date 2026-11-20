import { Pressable, StyleSheet, Text } from "react-native";
import type { Card } from "../data/cards";

// What this component needs to be given (its "props")
type MemoryCardProps = {
  card: Card;
  onPress: () => void;
};

// Draws ONE card. It doesn't know the game rules, it just shows the card and reports taps.
export default function MemoryCard({ card, onPress }: MemoryCardProps) {
  return (
    <Pressable
      style={[
        styles.card,
        card.isFlipped && styles.cardFlipped,
        card.isMatched && styles.cardMatched,
      ]}
      onPress={onPress}
    >
      <Text style={styles.cardEmoji}>{card.isFlipped ? card.emoji : "❓"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 110,
    backgroundColor: "#003893",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardFlipped: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#003893",
  },
  cardMatched: {
    backgroundColor: "#E8F5E9",
    borderColor: "#2E7D32",
  },
  cardEmoji: {
    fontSize: 40,
  },
});
