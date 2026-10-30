import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api';

// Shows nothing until VITE_GOOGLE_CLIENT_ID is set in frontend/.env
export default function GoogleButton() {
  const [msg, setMsg] = useState('');
  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) return null;

  const onSuccess = async res => {
    try {
      const { data } = await api.post('/auth/google', { credential: res.credential });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/';
    } catch (err) {
      setMsg(err.response?.data?.message || 'Google sign-in failed.');
    }
  };

  return (
    <div className="mt-3">
      <div className="d-flex align-items-center text-muted small mb-3">
        <hr className="flex-grow-1 m-0" /><span className="px-2">or</span><hr className="flex-grow-1 m-0" />
      </div>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <div className="d-flex justify-content-center">
        <GoogleLogin onSuccess={onSuccess} onError={() => setMsg('Google sign-in was cancelled or failed.')} />
      </div>
    </div>
  );
}
