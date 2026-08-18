export type ImpactCategory = "Encouragement" | "Connection" | "Care" | "Celebration";

export type Wonder = {
  id: string;
  recipient: string;
  message: string;
  category: ImpactCategory;
  createdAt: string;
  ledgerId: string;
};

export const categoryMeta: Record<ImpactCategory, { color: string; icon: string }> = {
  Encouragement: { color: "#EF7A5A", icon: "favorite" },
  Connection: { color: "#4C8FB6", icon: "people" },
  Care: { color: "#3F8A6B", icon: "spa" },
  Celebration: { color: "#B074C4", icon: "celebration" },
};

export const seedWonders: Wonder[] = [
  {
    id: "seed-1",
    recipient: "A neighbor",
    message: "Thinking of you today. Your presence makes this block warmer.",
    category: "Connection",
    createdAt: "2026-08-08T15:20:00.000Z",
    ledgerId: "DEMO-6FD2-A81C",
  },
  {
    id: "seed-2",
    recipient: "A care team",
    message: "Thank you for showing up with patience and care.",
    category: "Care",
    createdAt: "2026-08-06T11:15:00.000Z",
    ledgerId: "DEMO-512E-C09B",
  },
  {
    id: "seed-3",
    recipient: "A friend",
    message: "I am cheering for the brave next step you are taking.",
    category: "Encouragement",
    createdAt: "2026-08-04T17:05:00.000Z",
    ledgerId: "DEMO-990A-4F1D",
  },
];

export function createDemoWonder(input: Omit<Wonder, "id" | "createdAt" | "ledgerId">, now = new Date()): Wonder {
  const stamp = now.getTime().toString(36).toUpperCase();
  const suffix = `${now.getMilliseconds()}`.padStart(3, "0");
  return {
    ...input,
    id: `wonder-${stamp}-${suffix}`,
    createdAt: now.toISOString(),
    ledgerId: `DEMO-${stamp.slice(-4)}-${suffix}`,
  };
}

export function formatWonderDate(value: string): string {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

export function countByCategory(wonders: Wonder[], category: ImpactCategory): number {
  return wonders.filter((wonder) => wonder.category === category).length;
}
