import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import GoogleButton from '../components/GoogleButton';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    try {
      const { data } = await api.post('/auth/login', form);
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
      <h3>Welcome back</h3>
      <p className="text-muted">Log in to book and manage your stays.</p>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <form onSubmit={submit}>
        <label className="form-label">Email</label>
        <input className="form-control mb-3" type="email" name="email" onChange={change} required />
        <label className="form-label">Password</label>
        <input className="form-control mb-3" type="password" name="password" onChange={change} required />
        <button className="btn btn-ink w-100" disabled={busy}>{busy ? 'Logging in...' : 'Login'}</button>
      </form>
      <GoogleButton />
      <p className="mt-3 mb-0 text-center">New here? <Link to="/register">Create an account</Link></p>
    </div>
  );
}
