import { useMemo, useCallback, useState } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { useSelection } from '../hooks/useSelection';
import { applyFilters } from '../utils/bookings';
import { buildOccupancyMap } from '../utils/occupancy';
import Header from './Header';
import StatsBar from './StatsBar';
import Filters from './Filters';
import CalendarGrid from './CalendarGrid';
import BookingPanel from './BookingPanel';
import styles from './Calendar.module.css';

export default function Calendar({ bookings }) {
  const { year, month, goToPrevMonth, goToNextMonth, goToToday } = useCalendar();
  const {
    selectionStart,
    selectionEnd,
    activeStart,
    activeEnd,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    clearSelection,
  } = useSelection();

  const [filters, setFilters] = useState({ status: 'all', roomType: 'all' });

  const filteredBookings = useMemo(
    () => applyFilters(bookings, filters),
    [bookings, filters]
  );

  const occupancyMap = useMemo(
    () => buildOccupancyMap(filteredBookings, year, month),
    [filteredBookings, year, month]
  );

  // Pass filtered bookings to the panel; getBookingsForRange already excludes cancelled
  const panelBookings = filteredBookings;

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Clear selection when month changes
  const handlePrev = useCallback(() => {
    clearSelection();
    goToPrevMonth();
  }, [clearSelection, goToPrevMonth]);

  const handleNext = useCallback(() => {
    clearSelection();
    goToNextMonth();
  }, [clearSelection, goToNextMonth]);

  const handleToday = useCallback(() => {
    clearSelection();
    goToToday();
  }, [clearSelection, goToToday]);

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.topBar}>
          <Header
            year={year}
            month={month}
            onPrev={handlePrev}
            onNext={handleNext}
            onToday={handleToday}
          />
          <Filters onChange={handleFilterChange} />
        </div>
        <StatsBar bookings={filteredBookings} occupancyMap={occupancyMap} />
        <CalendarGrid
          year={year}
          month={month}
          occupancyMap={occupancyMap}
          activeStart={activeStart}
          activeEnd={activeEnd}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        />
      </div>
      <div className={styles.sidebar}>
        <BookingPanel
          bookings={panelBookings}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
        />
      </div>
    </div>
  );
}
