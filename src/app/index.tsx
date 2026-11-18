import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  // Memory: is the momo card flipped? Starts as false (face-down)
  const [isFlipped, setIsFlipped] = useState(false);
  const [isYakFlipped, setIsYakFlipped] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nepali Memory Match</Text>
      <Text style={styles.subtitle}>Find all the matching pairs!</Text>

      <View style={styles.row}>
    
        <Pressable style={styles.card} onPress={() => setIsFlipped(!isFlipped)}>
          <Text style={styles.cardEmoji}>{isFlipped ? "🥟" : "❓"}</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => setIsYakFlipped(!isYakFlipped)}
        >
          <Text style={styles.cardEmoji}>{isYakFlipped ? "🐃" : "❓"}</Text>
        </Pressable>
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
  row: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    width: 100,
    height: 130,
    backgroundColor: "#003893",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmoji: {
    fontSize: 48,
  },
});
