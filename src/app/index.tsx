import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// What one card looks like (TypeScript "type")
type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
};

// 6 pairs of Nepali foods = 12 cards (we'll shuffle them in a later lesson)
const startingCards: Card[] = [
  { id: 1, emoji: "🥟", isFlipped: false }, 
  { id: 2, emoji: "🥟", isFlipped: false },
  { id: 3, emoji: "🍛", isFlipped: false },
  { id: 4, emoji: "🍛", isFlipped: false },
  { id: 5, emoji: "🍜", isFlipped: false },
  { id: 6, emoji: "🍜", isFlipped: false },
  { id: 7, emoji: "🍵", isFlipped: false },
  { id: 8, emoji: "🍵", isFlipped: false },
  { id: 9, emoji: "🍩", isFlipped: false }, 
  { id: 10, emoji: "🍩", isFlipped: false },
  { id: 11, emoji: "🥛", isFlipped: false }, 
  { id: 12, emoji: "🥛", isFlipped: false },
];

export default function HomeScreen() {
  // ONE memory for ALL cards
  const [cards, setCards] = useState<Card[]>(startingCards);

  // Flip only the card that was tapped (found by its unique id)
  function flipCard(id: number) {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card,
      ),
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nepali Memory Match</Text>
      <Text style={styles.subtitle}>Find the matching Nepali foods! 🇳🇵</Text>

      <View style={styles.grid}>
        {cards.map((card) => (
          <Pressable
            key={card.id}
            style={[styles.card, card.isFlipped && styles.cardFlipped]}
            onPress={() => flipCard(card.id)}
          >
            <Text style={styles.cardEmoji}>
              {card.isFlipped ? card.emoji : "❓"}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#DC143C",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    width: 294, // 3 cards (90 each) + 2 gaps (12 each)
  },
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
  cardEmoji: {
    fontSize: 40,
  },
});
