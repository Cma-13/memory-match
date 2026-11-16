import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nepali Memory Match</Text>
      <Text style={styles.subtitle}>Find all the matching pairs!</Text>

      {/* The "bench": holds both cards side by side */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>🥟</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>🐃</Text>
        </View>
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
