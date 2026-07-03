import { formatMonthYear } from '../utils/calendar';
import styles from './Header.module.css';

export default function Header({ year, month, onPrev, onNext, onToday }) {
  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <button className={styles.btn} onClick={onPrev} aria-label="Previous month">
          &#8249;
        </button>
        <button className={styles.todayBtn} onClick={onToday}>
          Today
        </button>
        <button className={styles.btn} onClick={onNext} aria-label="Next month">
          &#8250;
        </button>
      </div>
      <h2 className={styles.title}>{formatMonthYear(year, month)}</h2>
    </div>
  );
}
