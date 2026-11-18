import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// What one card looks like
type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

// 6 pairs of Nepali foods = 12 cards (we'll shuffle them in a later lesson)
const startingCards: Card[] = [
  { id: 1, emoji: "🥟", isFlipped: false, isMatched: false }, // Momo
  { id: 2, emoji: "🥟", isFlipped: false, isMatched: false },
  { id: 3, emoji: "🍛", isFlipped: false, isMatched: false }, // Dal Bhat
  { id: 4, emoji: "🍛", isFlipped: false, isMatched: false },
  { id: 5, emoji: "🍜", isFlipped: false, isMatched: false }, // Thukpa
  { id: 6, emoji: "🍜", isFlipped: false, isMatched: false },
  { id: 7, emoji: "🍵", isFlipped: false, isMatched: false }, // Chiya
  { id: 8, emoji: "🍵", isFlipped: false, isMatched: false },
  { id: 9, emoji: "🍩", isFlipped: false, isMatched: false }, // Sel Roti
  { id: 10, emoji: "🍩", isFlipped: false, isMatched: false },
  { id: 11, emoji: "🥛", isFlipped: false, isMatched: false }, // Dahi
  { id: 12, emoji: "🥛", isFlipped: false, isMatched: false },
];

export default function HomeScreen() {
  const [cards, setCards] = useState<Card[]>(startingCards);
  const [selected, setSelected] = useState<number[]>([]); // ids flipped this turn
  const [isChecking, setIsChecking] = useState(false); // true during the wait

  // True only when every card is matched
  const hasWon = cards.every((card) => card.isMatched);

  function handlePress(id: number) {
    const tappedCard = cards.find((card) => card.id === id);

    // 1. Ignore the tap if: we're waiting, the card is already face-up, or already matched
    if (
      !tappedCard ||
      isChecking ||
      tappedCard.isFlipped ||
      tappedCard.isMatched
    ) {
      return;
    }

    // 2. Flip the tapped card face-up
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card,
    );
    setCards(newCards);

    // 3. Remember it as one of this turn's cards
    const newSelected = [...selected, id];
    setSelected(newSelected);

    // 4. Only 1 card flipped so far? Wait for the second one.
    if (newSelected.length < 2) {
      return;
    }

    // 5. Two cards are flipped: compare them
    const [firstId, secondId] = newSelected;
    const firstCard = newCards.find((card) => card.id === firstId);
    const secondCard = newCards.find((card) => card.id === secondId);

    if (firstCard?.emoji === secondCard?.emoji) {
      // ✅ MATCH: mark both as matched, they stay face-up
      setCards(
        newCards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isMatched: true }
            : card,
        ),
      );
      setSelected([]);
    } else {
      // ❌ NO MATCH: wait, then flip both back
      setIsChecking(true);
      setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card,
          ),
        );
        setSelected([]);
        setIsChecking(false);
      }, 400);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nepali Memory Match</Text>
      <Text style={styles.subtitle}>Find the matching Nepali foods! 🇳🇵</Text>

      <View style={styles.grid}>
        {cards.map((card) => (
          <Pressable
            key={card.id}
            style={[
              styles.card,
              card.isFlipped && styles.cardFlipped,
              card.isMatched && styles.cardMatched,
            ]}
            onPress={() => handlePress(card.id)}
          >
            <Text style={styles.cardEmoji}>
              {card.isFlipped ? card.emoji : "❓"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Win message: only shows when all cards are matched */}
      {hasWon && (
        <Text style={styles.winText}>🎉Congrats! You found all the pairs!</Text>
      )}
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
  cardMatched: {
    backgroundColor: "#E8F5E9",
    borderColor: "#2E7D32",
  },
  cardEmoji: {
    fontSize: 40,
  },
  winText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 24,
    textAlign: "center",
  },
});
