import { useState, useEffect } from 'react';
import styles from './Filters.module.css';

const STORAGE_KEY = 'heatmap-calendar-filters';

const STATUSES = [
  { value: 'all', label: 'All Statuses' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'checked_in', label: 'Checked In' },
  { value: 'checked_out', label: 'Checked Out' },
  { value: 'cancelled', label: 'Cancelled' },
];

const ROOM_TYPES = [
  { value: 'all', label: 'All Room Types' },
  { value: 'Standard', label: 'Standard' },
  { value: 'Deluxe', label: 'Deluxe' },
  { value: 'Suite', label: 'Suite' },
  { value: 'Penthouse', label: 'Penthouse' },
];

function loadSavedFilters() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return { status: 'all', roomType: 'all' };
}

export default function Filters({ onChange }) {
  const [filters, setFilters] = useState(loadSavedFilters);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch {
      // ignore
    }
    onChange(filters);
  }, [filters, onChange]);

  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleRoomTypeChange = (e) => {
    setFilters((prev) => ({ ...prev, roomType: e.target.value }));
  };

  return (
    <div className={styles.filters}>
      <select
        value={filters.status}
        onChange={handleStatusChange}
        className={styles.select}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <select
        value={filters.roomType}
        onChange={handleRoomTypeChange}
        className={styles.select}
      >
        {ROOM_TYPES.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
}
