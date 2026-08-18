import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";

import { Wonder, seedWonders } from "@/lib/wonder-utils";

const STORAGE_KEY = "give-a-wonderful-day.wonders.v1";

type WonderContextValue = {
  wonders: Wonder[];
  hydrated: boolean;
  addWonder: (wonder: Wonder) => Promise<void>;
  resetDemo: () => Promise<void>;
  findWonder: (id: string) => Wonder | undefined;
};

const WonderContext = createContext<WonderContextValue | null>(null);

export function WonderProvider({ children }: PropsWithChildren) {
  const [wonders, setWonders] = useState<Wonder[]>(seedWonders);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function loadWonders() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Wonder[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setWonders(parsed);
          }
        }
      } finally {
        setHydrated(true);
      }
    }
    void loadWonders();
  }, []);

  const value = useMemo<WonderContextValue>(() => ({
    wonders,
    hydrated,
    addWonder: async (wonder) => {
      const next = [wonder, ...wonders];
      setWonders(next);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    },
    resetDemo: async () => {
      setWonders(seedWonders);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seedWonders));
    },
    findWonder: (id) => wonders.find((wonder) => wonder.id === id),
  }), [hydrated, wonders]);

  return <WonderContext.Provider value={value}>{children}</WonderContext.Provider>;
}

export function useWonders() {
  const value = useContext(WonderContext);
  if (!value) {
    throw new Error("useWonders must be used inside WonderProvider");
  }
  return value;
}
