import { Stack } from "expo-router";

// The frame around all screens: a stack of screens with no top header bar
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // we draw our own titles, so hide the default header
        animation: "slide_from_right", // new screens slide in from the right
      }}
    />
  );
}
