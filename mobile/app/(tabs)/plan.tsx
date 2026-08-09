import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Pill, SectionTitle } from "@/components/wonder-ui";
import { ScreenContainer } from "@/components/screen-container";

const phases = [
  { stage: "Now", title: "Demo readiness", body: "Test a local-first kindness experience with clear labels and no wallet, payments, tokens, or live chain activity.", color: "#D96849", status: "In progress" },
  { stage: "Next", title: "Design-partner pilot", body: "Partner with a small, mission-aligned cohort to validate participant value, safeguards, and responsible measurement.", color: "#A66313", status: "Planned" },
  { stage: "Then", title: "Operational launch", body: "Establish governance, compliant fundraising, privacy controls, and repeatable program operations before scaling.", color: "#3F8A6B", status: "Gated" },
  { stage: "Later", title: "Web3 utility assessment", body: "Only evaluate decentralized provenance if it produces a clear mission benefit that conventional tools cannot safely provide.", color: "#4C8FB6", status: "Research" },
];

export default function PlanScreen() {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>A measured path forward</Text>
        <Text style={styles.title}>Build trust before scale.</Text>
        <Text style={styles.subtitle}>The product roadmap puts care, clarity, and proof of usefulness ahead of technical novelty.</Text>

        <View style={styles.principleCard}>
          <MaterialIcons name="verified-user" size={23} color="#3F8A6B" />
          <View style={styles.principleCopy}><Text style={styles.principleTitle}>A deliberate boundary</Text><Text style={styles.principleText}>No public fundraising, tax-deductibility claims, tokens, or custody features should launch before the required organizational and security controls are in place.</Text></View>
        </View>

        <SectionTitle eyebrow="Roadmap" title="One responsible step at a time" />
        <View style={styles.timeline}>
          {phases.map((phase, index) => (
            <View key={phase.stage} style={styles.phaseRow}>
              <View style={styles.rail}><View style={[styles.phaseDot, { borderColor: phase.color }]}><View style={[styles.phaseDotInner, { backgroundColor: phase.color }]} /></View>{index < phases.length - 1 ? <View style={styles.line} /> : null}</View>
              <View style={styles.phaseCard}><View style={styles.phaseHeader}><Text style={[styles.stage, { color: phase.color }]}>{phase.stage}</Text><Pill label={phase.status} color={`${phase.color}18`} textColor={phase.color} /></View><Text style={styles.phaseTitle}>{phase.title}</Text><Text style={styles.phaseBody}>{phase.body}</Text></View>
            </View>
          ))}
        </View>

        <View style={styles.fundingCard}>
          <Text style={styles.fundingEyebrow}>Funding posture</Text>
          <Text style={styles.fundingTitle}>Partnership and philanthropy first.</Text>
          <Text style={styles.fundingText}>The initial plan is to fund learning, safeguards, and mission delivery through aligned partners—not speculative token economics.</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 30 },
  kicker: { color: "#A66313", fontSize: 12, fontWeight: "800", letterSpacing: 0.7, textTransform: "uppercase" },
  title: { color: "#1F2A33", fontSize: 29, fontWeight: "800", letterSpacing: -0.8, marginTop: 5 },
  subtitle: { color: "#6F6557", fontSize: 14, lineHeight: 20, marginTop: 9 },
  principleCard: { alignItems: "flex-start", backgroundColor: "#E8F3EC", borderRadius: 20, flexDirection: "row", gap: 12, marginBottom: 28, marginTop: 22, padding: 17 },
  principleCopy: { flex: 1 },
  principleTitle: { color: "#315A46", fontSize: 14, fontWeight: "800" },
  principleText: { color: "#4E6C5C", fontSize: 12, lineHeight: 18, marginTop: 4 },
  timeline: { marginTop: 2 },
  phaseRow: { flexDirection: "row", minHeight: 132 },
  rail: { alignItems: "center", width: 36 },
  phaseDot: { alignItems: "center", backgroundColor: "#FFF9EF", borderRadius: 12, borderWidth: 2, height: 24, justifyContent: "center", width: 24 },
  phaseDotInner: { borderRadius: 5, height: 10, width: 10 },
  line: { backgroundColor: "#E4DACA", flex: 1, marginBottom: -4, marginTop: 3, width: 2 },
  phaseCard: { backgroundColor: "#FFFDF8", borderColor: "#E9DFCC", borderRadius: 18, borderWidth: 1, flex: 1, marginBottom: 16, padding: 15 },
  phaseHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  stage: { fontSize: 11, fontWeight: "800", letterSpacing: 0.6, textTransform: "uppercase" },
  phaseTitle: { color: "#1F2A33", fontSize: 16, fontWeight: "800", marginTop: 10 },
  phaseBody: { color: "#655E53", fontSize: 13, lineHeight: 18, marginTop: 5 },
  fundingCard: { backgroundColor: "#F4C555", borderRadius: 22, marginTop: 4, padding: 19 },
  fundingEyebrow: { color: "#6D5014", fontSize: 11, fontWeight: "800", letterSpacing: 0.7, textTransform: "uppercase" },
  fundingTitle: { color: "#1F2A33", fontSize: 20, fontWeight: "800", letterSpacing: -0.4, marginTop: 5 },
  fundingText: { color: "#5E471A", fontSize: 13, lineHeight: 18, marginTop: 7 },
});
