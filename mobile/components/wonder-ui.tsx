import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PrimaryButtonProps = {
  label: string;
  icon?: React.ComponentProps<typeof MaterialIcons>["name"];
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ label, icon, onPress, disabled }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.primaryButton, (pressed || disabled) && styles.pressed, disabled && styles.disabled]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
      {icon ? <MaterialIcons name={icon} size={20} color="#1F2A33" /> : null}
    </Pressable>
  );
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <View style={styles.sectionHeading}>
      <View>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {action}
    </View>
  );
}

export function Pill({ label, color = "#FFF0C4", textColor = "#66501C" }: { label: string; color?: string; textColor?: string }) {
  return (
    <View style={[styles.pill, { backgroundColor: color }]}>
      <Text style={[styles.pillText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#F6C453",
    borderRadius: 18,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: 20,
  },
  primaryButtonText: { color: "#1F2A33", fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  disabled: { backgroundColor: "#E6DECD" },
  sectionHeading: { alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  eyebrow: { color: "#7A6E5A", fontSize: 11, fontWeight: "800", letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" },
  sectionTitle: { color: "#1F2A33", fontSize: 21, fontWeight: "800", letterSpacing: -0.3 },
  pill: { alignSelf: "flex-start", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  pillText: { fontSize: 12, fontWeight: "800" },
});
