import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "random-choice-items";

const DEFAULT_TITLE = "New Chest";

const getInitialItems = (): LootBox => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return { title: DEFAULT_TITLE, items: [] };
  }

  try {
    const parsed = JSON.parse(stored);
    return parsed as LootBox;
  } catch (e) {
    console.error("Failed to parse localStorage items:", e);
    return { title: DEFAULT_TITLE, items: [] };
  }
};

export type LootBox = {
  title: string;
  items: string[];
};

export function useItems() {
  const initial = getInitialItems();
  const [items, setItems] = useState<string[]>(initial.items);
  const [title, setTitle] = useState<string>(initial.title);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ title, items }));
  }, [title, items]);

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

  const isEmpty = items.length < 1;

  return {
    items,
    setItems,
    addItem,
    removeItem,
    editItem,
    isEmpty,
    title,
    setTitle,
  };
}
