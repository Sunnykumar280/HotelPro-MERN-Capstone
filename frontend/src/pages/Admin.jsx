import { useEffect, useState } from 'react';
import api from '../api';

const empty = { name: '', type: 'Single', price: '', capacity: 2, description: '', image: '' };

export default function Admin() {
  const [form, setForm] = useState(empty);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const load = () => {
    api.get('/rooms').then(res => setRooms(res.data));
    api.get('/bookings').then(res => setBookings(res.data));
  };
  useEffect(() => { load(); }, []);

  const addRoom = async e => {
    e.preventDefault();
    await api.post('/rooms', form);
    setForm(empty);
    load();
  };
  const removeRoom = async id => {
    if (!window.confirm('Delete this room?')) return;
    await api.delete(`/rooms/${id}`);
    load();
  };

  const active = bookings.filter(b => b.status === 'booked');
  const revenue = active.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const fmt = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <>
      <h3 className="mb-3">Admin dashboard</h3>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><div className="stat-card"><div className="text-muted">Rooms</div><div className="num">{rooms.length}</div></div></div>
        <div className="col-md-4"><div className="stat-card"><div className="text-muted">Active bookings</div><div className="num">{active.length}</div></div></div>
        <div className="col-md-4"><div className="stat-card"><div className="text-muted">Revenue</div><div className="num">₹{revenue}</div></div></div>
      </div>

      <div className="panel mb-4">
        <h5>Add a room</h5>
        <form className="row g-2" onSubmit={addRoom}>
          <div className="col-md-4"><input className="form-control" name="name" placeholder="Room name" value={form.name} onChange={change} required /></div>
          <div className="col-md-2">
            <select className="form-select" name="type" value={form.type} onChange={change}>
              <option>Single</option><option>Double</option><option>Suite</option>
            </select>
          </div>
          <div className="col-md-2"><input className="form-control" type="number" name="price" placeholder="Price / night" value={form.price} onChange={change} required /></div>
          <div className="col-md-2"><input className="form-control" type="number" name="capacity" placeholder="Guests" value={form.capacity} onChange={change} /></div>
          <div className="col-md-6"><input className="form-control" name="image" placeholder="Image URL" value={form.image} onChange={change} /></div>
          <div className="col-md-6"><input className="form-control" name="description" placeholder="Short description" value={form.description} onChange={change} /></div>
          <div className="col-12"><button className="btn btn-gold">Add room</button></div>
        </form>
      </div>

      <div className="panel mb-4">
        <h5>Rooms</h5>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead><tr><th>Name</th><th>Type</th><th>Price</th><th></th></tr></thead>
            <tbody>
              {rooms.map(r => (
                <tr key={r._id}>
                  <td>{r.name}</td><td>{r.type}</td><td>₹{r.price}</td>
                  <td className="text-end"><button className="btn btn-sm btn-outline-danger" onClick={() => removeRoom(r._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h5>All bookings</h5>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead><tr><th>Guest</th><th>Room</th><th>Dates</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b._id}>
                  <td>{b.user?.name}</td>
                  <td>{b.room?.name}</td>
                  <td>{fmt(b.checkIn)} to {fmt(b.checkOut)}</td>
                  <td>₹{b.totalAmount}</td>
                  <td><span className={`status-badge badge-${b.status}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
