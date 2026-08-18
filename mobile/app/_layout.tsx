import "../global.css";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@/lib/theme-provider";
import { WonderProvider } from "@/lib/wonder-store";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <WonderProvider>
            <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="create" options={{ presentation: "card" }} />
              <Stack.Screen name="receipt" options={{ presentation: "modal" }} />
            </Stack>
          </WonderProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
