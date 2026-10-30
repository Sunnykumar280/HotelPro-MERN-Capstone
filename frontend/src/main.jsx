import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const app = <BrowserRouter><App /></BrowserRouter>;

ReactDOM.createRoot(document.getElementById('root')).render(
  clientId ? <GoogleOAuthProvider clientId={clientId}>{app}</GoogleOAuthProvider> : app
);
