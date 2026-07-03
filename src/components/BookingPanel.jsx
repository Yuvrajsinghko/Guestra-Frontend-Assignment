import { useMemo } from 'react';
import { getBookingsForRange, getNightsCount } from '../utils/bookings';
import styles from './BookingPanel.module.css';

const STATUS_COLORS = {
  confirmed: '#16a34a',
  checked_in: '#2563eb',
  checked_out: '#6b7280',
  cancelled: '#dc2626',
};

const STATUS_LABELS = {
  confirmed: 'Confirmed',
  checked_in: 'Checked In',
  checked_out: 'Checked Out',
  cancelled: 'Cancelled',
};

export default function BookingPanel({ bookings, selectionStart, selectionEnd }) {
  const overlapping = useMemo(() => {
    if (!selectionStart || !selectionEnd) return [];
    // Create an exclusive end for the range query (day after selectionEnd)
    const rangeEnd = new Date(selectionEnd);
    rangeEnd.setDate(rangeEnd.getDate() + 1);
    return getBookingsForRange(bookings, selectionStart, rangeEnd);
  }, [bookings, selectionStart, selectionEnd]);

  const hasSelection = selectionStart && selectionEnd;
  const isSingleDay = hasSelection && selectionStart.getTime() === selectionEnd.getTime();

  const rangeLabel = useMemo(() => {
    if (!hasSelection) return '';
    const start = selectionStart.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    if (isSingleDay) return start;
    const end = selectionEnd.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    return `${start} - ${end}`;
  }, [hasSelection, selectionStart, selectionEnd, isSingleDay]);

  if (!hasSelection) {
    return (
      <div className={styles.panel}>
        <div className={styles.empty}>
          Click or drag on the calendar to view booking details
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Bookings for {rangeLabel}
        </h3>
        <span className={styles.count}>{overlapping.length} booking{overlapping.length !== 1 ? 's' : ''}</span>
      </div>
      {overlapping.length === 0 ? (
        <div className={styles.empty}>No active bookings in this range</div>
      ) : (
        <div className={styles.list}>
          {overlapping.map((b) => (
            <div key={b.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.guestName}>{b.guestName}</span>
                <span
                  className={styles.badge}
                  style={{ backgroundColor: STATUS_COLORS[b.status] || '#6b7280' }}
                >
                  {STATUS_LABELS[b.status] || b.status}
                </span>
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Room</span>
                  <span className={styles.detailValue}>{b.roomNumber}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Check-in</span>
                  <span className={styles.detailValue}>{b.checkIn}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Check-out</span>
                  <span className={styles.detailValue}>{b.checkOut}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Nights</span>
                  <span className={styles.detailValue}>{getNightsCount(b.checkIn, b.checkOut)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
