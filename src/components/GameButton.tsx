import { Pressable, StyleSheet, Text } from "react-native";

// What this button needs to be given (its props)
type GameButtonProps = {
  label: string; // the text on the button
  onPress: () => void; // what happens when tapped
  disabled?: boolean; // optional: true = faded and not tappable
  variant?: "primary" | "secondary"; // optional: primary = red filled, secondary = outline
};

// A reusable button used across the game
export default function GameButton({
  label,
  onPress,
  disabled = false,
  variant = "primary",
}: GameButtonProps) {
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      style={[
        styles.button,
        isSecondary && styles.buttonSecondary,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[styles.buttonText, isSecondary && styles.buttonTextSecondary]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    backgroundColor: "#DC143C",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    minWidth: 200,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#003893",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextSecondary: {
    color: "#003893",
  },
});
