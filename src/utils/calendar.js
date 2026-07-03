const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getWeekdays() {
  return WEEKDAYS;
}

// Returns array of { date: Date, isCurrentMonth: bool } for a full calendar grid
export function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const startDow = firstDay.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  // Previous month overflow
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startDow - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthDays - i),
      isCurrentMonth: false,
    });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: new Date(year, month, d),
      isCurrentMonth: true,
    });
  }

  // Next month overflow — fill to complete last row
  const remainder = days.length % 7;
  if (remainder > 0) {
    const needed = 7 - remainder;
    for (let d = 1; d <= needed; d++) {
      days.push({
        date: new Date(year, month + 1, d),
        isCurrentMonth: false,
      });
    }
  }

  return days;
}

export function formatMonthYear(year, month) {
  const date = new Date(year, month, 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}
