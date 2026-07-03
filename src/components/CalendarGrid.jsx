import { getCalendarDays, getWeekdays, toDateKey, isSameDay } from '../utils/calendar';
import DayCell from './DayCell';
import styles from './CalendarGrid.module.css';

export default function CalendarGrid({
  year,
  month,
  occupancyMap,
  activeStart,
  activeEnd,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const days = getCalendarDays(year, month);
  const weekdays = getWeekdays();

  function isInRange(date) {
    if (!activeStart || !activeEnd) return false;
    return date >= activeStart && date <= activeEnd;
  }

  function isSelected(date) {
    if (!activeStart || !activeEnd) return false;
    // Single-day selection: both start and end are the same day
    if (isSameDay(activeStart, activeEnd)) {
      return isSameDay(date, activeStart);
    }
    return false;
  }

  return (
    <div onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
      <div className={styles.weekdays}>
        {weekdays.map((wd) => (
          <div key={wd} className={styles.weekday}>
            {wd}
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        {days.map((day) => {
          const key = toDateKey(day.date);
          return (
            <DayCell
              key={key}
              date={day.date}
              isCurrentMonth={day.isCurrentMonth}
              occupancyCount={occupancyMap.get(key) || 0}
              isSelected={isSelected(day.date)}
              isInSelectionRange={isInRange(day.date)}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
            />
          );
        })}
      </div>
    </div>
  );
}
