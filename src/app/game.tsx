import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GameButton from "../components/GameButton";
import MemoryCard from "../components/MemoryCard";
import { createDeck, type Card } from "../data/cards";
import {
  isBetterScore,
  loadBestScore,
  saveBestScore,
  type Score,
} from "../utils/bestScore";
import { formatTime } from "../utils/formatTime";

export default function GameScreen() {
  const [cards, setCards] = useState<Card[]>(createDeck);
  const [selected, setSelected] = useState<number[]>([]); // ids flipped this turn
  const [isChecking, setIsChecking] = useState(false); // true during the wait
  const [moves, setMoves] = useState(0); // 1 move = 2 cards flipped
  const [seconds, setSeconds] = useState(0); // time played
  const [hasStarted, setHasStarted] = useState(false); // true after the first card is flipped
  const [bestScore, setBestScore] = useState<Score | null>(null); // saved best score
  const [isNewBest, setIsNewBest] = useState(false); // true if this game beat the best score

  // True only when every card is matched
  const hasWon = cards.every((card) => card.isMatched);

  // The timer runs only after the first flip, and stops when you win
  const isTimerRunning = hasStarted && !hasWon;

  // 📂 Load the saved best score once, when the screen opens
  useEffect(() => {
    loadBestScore().then((savedScore) => setBestScore(savedScore));
  }, []);

  // ⏱️ Timer: add 1 second every second while the timer is running
  useEffect(() => {
    if (!isTimerRunning) {
      return; // timer not running: do nothing
    }

    const intervalId = setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    // Cleanup: stop the ticking when the timer stops or the screen closes
    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  // 🏆 When you win: check if it's a new best score, and save it if so
  useEffect(() => {
    if (!hasWon) {
      return; // not won yet: nothing to check
    }

    const newScore: Score = { moves: moves, seconds: seconds };

    if (isBetterScore(newScore, bestScore)) {
      setBestScore(newScore);
      setIsNewBest(true);
      saveBestScore(newScore);
    }
  }, [hasWon, moves, seconds, bestScore]);

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

    // Start the timer on the very first flip
    if (!hasStarted) {
      setHasStarted(true);
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

    // 5. Two cards are flipped: that's one move
    setMoves((currentMoves) => currentMoves + 1);

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

  // Start a brand-new game
  function restartGame() {
    setCards(createDeck());
    setSelected([]);
    setIsChecking(false);
    setMoves(0);
    setSeconds(0);
    setHasStarted(false);
    setIsNewBest(false);
  }

  return (
    // SafeAreaView keeps everything away from the status bar and navigation bar
    <SafeAreaView style={styles.safeArea}>
      {/* ScrollView lets small phones scroll if the content is too tall */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Memory Match</Text>
        <Text style={styles.subtitle}>Find all the matching pairs!</Text>

        {/* Stats: moves and time side by side */}
        <View style={styles.statsRow}>
          <Text style={styles.statText}>Moves: {moves}</Text>
          <Text style={styles.statText}>⏱️ {formatTime(seconds)}</Text>
        </View>

        {/* Best score saved on the phone */}
        <Text style={styles.bestText}>
          🏆 Best:{" "}
          {bestScore
            ? `${bestScore.moves} moves · ${formatTime(bestScore.seconds)}`
            : "none yet"}
        </Text>

        <View style={styles.grid}>
          {cards.map((card) => (
            <MemoryCard
              key={card.id}
              card={card}
              onPress={() => handlePress(card.id)}
            />
          ))}
        </View>

        {/* Win message: only shows when all cards are matched */}
        {hasWon && (
          <Text style={styles.winText}>
            🎉 Congratulations! You won in {moves} moves and{" "}
            {formatTime(seconds)}!
          </Text>
        )}

        {/* Extra line when this game beat the best score */}
        {hasWon && isNewBest && (
          <Text style={styles.newBestText}>🏆 New best score!</Text>
        )}

        {/* Restart button: disabled during the wait, so the timer can't mess up a new game */}
        <GameButton
          label={hasWon ? "🔄 Play Again" : "🔄 Restart"}
          onPress={restartGame}
          disabled={isChecking}
        />

        {/* Home button: goes back to the home screen */}
        <GameButton
          label="🏠 Home"
          onPress={() => router.back()}
          variant="secondary"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },
  container: {
    flexGrow: 1,
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
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 294, // same width as the grid, so it lines up
    marginBottom: 8,
  },
  statText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#003893",
  },
  bestText: {
    fontSize: 15,
    color: "#8A6D00",
    fontWeight: "600",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    width: 294, // 3 cards (90 each) + 2 gaps (12 each)
  },
  winText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 24,
    textAlign: "center",
  },
  newBestText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8A6D00",
    marginTop: 8,
  },
});
