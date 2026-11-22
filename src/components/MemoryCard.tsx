import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
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
        card.isFlipped && {
          backgroundColor: card.color,
          borderColor: "#FFFFFF",
        },
        card.isMatched && styles.cardMatched,
      ]}
      onPress={onPress}
    >
      {card.isFlipped ? (
        // Front: a big white icon on the card's own colour
        <MaterialCommunityIcons name={card.icon} size={52} color="#FFFFFF" />
      ) : (
        // Back: a gold star inside an inner border, like a real playing card
        <View style={styles.cardBackInner}>
          <MaterialCommunityIcons
            name="star-four-points"
            size={34}
            color="#F5C542"
          />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 110,
    backgroundColor: "#1E2A78", // navy back
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#F5C542", // gold border
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  cardMatched: {
    borderColor: "#00E676", // bright green border
    opacity: 0.6, // faded, so you can see which pairs are done
  },
  cardBackInner: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#F5C542",
    alignItems: "center",
    justifyContent: "center",
  },
});
