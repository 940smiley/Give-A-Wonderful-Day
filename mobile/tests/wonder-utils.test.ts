import { describe, expect, it } from "vitest";

import { countByCategory, createDemoWonder, seedWonders } from "../lib/wonder-utils";

describe("wonder utilities", () => {
  it("creates a stable simulated record without claiming a live chain transaction", () => {
    const wonder = createDemoWonder({ recipient: "A friend", message: "You matter.", category: "Encouragement" }, new Date("2026-08-09T12:00:00.123Z"));
    expect(wonder.id).toContain("wonder-");
    expect(wonder.ledgerId).toMatch(/^DEMO-/);
    expect(wonder.createdAt).toBe("2026-08-09T12:00:00.123Z");
  });

  it("counts categories from the local record", () => {
    expect(countByCategory(seedWonders, "Care")).toBe(1);
    expect(countByCategory(seedWonders, "Celebration")).toBe(0);
  });
});
