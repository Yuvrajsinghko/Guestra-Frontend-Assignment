import { parseDate, toDateKey } from './calendar';

const TOTAL_ROOMS = 10;

// Build a Map<dateKey, occupancyCount> for every day in the visible month
// Only non-cancelled bookings count
export function buildOccupancyMap(bookings, year, month) {
  const map = new Map();

  // Initialize all days in the month to 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    map.set(toDateKey(date), 0);
  }

  // Count occupied rooms per night
  for (const booking of bookings) {
    if (booking.status === 'cancelled') continue;

    const checkIn = parseDate(booking.checkIn);
    const checkOut = parseDate(booking.checkOut);

    // Iterate each occupied night (checkIn inclusive, checkOut exclusive)
    const current = new Date(checkIn);
    while (current < checkOut) {
      const key = toDateKey(current);
      if (map.has(key)) {
        map.set(key, Math.min(map.get(key) + 1, TOTAL_ROOMS));
      }
      current.setDate(current.getDate() + 1);
    }
  }

  return map;
}

// Returns a CSS background color based on occupancy ratio
export function getHeatmapColor(count) {
  if (count === 0) return '#f0f0ec';
  const ratio = count / TOTAL_ROOMS;

  // 5-step warm scale: light cream -> amber -> orange -> deep orange -> red-orange
  if (ratio <= 0.2) return '#fef3c7';
  if (ratio <= 0.4) return '#fde68a';
  if (ratio <= 0.6) return '#fbbf24';
  if (ratio <= 0.8) return '#f59e0b';
  return '#d97706';
}

export function getOccupancyLabel(count) {
  return `${count}/${TOTAL_ROOMS}`;
}

export { TOTAL_ROOMS };
