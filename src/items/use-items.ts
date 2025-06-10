import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "random-choice-items";

const getInitialItems = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to parse localStorage items:", e);
    return [];
  }
};

export function useItems() {
  const [items, setItems] = useState<string[]>(getInitialItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: string) => {
    const trimmed = item.trim();
    if (trimmed) {
      setItems([...items, trimmed]);
    }
  };

  const removeItem = useCallback(
    (index: number) => {
      setItems((prev) => prev.filter((_, i) => i !== index));
    },
    [setItems]
  );

  const editItem = (index: number) => {
    return (newValue: string) => {
      const trimmed = newValue.trim();
      if (!trimmed) return;
      setItems((prev) => prev.map((item, i) => (i === index ? trimmed : item)));
    };
  };

  return {
    items,
    addItem,
    removeItem,
    editItem,
  };
}
