// src/components/Auth/Login.js
import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>🔐 Login</h2>
      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        style={styles.input}
      />
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* 🔗 Registration link */}
      <p style={styles.registerText}>
        Don't have an account? <Link to="/register" style={styles.registerLink}>Register here</Link>
      </p>
    </form>
  );
}

const styles = {
  form: {
  maxWidth: '400px',
  margin: '2rem auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '2rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: 'rgba(255,255,255,0.85)', // less harsh white
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
},
 input: {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#f9f9f9',
  color: '#111',
  border: '1px solid #aaa',
  borderRadius: '6px'
},
  button: {
    padding: '10px',
    fontWeight: 'bold',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  registerText: {
    marginTop: '1rem',
    textAlign: 'center'
  },
  registerLink: {
    color: '#28a745',
    fontWeight: 'bold',
    textDecoration: 'none'
  }
};
