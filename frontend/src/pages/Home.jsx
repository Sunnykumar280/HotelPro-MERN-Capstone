import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import RoomCard from '../components/RoomCard';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [type, setType] = useState('All');
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    api.get('/rooms').then(res => setRooms(res.data)).finally(() => setLoading(false));
  }, []);

  const nights = dates.checkIn && dates.checkOut
    ? Math.max(0, Math.ceil((new Date(dates.checkOut) - new Date(dates.checkIn)) / 86400000))
    : 0;

  const shown = type === 'All' ? rooms : rooms.filter(r => r.type === type);

  const book = async roomId => {
    if (!localStorage.getItem('token')) return navigate('/login');
    if (!nights) return setMsg({ type: 'warning', text: 'Choose valid check-in and check-out dates first.' });
    try {
      await api.post('/bookings', { roomId, ...dates });
      setMsg({ type: 'success', text: 'Booking confirmed. You can view or cancel it under My bookings.' });
    } catch (err) {
      setMsg({ type: 'danger', text: err.response?.data?.message || 'Booking failed. Try again.' });
    }
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Book a comfortable stay in a few clicks</h1>
          <p className="mt-3 mb-0">Pick your dates, choose a room and confirm instantly.</p>
        </div>
      </section>

      <div className="container">
        <div className="search-box">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Check-in</label>
              <input type="date" className="form-control" min={today}
                onChange={e => setDates({ ...dates, checkIn: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Check-out</label>
              <input type="date" className="form-control" min={dates.checkIn || today}
                onChange={e => setDates({ ...dates, checkOut: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Room type</label>
              <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
                <option>All</option><option>Single</option><option>Double</option><option>Suite</option>
              </select>
            </div>
          </div>
        </div>

        {msg && <div className={`alert alert-${msg.type} mt-4 mb-0`}>{msg.text}</div>}

        <h3 className="mt-5 mb-3">Available rooms</h3>
        {loading && <div className="text-center py-5"><div className="spinner-border"></div></div>}
        {!loading && shown.length === 0 && <p className="text-muted">No rooms match your filter.</p>}
        <div className="row g-4">
          {shown.map(r => (
            <div className="col-md-6 col-lg-4" key={r._id}>
              <RoomCard room={r} nights={nights} onBook={book} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
