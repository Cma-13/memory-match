import { Pressable, StyleSheet, Text } from "react-native";

// What this button needs to be given (its props)
type GameButtonProps = {
  label: string; // the text on the button
  onPress: () => void; // what happens when tapped
  disabled?: boolean; // optional: true = faded and not tappable
};

// A reusable red, rounded button used across the game
export default function GameButton({
  label,
  onPress,
  disabled = false,
}: GameButtonProps) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    backgroundColor: "#DC143C",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
