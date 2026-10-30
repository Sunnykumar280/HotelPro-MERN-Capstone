import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import GoogleButton from '../components/GoogleButton';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    try {
      const { data } = await api.post('/auth/register', form);   // backend logs you in directly
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/';
    } catch (err) {
      setMsg(err.response ? err.response.data.message : 'Cannot reach the backend. Is it running on port 5000?');
      setBusy(false);
    }
  };

  return (
    <div className="panel auth-card">
      <h3>Create your account</h3>
      <p className="text-muted">It takes less than a minute.</p>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <form onSubmit={submit}>
        <label className="form-label">Full name</label>
        <input className="form-control mb-3" name="name" onChange={change} required />
        <label className="form-label">Email</label>
        <input className="form-control mb-3" type="email" name="email" onChange={change} required />
        <label className="form-label">Password (min 6 characters)</label>
        <input className="form-control mb-3" type="password" name="password" minLength={6} onChange={change} required />
        <button className="btn btn-gold w-100" disabled={busy}>{busy ? 'Creating...' : 'Register'}</button>
      </form>
      <GoogleButton />
      <p className="mt-3 mb-0 text-center">Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}
