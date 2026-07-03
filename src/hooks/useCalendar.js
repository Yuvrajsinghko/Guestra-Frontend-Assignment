import { useState, useCallback } from 'react';

const STORAGE_KEY = 'heatmap-calendar-view';

function loadSavedMonth() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { year, month } = JSON.parse(saved);
      if (typeof year === 'number' && typeof month === 'number') {
        return { year, month };
      }
    }
  } catch {
    // ignore
  }
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}

export function useCalendar() {
  const [view, setView] = useState(loadSavedMonth);

  const setAndSave = useCallback((updater) => {
    setView((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const goToPrevMonth = useCallback(() => {
    setAndSave((prev) => {
      const m = prev.month === 0 ? 11 : prev.month - 1;
      const y = prev.month === 0 ? prev.year - 1 : prev.year;
      return { year: y, month: m };
    });
  }, [setAndSave]);

  const goToNextMonth = useCallback(() => {
    setAndSave((prev) => {
      const m = prev.month === 11 ? 0 : prev.month + 1;
      const y = prev.month === 11 ? prev.year + 1 : prev.year;
      return { year: y, month: m };
    });
  }, [setAndSave]);

  const goToToday = useCallback(() => {
    const now = new Date();
    setAndSave({ year: now.getFullYear(), month: now.getMonth() });
  }, [setAndSave]);

  return {
    year: view.year,
    month: view.month,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  };
}
