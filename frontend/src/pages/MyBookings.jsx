import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () =>
    api.get('/bookings/mine').then(res => setBookings(res.data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const cancel = async id => {
    if (!window.confirm('Cancel this booking?')) return;
    await api.put(`/bookings/${id}/cancel`);
    load();
  };

  const fmt = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <>
      <h3 className="mb-3">My bookings</h3>
      {loading && <div className="spinner-border"></div>}
      {!loading && bookings.length === 0 && (
        <div className="panel text-center">
          <p className="mb-2">You have no bookings yet.</p>
          <Link to="/" className="btn btn-gold">Browse rooms</Link>
        </div>
      )}
      <div className="row g-3">
        {bookings.map(b => (
          <div className="col-md-6" key={b._id}>
            <div className="panel d-flex justify-content-between align-items-start">
              <div>
                <h5 className="mb-1">{b.room?.name || 'Room removed'}</h5>
                <div className="text-muted small">{fmt(b.checkIn)} to {fmt(b.checkOut)}</div>
                <div className="mt-2"><strong>₹{b.totalAmount}</strong></div>
              </div>
              <div className="text-end">
                <span className={`status-badge badge-${b.status}`}>{b.status}</span>
                {b.status === 'booked' && (
                  <div><button className="btn btn-sm btn-outline-danger mt-3" onClick={() => cancel(b._id)}>Cancel</button></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
