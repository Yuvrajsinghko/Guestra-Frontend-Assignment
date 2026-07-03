import { useMemo } from 'react';
import { TOTAL_ROOMS } from '../utils/occupancy';
import styles from './StatsBar.module.css';

export default function StatsBar({ bookings, occupancyMap }) {
  const stats = useMemo(() => {
    const entries = [...occupancyMap.values()];
    const daysInMonth = entries.length;

    const totalOccupancy = entries.reduce((sum, v) => sum + v, 0);
    const avgOccupancy = daysInMonth > 0 ? (totalOccupancy / daysInMonth / TOTAL_ROOMS) * 100 : 0;

    const totalBookings = bookings.filter((b) => b.status !== 'cancelled').length;
    const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;
    const busiestDay = entries.length > 0 ? Math.max(...entries) : 0;

    return { avgOccupancy, totalBookings, cancelledBookings, busiestDay };
  }, [bookings, occupancyMap]);

  return (
    <div className={styles.bar}>
      <div className={styles.stat}>
        <span className={styles.statValue}>{stats.avgOccupancy.toFixed(1)}%</span>
        <span className={styles.statLabel}>Avg Occupancy</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statValue}>{stats.totalBookings}</span>
        <span className={styles.statLabel}>Active Bookings</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statValue}>{stats.cancelledBookings}</span>
        <span className={styles.statLabel}>Cancelled</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statValue}>{stats.busiestDay}/{TOTAL_ROOMS}</span>
        <span className={styles.statLabel}>Busiest Day</span>
      </div>
    </div>
  );
}
