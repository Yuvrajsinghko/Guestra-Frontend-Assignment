# Booking Calendar Heatmap

A single-page React app that visualizes hotel bookings as an occupancy heatmap calendar. Built with React 18 and Vite.

## Features

- **Month View Calendar** — 7-column Sun–Sat grid with overflow days from adjacent months
- **Occupancy Heatmap** — color intensity reflects how many of the 10 rooms are occupied each night
- **Hotel-Night Logic** — checkIn is inclusive, checkOut is exclusive (a guest checking out on Feb 13 does not occupy the night of Feb 13)
- **Drag-to-Select** — click and drag across dates to select a range; works forward, backward, and across month boundaries
- **Booking Detail Panel** — shows all overlapping bookings for the selected date range
- **Filtering** — filter by booking status and room type; heatmap updates instantly
- **Stats Bar** — average occupancy, active bookings, cancelled bookings, and busiest day for the visible month
- **Persistence** — current month and filter selections saved to localStorage

## Setup

```bash
npm install
npm run dev
```

The app loads booking data from `/public/bookings.json` via `fetch()`.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    Calendar.jsx          — main composition component
    CalendarGrid.jsx      — 7-column day grid
    DayCell.jsx           — single day cell with heatmap color
    Header.jsx            — month navigation
    BookingPanel.jsx      — booking details for selected range
    Filters.jsx           — status and room type filters
    StatsBar.jsx          — monthly statistics
  hooks/
    useCalendar.js        — month navigation state + localStorage
    useSelection.js       — drag-to-select state
  utils/
    calendar.js           — date helpers (grid generation, formatting)
    bookings.js           — booking filtering and overlap logic
    occupancy.js          — occupancy map builder + heatmap colors
  App.jsx                 — data loading + layout
```
