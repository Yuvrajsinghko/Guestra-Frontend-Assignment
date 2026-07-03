import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/bookings.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load bookings (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="app__loading">Loading bookings...</div>;
  }

  if (error) {
    return <div className="app__error">Error: {error}</div>;
  }

  if (!bookings || bookings.length === 0) {
    return <div className="app__loading">No bookings data available</div>;
  }

  return (
    <div className="app">
      <Calendar bookings={bookings} />
    </div>
  );
}

export default App;
