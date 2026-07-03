# Architecture Notes

## Key Decisions

### Hotel-Night Logic
Occupancy follows hotel-night convention: a booking occupies the night of checkIn but NOT the night of checkOut. For example, checkIn=Feb 10, checkOut=Feb 13 means occupied nights are Feb 10, 11, 12. This is implemented in `occupancy.js` by iterating from checkIn (inclusive) to checkOut (exclusive) and incrementing a per-day counter.

### Occupancy Map
A `Map<dateKey, count>` is built for the visible month using `useMemo`. This avoids recalculating occupancy on every render. The map is rebuilt only when filtered bookings or the visible month changes. Days outside the current month are not tracked in the map (overflow cells default to 0).

### Drag Selection
Uses native mouse events only — no libraries. `onMouseDown` on a day cell starts the drag, `onMouseEnter` on cells updates the current drag endpoint, and `onMouseUp` on the grid container finalizes the selection. The `useSelection` hook normalizes the range so start <= end regardless of drag direction. Dates are stored as `Date` objects, so cross-month dragging works naturally.

### Filtering
Two filters (status, room type) are applied to the raw bookings array via `useMemo`. The occupancy map is rebuilt from filtered bookings, so the heatmap reflects the current filter state. Cancelled bookings are excluded from occupancy counts regardless of the status filter.

### Stats Bar
All four stats are derived from the filtered bookings and occupancy map — no extra state. Average occupancy is the mean of daily occupancy values divided by total rooms (10). "Active bookings" counts non-cancelled bookings that have at least one night in the visible month.

### CSS Modules
Each component has a co-located `.module.css` file. This keeps styles scoped and avoids class name collisions without adding a CSS-in-JS library.

### localStorage Persistence
Current month/year and filter selections are persisted to localStorage. On mount, the app reads saved values and falls back to defaults if nothing is stored.

## Tradeoffs

- **No virtualization**: The calendar grid renders ~42 day cells per month. This is small enough that virtualization adds complexity without benefit.
- **Date objects over strings**: Using native `Date` objects for selection state makes comparison logic simple but requires careful handling of time components (all dates are constructed at midnight local time).
- **Hardcoded room count**: Total rooms (10) is a constant in `occupancy.js`. In a real app this would come from configuration or the data.
- **No keyboard selection**: Drag selection is mouse-only. Keyboard accessibility would require arrow key navigation and Enter/Space to select.

## Chosen Open-Scope Features

1. **Filtering** — by booking status and room type, with instant heatmap updates
2. **Stats Bar** — average occupancy, active bookings count, cancelled count, busiest day

## What Could Be Improved

- Unit tests for date logic (calendar grid generation, occupancy map, booking overlap)
- Keyboard accessibility for date selection
- Mobile-responsive layout (current layout is desktop-first with a basic breakpoint at 900px)
- Animation on month transitions
- Tooltip component instead of native `title` attribute
- Support for different hotel sizes (configurable room count)
- Debounced filter changes for very large datasets
