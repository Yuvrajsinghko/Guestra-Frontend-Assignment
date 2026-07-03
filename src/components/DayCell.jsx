import { getHeatmapColor, getOccupancyLabel } from '../utils/occupancy';
import styles from './DayCell.module.css';

export default function DayCell({
  date,
  isCurrentMonth,
  occupancyCount,
  isSelected,
  isInSelectionRange,
  onMouseDown,
  onMouseEnter,
}) {
  const dayNumber = date.getDate();
  const bgColor = getHeatmapColor(occupancyCount);
  const label = getOccupancyLabel(occupancyCount);

  const classNames = [
    styles.cell,
    !isCurrentMonth ? styles.overflow : '',
    isSelected ? styles.selected : '',
    isInSelectionRange && !isSelected ? styles.inRange : '',
  ]
    .filter(Boolean)
    .join(' ');

  const tooltip = isCurrentMonth
    ? `${occupancyCount} of 10 rooms occupied`
    : undefined;

  return (
    <div
      className={classNames}
      style={{ backgroundColor: isSelected || isInSelectionRange ? undefined : bgColor }}
      onMouseDown={() => onMouseDown(date)}
      onMouseEnter={() => onMouseEnter(date)}
      title={tooltip}
    >
      <span className={styles.dayNumber}>{dayNumber}</span>
      {isCurrentMonth && (
        <span className={styles.occupancy}>{label}</span>
      )}
    </div>
  );
}
