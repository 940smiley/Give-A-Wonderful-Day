import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { PrimaryButton, Pill } from "@/components/wonder-ui";
import { ScreenContainer } from "@/components/screen-container";
import { categoryMeta, formatWonderDate } from "@/lib/wonder-utils";
import { useWonders } from "@/lib/wonder-store";

export default function ReceiptScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const { findWonder } = useWonders();
  const wonder = params.id ? findWonder(params.id) : undefined;

  if (!wonder) {
    return (
      <ScreenContainer className="p-6" edges={["top", "bottom", "left", "right"]}>
        <View style={styles.empty}>
          <MaterialIcons name="sentiment-dissatisfied" size={34} color="#887D6A" />
          <Text style={styles.emptyTitle}>That record isn’t here.</Text>
          <Text style={styles.emptyBody}>It may have been reset on this device.</Text>
          <PrimaryButton label="Return home" onPress={() => router.replace("/")} />
        </View>
      </ScreenContainer>
    );
  }

  const meta = categoryMeta[wonder.category];
  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]}>
      <View style={styles.content}>
        <Pressable accessibilityLabel="Close receipt" accessibilityRole="button" onPress={() => router.replace("/")} style={({ pressed }) => [styles.close, pressed && styles.pressed]}>
          <MaterialIcons name="close" size={22} color="#1F2A33" />
        </Pressable>
        <View style={styles.celebration}>
          <View style={styles.sparkleOne}><MaterialIcons name="auto-awesome" size={20} color="#D96849" /></View>
          <View style={styles.sunCircle}><MaterialIcons name="wb-sunny" size={50} color="#A66313" /></View>
          <View style={styles.sparkleTwo}><MaterialIcons name="favorite" size={18} color="#D96849" /></View>
        </View>
        <Text style={styles.eyebrow}>A kindness moment is ready</Text>
        <Text style={styles.title}>You made a little more room for good.</Text>

        <View style={styles.receipt}>
          <View style={styles.receiptTop}>
            <Pill label={wonder.category} color={`${meta.color}20`} textColor={meta.color} />
            <Text style={styles.date}>{formatWonderDate(wonder.createdAt)}</Text>
          </View>
          <Text style={styles.forLabel}>FOR {wonder.recipient.toUpperCase()}</Text>
          <Text style={styles.message}>“{wonder.message}”</Text>
          <View style={styles.divider} />
          <View style={styles.ledgerRow}>
            <View style={[styles.ledgerIcon, { backgroundColor: `${meta.color}18` }]}><MaterialIcons name="verified" size={19} color={meta.color} /></View>
            <View style={styles.ledgerText}><Text style={styles.ledgerLabel}>Simulated demo record</Text><Text style={styles.ledgerId}>{wonder.ledgerId}</Text></View>
          </View>
        </View>

        <View style={styles.callout}>
          <MaterialIcons name="info-outline" size={18} color="#725412" />
          <Text style={styles.calloutText}>This is a local demo receipt. It is not a donation receipt, payment, NFT, or blockchain transaction.</Text>
        </View>
        <View style={styles.bottom}><PrimaryButton label="Back to today" icon="arrow-forward" onPress={() => router.replace("/")} /></View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: 20 },
  close: { alignItems: "center", backgroundColor: "#F8F0E2", borderRadius: 16, height: 44, justifyContent: "center", width: 44 },
  celebration: { alignItems: "center", height: 152, justifyContent: "center", position: "relative" },
  sunCircle: { alignItems: "center", backgroundColor: "#FFE9A4", borderRadius: 60, height: 112, justifyContent: "center", width: 112 },
  sparkleOne: { left: "21%", position: "absolute", top: 26 },
  sparkleTwo: { position: "absolute", right: "20%", top: 82 },
  eyebrow: { color: "#A66313", fontSize: 12, fontWeight: "800", letterSpacing: 0.7, textAlign: "center", textTransform: "uppercase" },
  title: { color: "#1F2A33", fontSize: 27, fontWeight: "800", letterSpacing: -0.7, lineHeight: 33, marginHorizontal: 12, marginTop: 8, textAlign: "center" },
  receipt: { backgroundColor: "#FFFDF8", borderColor: "#E9DFCC", borderRadius: 24, borderWidth: 1, marginTop: 25, padding: 20 },
  receiptTop: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  date: { color: "#887D6A", fontSize: 12 },
  forLabel: { color: "#887D6A", fontSize: 11, fontWeight: "800", letterSpacing: 0.6, marginTop: 23 },
  message: { color: "#1F2A33", fontSize: 19, fontWeight: "700", lineHeight: 27, marginTop: 8 },
  divider: { backgroundColor: "#E9DFCC", height: 1, marginVertical: 18 },
  ledgerRow: { alignItems: "center", flexDirection: "row", gap: 10 },
  ledgerIcon: { alignItems: "center", borderRadius: 14, height: 36, justifyContent: "center", width: 36 },
  ledgerText: { gap: 2 },
  ledgerLabel: { color: "#675F53", fontSize: 12, fontWeight: "700" },
  ledgerId: { color: "#1F2A33", fontFamily: "monospace", fontSize: 12, fontWeight: "700" },
  callout: { alignItems: "flex-start", backgroundColor: "#FFF3CD", borderRadius: 16, flexDirection: "row", gap: 9, marginTop: 14, padding: 13 },
  calloutText: { color: "#66501C", flex: 1, fontSize: 12, lineHeight: 17 },
  bottom: { marginTop: "auto", paddingTop: 18 },
  empty: { alignItems: "center", flex: 1, justifyContent: "center", padding: 24 },
  emptyTitle: { color: "#1F2A33", fontSize: 22, fontWeight: "800", marginTop: 12 },
  emptyBody: { color: "#6F6557", fontSize: 14, marginBottom: 24, marginTop: 5 },
  pressed: { opacity: 0.72 },
});
