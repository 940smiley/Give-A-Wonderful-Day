import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PrimaryButton } from "@/components/wonder-ui";
import { ScreenContainer } from "@/components/screen-container";
import { haptic } from "@/lib/haptics";
import { ImpactCategory, categoryMeta, createDemoWonder } from "@/lib/wonder-utils";
import { useWonders } from "@/lib/wonder-store";

const recipients = ["A friend", "A neighbor", "A care team", "Someone new"];
const prompts = [
  "I’m thinking of you today. You don’t have to carry everything alone.",
  "Thank you for the care you bring into the world.",
  "I’m cheering for the next small step in front of you.",
];
const categories = Object.keys(categoryMeta) as ImpactCategory[];

export default function CreateWonderScreen() {
  const router = useRouter();
  const { addWonder } = useWonders();
  const [recipient, setRecipient] = useState(recipients[0]);
  const [message, setMessage] = useState(prompts[0]);
  const [category, setCategory] = useState<ImpactCategory>("Encouragement");
  const canSubmit = useMemo(() => message.trim().length >= 8, [message]);

  async function recordWonder() {
    if (!canSubmit) return;
    haptic.success();
    const wonder = createDemoWonder({ recipient, message: message.trim(), category });
    await addWonder(wonder);
    router.replace({ pathname: "/receipt", params: { id: wonder.id } });
  }

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]}>
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.nav}>
            <Pressable accessibilityLabel="Close composer" accessibilityRole="button" onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
              <MaterialIcons name="arrow-back" size={22} color="#1F2A33" />
            </Pressable>
            <Text style={styles.step}>Create a wonder · 1 minute</Text>
          </View>

          <Text style={styles.title}>Put a little warmth into someone’s day.</Text>
          <Text style={styles.subtitle}>This creates a private demo record on your device. It does not send a payment or write to a blockchain.</Text>

          <Text style={styles.label}>Who is this for?</Text>
          <View style={styles.choiceGrid}>
            {recipients.map((item) => (
              <Pressable key={item} onPress={() => { haptic.light(); setRecipient(item); }} style={({ pressed }) => [styles.choice, recipient === item && styles.choiceSelected, pressed && styles.pressed]}>
                <Text style={[styles.choiceText, recipient === item && styles.choiceTextSelected]}>{item}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Start with a thought</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promptRow}>
            {prompts.map((prompt) => (
              <Pressable key={prompt} onPress={() => { haptic.light(); setMessage(prompt); }} style={({ pressed }) => [styles.promptCard, message === prompt && styles.promptSelected, pressed && styles.pressed]}>
                <Text style={styles.promptText} numberOfLines={3}>{prompt}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <TextInput
            accessibilityLabel="Kind message"
            multiline
            value={message}
            maxLength={240}
            onChangeText={setMessage}
            placeholder="Write a short, kind message…"
            placeholderTextColor="#9B8E7B"
            style={styles.messageInput}
            textAlignVertical="top"
          />
          <Text style={styles.count}>{message.length}/240</Text>

          <Text style={styles.label}>What kind of moment is this?</Text>
          <View style={styles.categoryRow}>
            {categories.map((item) => {
              const meta = categoryMeta[item];
              return (
                <Pressable key={item} onPress={() => { haptic.light(); setCategory(item); }} style={({ pressed }) => [styles.categoryChoice, category === item && { borderColor: meta.color, backgroundColor: `${meta.color}16` }, pressed && styles.pressed]}>
                  <MaterialIcons name={meta.icon as React.ComponentProps<typeof MaterialIcons>["name"]} size={19} color={meta.color} />
                  <Text style={styles.categoryText}>{item}</Text>
                </Pressable>
              );
            })}
          </View>

          <PrimaryButton label="Record demo wonder" icon="auto-awesome" onPress={() => void recordWonder()} disabled={!canSubmit} />
          <View style={styles.privacyNote}>
            <MaterialIcons name="lock-outline" size={17} color="#3F8A6B" />
            <Text style={styles.privacyText}>For the demo, your message is saved locally on this device only.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { padding: 20, paddingBottom: 28 },
  nav: { alignItems: "center", flexDirection: "row", gap: 12, marginBottom: 22 },
  backButton: { alignItems: "center", backgroundColor: "#F8F0E2", borderRadius: 16, height: 44, justifyContent: "center", width: 44 },
  step: { color: "#7A6E5A", fontSize: 13, fontWeight: "800" },
  title: { color: "#1F2A33", fontSize: 30, fontWeight: "800", letterSpacing: -0.8, lineHeight: 35 },
  subtitle: { color: "#6F6557", fontSize: 14, lineHeight: 20, marginBottom: 24, marginTop: 10 },
  label: { color: "#1F2A33", fontSize: 15, fontWeight: "800", marginBottom: 10, marginTop: 18 },
  choiceGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  choice: { backgroundColor: "#FFFDF8", borderColor: "#E9DFCC", borderRadius: 14, borderWidth: 1, minWidth: "46%", paddingHorizontal: 12, paddingVertical: 12 },
  choiceSelected: { backgroundColor: "#FFF0C4", borderColor: "#E3B23D" },
  choiceText: { color: "#5D564B", fontSize: 14, fontWeight: "700" },
  choiceTextSelected: { color: "#694F14" },
  promptRow: { gap: 10 },
  promptCard: { backgroundColor: "#FFFDF8", borderColor: "#E9DFCC", borderRadius: 16, borderWidth: 1, justifyContent: "center", minHeight: 86, padding: 13, width: 204 },
  promptSelected: { borderColor: "#E3B23D", borderWidth: 2 },
  promptText: { color: "#5D564B", fontSize: 13, lineHeight: 18 },
  messageInput: { backgroundColor: "#FFFDF8", borderColor: "#E9DFCC", borderRadius: 16, borderWidth: 1, color: "#1F2A33", fontSize: 15, lineHeight: 21, marginTop: 12, minHeight: 118, padding: 14 },
  count: { alignSelf: "flex-end", color: "#887D6A", fontSize: 11, marginTop: 5 },
  categoryRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 },
  categoryChoice: { alignItems: "center", backgroundColor: "#FFFDF8", borderColor: "#E9DFCC", borderRadius: 14, borderWidth: 1, flexDirection: "row", gap: 7, paddingHorizontal: 11, paddingVertical: 11 },
  categoryText: { color: "#4F483F", fontSize: 12, fontWeight: "800" },
  privacyNote: { alignItems: "center", flexDirection: "row", gap: 8, marginTop: 13, paddingHorizontal: 4 },
  privacyText: { color: "#6B786C", flex: 1, fontSize: 12, lineHeight: 17 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
