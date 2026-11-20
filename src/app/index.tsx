import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GameButton from "../components/GameButton";

// The first screen of the app
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.logo}>🃏</Text>
        <Text style={styles.title}>Memory Match</Text>
        <Text style={styles.subtitle}>Test your memory!</Text>

        {/* How to play */}
        <View style={styles.howToBox}>
          <Text style={styles.howToTitle}>How to play</Text>
          <Text style={styles.howToText}>1. Tap a card to flip it.</Text>
          <Text style={styles.howToText}>2. Flip two cards each turn.</Text>
          <Text style={styles.howToText}>3. Matching foods stay open.</Text>
          <Text style={styles.howToText}>
            4. Find all pairs in the fewest moves!
          </Text>
        </View>

        <GameButton
          label="▶️ Start Game"
          onPress={() => router.push("/game")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontSize: 72,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#DC143C",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555555",
    marginTop: 8,
    textAlign: "center",
    marginVertical: 20,
  },

  howToBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 320,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 16,
  },
  howToTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003893",
    marginBottom: 8,
  },
  howToText: {
    fontSize: 15,
    color: "#333333",
    marginTop: 4,
  },
});
