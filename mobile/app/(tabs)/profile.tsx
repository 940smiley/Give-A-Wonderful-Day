import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Alert, Linking, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useState } from "react";

import { SectionTitle } from "@/components/wonder-ui";
import { ScreenContainer } from "@/components/screen-container";
import { haptic } from "@/lib/haptics";
import { useWonders } from "@/lib/wonder-store";

export default function ProfileScreen() {
  const { resetDemo, wonders } = useWonders();
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  function toggleReminders(value: boolean) {
    haptic.light();
    setRemindersEnabled(value);
  }

  function confirmReset() {
    const reset = () => { haptic.medium(); void resetDemo(); };
    if (Platform.OS === "web") { reset(); return; }
    Alert.alert("Reset the demo?", "This removes your locally saved demo moments and restores the sample state.", [{ text: "Cancel", style: "cancel" }, { text: "Reset", style: "destructive", onPress: reset }]);
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}><MaterialIcons name="wb-sunny" size={28} color="#A66313" /></View>
          <View><Text style={styles.kicker}>Your space</Text><Text style={styles.title}>A quiet place for good.</Text></View>
        </View>
        <Text style={styles.subtitle}>You have {wonders.length} local kindness moments in this demo.</Text>

        <SectionTitle eyebrow="Demo preferences" title="Keep it gentle" />
        <View style={styles.group}>
          <View style={styles.row}><View style={styles.rowIcon}><MaterialIcons name="notifications-none" size={21} color="#4C8FB6" /></View><View style={styles.rowCopy}><Text style={styles.rowTitle}>Gentle reminder</Text><Text style={styles.rowBody}>A preference only—no notification is scheduled in this demo.</Text></View><Switch value={remindersEnabled} onValueChange={toggleReminders} trackColor={{ false: "#DCD2C1", true: "#B8DCCB" }} thumbColor={remindersEnabled ? "#3F8A6B" : "#FFFDF8"} /></View>
          <View style={styles.divider} />
          <View style={styles.row}><View style={styles.rowIcon}><MaterialIcons name="devices" size={21} color="#3F8A6B" /></View><View style={styles.rowCopy}><Text style={styles.rowTitle}>Local-first demo</Text><Text style={styles.rowBody}>Your records remain on this device unless you reset them.</Text></View></View>
        </View>

        <SectionTitle eyebrow="About" title="Project materials" />
        <View style={styles.group}>
          <LinkRow icon="description" label="Launch and roadmap" onPress={() => void Linking.openURL("https://github.com/940smiley/Give-A-Wonderful-Day/blob/main/docs/LAUNCH_PLAN.md")} />
          <View style={styles.divider} />
          <LinkRow icon="handshake" label="Funding and partnership brief" onPress={() => void Linking.openURL("https://github.com/940smiley/Give-A-Wonderful-Day/blob/main/docs/FUNDING_AND_PARTNERSHIP_BRIEF.md")} />
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel="Reset demo" onPress={confirmReset} style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}><MaterialIcons name="restart-alt" size={19} color="#B24F3A" /><Text style={styles.resetText}>Reset demo moments</Text></Pressable>
        <Text style={styles.footer}>Give A Wonderful Day is a product demo. It does not process donations, store wallet credentials, or provide tax or investment services.</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

function LinkRow({ icon, label, onPress }: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; label: string; onPress: () => void }) {
  return <Pressable accessibilityRole="link" onPress={onPress} style={({ pressed }) => [styles.linkRow, pressed && styles.pressed]}><View style={styles.rowIcon}><MaterialIcons name={icon} size={21} color="#A66313" /></View><Text style={styles.linkLabel}>{label}</Text><MaterialIcons name="open-in-new" size={18} color="#887D6A" /></Pressable>;
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 30 },
  profileHeader: { alignItems: "center", flexDirection: "row", gap: 13 },
  avatar: { alignItems: "center", backgroundColor: "#FFF0C4", borderRadius: 22, height: 58, justifyContent: "center", width: 58 },
  kicker: { color: "#7A6E5A", fontSize: 11, fontWeight: "800", letterSpacing: 0.7, textTransform: "uppercase" },
  title: { color: "#1F2A33", fontSize: 24, fontWeight: "800", letterSpacing: -0.6, marginTop: 4 },
  subtitle: { color: "#6F6557", fontSize: 14, lineHeight: 20, marginBottom: 26, marginTop: 14 },
  group: { backgroundColor: "#FFFDF8", borderColor: "#E9DFCC", borderRadius: 20, borderWidth: 1, marginBottom: 27, overflow: "hidden" },
  row: { alignItems: "center", flexDirection: "row", gap: 11, minHeight: 76, paddingHorizontal: 14, paddingVertical: 12 },
  rowIcon: { alignItems: "center", backgroundColor: "#F8F0E2", borderRadius: 13, height: 37, justifyContent: "center", width: 37 },
  rowCopy: { flex: 1 },
  rowTitle: { color: "#1F2A33", fontSize: 14, fontWeight: "800" },
  rowBody: { color: "#746B5E", fontSize: 11, lineHeight: 16, marginTop: 3 },
  divider: { backgroundColor: "#E9DFCC", height: 1, marginLeft: 62 },
  linkRow: { alignItems: "center", flexDirection: "row", gap: 11, minHeight: 63, paddingHorizontal: 14 },
  linkLabel: { color: "#1F2A33", flex: 1, fontSize: 14, fontWeight: "700" },
  resetButton: { alignItems: "center", backgroundColor: "#FCE7DE", borderRadius: 16, flexDirection: "row", gap: 8, justifyContent: "center", minHeight: 50 },
  resetText: { color: "#B24F3A", fontSize: 14, fontWeight: "800" },
  footer: { color: "#887D6A", fontSize: 12, lineHeight: 17, marginHorizontal: 7, marginTop: 16, textAlign: "center" },
  pressed: { opacity: 0.7 },
});
