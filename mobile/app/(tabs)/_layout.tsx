import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 10 : Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#D96849",
        tabBarInactiveTintColor: "#7A6E5A",
        tabBarButton: HapticTab,
        tabBarLabelStyle: { fontSize: 10, fontWeight: "700", marginTop: 2 },
        tabBarStyle: {
          backgroundColor: "#FFFDF8",
          borderTopColor: "#E9DFCC",
          borderTopWidth: 1,
          height: 58 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 7,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Today", tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={23} color={color} /> }} />
      <Tabs.Screen name="impact" options={{ title: "Impact", tabBarIcon: ({ color }) => <IconSymbol name="chart.bar.fill" size={23} color={color} /> }} />
      <Tabs.Screen name="plan" options={{ title: "Plan", tabBarIcon: ({ color }) => <IconSymbol name="map.fill" size={23} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "You", tabBarIcon: ({ color }) => <IconSymbol name="person.crop.circle" size={24} color={color} /> }} />
    </Tabs>
  );
}
