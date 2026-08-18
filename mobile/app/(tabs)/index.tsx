import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Pill, PrimaryButton, SectionTitle } from "@/components/wonder-ui";
import { ScreenContainer } from "@/components/screen-container";
import { haptic } from "@/lib/haptics";
import { categoryMeta, formatWonderDate } from "@/lib/wonder-utils";
import { useWonders } from "@/lib/wonder-store";

export default function TodayScreen() {
  const router = useRouter();
  const { wonders, hydrated } = useWonders();
  const recentWonders = wonders.slice(0, 3);

  function openComposer() {
    haptic.light();
    router.push("/create");
  }

  return (
    <ScreenContainer containerClassName="bg-background" safeAreaClassName="bg-background">
      <FlatList
        data={recentWonders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.topline}>
              <View>
                <Text style={styles.kicker}>Give A Wonderful Day</Text>
                <Text style={styles.greeting}>Make room for good.</Text>
              </View>
              <View style={styles.sunMark} accessibilityLabel="Sunrise symbol">
                <MaterialIcons name="wb-sunny" size={23} color="#A66313" />
              </View>
            </View>

            <View style={styles.hero}>
              <View style={styles.heroGlowOne} />
              <View style={styles.heroGlowTwo} />
              <Pill label="Today’s gentle prompt" color="#FFF3CD" textColor="#725412" />
              <Text style={styles.heroTitle}>Send someone a small reason to feel seen.</Text>
              <Text style={styles.heroBody}>A few thoughtful words can change the texture of a day.</Text>
              <PrimaryButton label="Send a wonder" icon="arrow-forward" onPress={openComposer} />
            </View>

            <View style={styles.statRow}>
              <View style={[styles.statCard, styles.statCardWarm]}>
                <MaterialIcons name="favorite" size={20} color="#D96849" />
                <Text style={styles.statValue}>{wonders.length}</Text>
                <Text style={styles.statLabel}>kindness moments</Text>
              </View>
              <View style={[styles.statCard, styles.statCardCool]}>
                <MaterialIcons name="verified" size={20} color="#3F8A6B" />
                <Text style={styles.statValue}>Local</Text>
                <Text style={styles.statLabel}>demo record only</Text>
              </View>
            </View>

            <SectionTitle eyebrow="Your recent moments" title="A little good, held close" />
            {!hydrated ? <Text style={styles.loadingText}>Opening your local demo record…</Text> : null}
          </>
        }
        renderItem={({ item }) => {
          const meta = categoryMeta[item.category];
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`View ${item.category} wonder for ${item.recipient}`}
              onPress={() => router.push({ pathname: "/receipt", params: { id: item.id } })}
              style={({ pressed }) => [styles.wonderCard, pressed && styles.cardPressed]}
            >
              <View style={[styles.categoryIcon, { backgroundColor: `${meta.color}22` }]}>
                <MaterialIcons name={meta.icon as React.ComponentProps<typeof MaterialIcons>["name"]} size={20} color={meta.color} />
              </View>
              <View style={styles.wonderBody}>
                <View style={styles.wonderTopline}>
                  <Text style={styles.recipient}>{item.recipient}</Text>
                  <Text style={styles.date}>{formatWonderDate(item.createdAt)}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                <Text style={[styles.categoryLabel, { color: meta.color }]}>{item.category}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#AA9D86" />
            </Pressable>
          );
        }}
        ListFooterComponent={<Text style={styles.demoNote}>Your moments stay on this device in demo mode. No wallet, payment, or live ledger is connected.</Text>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 30 },
  topline: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  kicker: { color: "#7A6E5A", fontSize: 12, fontWeight: "800", letterSpacing: 0.7, textTransform: "uppercase" },
  greeting: { color: "#1F2A33", fontSize: 28, fontWeight: "800", letterSpacing: -0.8, marginTop: 4 },
  sunMark: { alignItems: "center", backgroundColor: "#FFF1C5", borderRadius: 18, height: 46, justifyContent: "center", width: 46 },
  hero: { backgroundColor: "#F4C555", borderRadius: 28, gap: 12, marginBottom: 16, overflow: "hidden", padding: 22 },
  heroGlowOne: { backgroundColor: "#FFD977", borderRadius: 999, height: 135, opacity: 0.45, position: "absolute", right: -44, top: -52, width: 135 },
  heroGlowTwo: { backgroundColor: "#E8795C", borderRadius: 999, bottom: -82, height: 155, opacity: 0.18, position: "absolute", right: 34, width: 155 },
  heroTitle: { color: "#1F2A33", fontSize: 27, fontWeight: "800", letterSpacing: -0.8, lineHeight: 32, maxWidth: "94%" },
  heroBody: { color: "#58411C", fontSize: 15, lineHeight: 21, maxWidth: "88%" },
  statRow: { flexDirection: "row", gap: 12, marginBottom: 26 },
  statCard: { borderRadius: 20, flex: 1, gap: 4, minHeight: 122, padding: 16 },
  statCardWarm: { backgroundColor: "#FCE7DE" },
  statCardCool: { backgroundColor: "#E8F3EC" },
  statValue: { color: "#1F2A33", fontSize: 22, fontWeight: "800", marginTop: 4 },
  statLabel: { color: "#665F53", fontSize: 12, lineHeight: 16 },
  loadingText: { color: "#7A6E5A", fontSize: 14, marginBottom: 12 },
  wonderCard: { alignItems: "center", backgroundColor: "#FFFDF8", borderColor: "#E9DFCC", borderRadius: 20, borderWidth: 1, flexDirection: "row", marginBottom: 10, minHeight: 104, padding: 14 },
  cardPressed: { opacity: 0.72 },
  categoryIcon: { alignItems: "center", borderRadius: 16, height: 42, justifyContent: "center", marginRight: 12, width: 42 },
  wonderBody: { flex: 1 },
  wonderTopline: { alignItems: "baseline", flexDirection: "row", justifyContent: "space-between" },
  recipient: { color: "#1F2A33", fontSize: 15, fontWeight: "800", marginRight: 10 },
  date: { color: "#887D6A", fontSize: 12 },
  message: { color: "#5E574D", fontSize: 13, lineHeight: 18, marginTop: 4 },
  categoryLabel: { fontSize: 12, fontWeight: "800", marginTop: 6 },
  demoNote: { color: "#887D6A", fontSize: 12, lineHeight: 17, marginTop: 16, textAlign: "center" },
});
