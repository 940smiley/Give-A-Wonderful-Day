import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Pill, SectionTitle } from "@/components/wonder-ui";
import { ScreenContainer } from "@/components/screen-container";
import { ImpactCategory, categoryMeta, countByCategory, formatWonderDate } from "@/lib/wonder-utils";
import { useWonders } from "@/lib/wonder-store";

const categories = Object.keys(categoryMeta) as ImpactCategory[];

export default function ImpactScreen() {
  const { wonders } = useWonders();
  const categoryCounts = categories.map((category) => ({ category, count: countByCategory(wonders, category) }));
  const highCount = Math.max(...categoryCounts.map((item) => item.count), 1);

  return (
    <ScreenContainer>
      <FlatList
        data={wonders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.kicker}>Impact, without the hype</Text>
            <Text style={styles.title}>What you have made space for.</Text>
            <Text style={styles.subtitle}>These are local demo moments, not verified charitable outcomes or on-chain activity.</Text>
            <View style={styles.totalCard}>
              <View style={styles.totalIcon}><MaterialIcons name="favorite" size={25} color="#D96849" /></View>
              <View><Text style={styles.totalNumber}>{wonders.length}</Text><Text style={styles.totalLabel}>kindness moments recorded</Text></View>
              <Pill label="Demo" color="#FFF0C4" />
            </View>
            <SectionTitle eyebrow="By intention" title="The shape of your care" />
            <View style={styles.breakdown}>
              {categoryCounts.map(({ category, count }) => {
                const meta = categoryMeta[category];
                return (
                  <View key={category} style={styles.breakdownRow}>
                    <View style={styles.breakdownLabel}><MaterialIcons name={meta.icon as React.ComponentProps<typeof MaterialIcons>["name"]} size={18} color={meta.color} /><Text style={styles.categoryName}>{category}</Text></View>
                    <View style={styles.barArea}><View style={[styles.bar, { backgroundColor: meta.color, width: `${Math.max((count / highCount) * 100, 8)}%` }]} /></View>
                    <Text style={styles.count}>{count}</Text>
                  </View>
                );
              })}
            </View>
            <SectionTitle eyebrow="Timeline" title="Moments you have held" />
          </>
        }
        renderItem={({ item }) => {
          const meta = categoryMeta[item.category];
          return (
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: meta.color }]} />
              <View style={styles.timelineCopy}><View style={styles.timelineTop}><Text style={styles.recipient}>{item.recipient}</Text><Text style={styles.date}>{formatWonderDate(item.createdAt)}</Text></View><Text style={styles.message} numberOfLines={2}>{item.message}</Text></View>
            </View>
          );
        }}
        ListFooterComponent={<View style={styles.footer}><MaterialIcons name="privacy-tip" size={18} color="#3F8A6B" /><Text style={styles.footerText}>A real pilot will measure participant and partner value with consent-led, privacy-preserving methods.</Text></View>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 28 },
  kicker: { color: "#A66313", fontSize: 12, fontWeight: "800", letterSpacing: 0.7, textTransform: "uppercase" },
  title: { color: "#1F2A33", fontSize: 29, fontWeight: "800", letterSpacing: -0.8, marginTop: 5 },
  subtitle: { color: "#6F6557", fontSize: 14, lineHeight: 20, marginBottom: 20, marginTop: 9 },
  totalCard: { alignItems: "center", backgroundColor: "#FCE7DE", borderRadius: 22, flexDirection: "row", gap: 12, justifyContent: "space-between", marginBottom: 26, padding: 17 },
  totalIcon: { alignItems: "center", backgroundColor: "#FFF7F2", borderRadius: 17, height: 45, justifyContent: "center", width: 45 },
  totalNumber: { color: "#1F2A33", fontSize: 25, fontWeight: "800" },
  totalLabel: { color: "#6F6557", fontSize: 12, marginTop: 1 },
  breakdown: { backgroundColor: "#FFFDF8", borderColor: "#E9DFCC", borderRadius: 20, borderWidth: 1, marginBottom: 27, padding: 16 },
  breakdownRow: { alignItems: "center", flexDirection: "row", gap: 9, marginBottom: 14 },
  breakdownLabel: { alignItems: "center", flexDirection: "row", gap: 6, width: 105 },
  categoryName: { color: "#514A40", fontSize: 12, fontWeight: "700" },
  barArea: { backgroundColor: "#F2EBDD", borderRadius: 99, flex: 1, height: 9, overflow: "hidden" },
  bar: { borderRadius: 99, height: 9 },
  count: { color: "#1F2A33", fontSize: 13, fontWeight: "800", textAlign: "right", width: 14 },
  timelineItem: { flexDirection: "row", gap: 12, minHeight: 79 },
  timelineDot: { borderRadius: 7, height: 14, marginTop: 5, width: 14 },
  timelineCopy: { borderBottomColor: "#E9DFCC", borderBottomWidth: 1, flex: 1, paddingBottom: 14 },
  timelineTop: { alignItems: "baseline", flexDirection: "row", justifyContent: "space-between" },
  recipient: { color: "#1F2A33", fontSize: 14, fontWeight: "800" },
  date: { color: "#887D6A", fontSize: 12 },
  message: { color: "#665F53", fontSize: 13, lineHeight: 18, marginTop: 4 },
  footer: { alignItems: "flex-start", backgroundColor: "#E8F3EC", borderRadius: 16, flexDirection: "row", gap: 9, marginTop: 18, padding: 14 },
  footerText: { color: "#4C6958", flex: 1, fontSize: 12, lineHeight: 17 },
});
