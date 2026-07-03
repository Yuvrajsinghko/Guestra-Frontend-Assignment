import { parseDate } from './calendar';

// Hotel-night logic: checkIn is inclusive, checkOut is exclusive
// A booking occupies a night if the night date >= checkIn AND night date < checkOut
export function isBookingOccupyingNight(booking, nightDate) {
  const checkIn = parseDate(booking.checkIn);
  const checkOut = parseDate(booking.checkOut);
  return nightDate >= checkIn && nightDate < checkOut;
}

export function getNightsCount(checkIn, checkOut) {
  const start = parseDate(checkIn);
  const end = parseDate(checkOut);
  const diffMs = end - start;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

// Returns bookings that overlap a date range (hotel-night logic)
// A booking overlaps if any of its occupied nights fall within [rangeStart, rangeEnd)
export function getBookingsForRange(bookings, rangeStart, rangeEnd) {
  return bookings.filter((b) => {
    if (b.status === 'cancelled') return false;
    const checkIn = parseDate(b.checkIn);
    const checkOut = parseDate(b.checkOut);
    // Booking overlaps range if checkIn < rangeEnd && checkOut > rangeStart
    return checkIn < rangeEnd && checkOut > rangeStart;
  });
}

export function applyFilters(bookings, filters) {
  return bookings.filter((b) => {
    if (filters.status && filters.status !== 'all' && b.status !== filters.status) {
      return false;
    }
    if (filters.roomType && filters.roomType !== 'all' && b.roomType !== filters.roomType) {
      return false;
    }
    return true;
  });
}

export function getUniqueRoomTypes(bookings) {
  return [...new Set(bookings.map((b) => b.roomType))].sort();
}

export function getUniqueStatuses(bookings) {
  return [...new Set(bookings.map((b) => b.status))].sort();
}
