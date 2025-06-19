// src/components/Auth/Register.js
import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      alert('✅ Registered successfully! Please login.');
      setForm({ username: '', email: '', password: '' });
      navigate('/'); // Go to login page
    } catch (err) {
      alert(err.response?.data?.message || '❌ Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>📝 Register</h2>
      <input
        placeholder="Username"
        required
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        style={styles.input}
      />
      <input
        placeholder="Email"
        type="email"
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
        {loading ? 'Registering...' : 'Register'}
      </button>
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
    borderRadius: '8px'
  },
  input: {
    padding: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    fontWeight: 'bold',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};
