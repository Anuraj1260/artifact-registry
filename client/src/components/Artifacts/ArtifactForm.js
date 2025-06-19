// src/components/Artifacts/ArtifactForm.js

import React, { useState } from 'react';
import API from '../../utils/api';

const ArtifactForm = ({ onAdded }) => {
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await API.post('/artifacts', form);
      onAdded(); // Notify parent to refresh list
      setForm({ title: '', description: '', imageUrl: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add artifact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Add New Artifact</h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Adding...' : 'Add Artifact'}
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
};

const styles = {
  form: {
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '1rem',
    maxWidth: '400px'
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
    fontSize: '1rem'
  },
  button: {
    padding: '10px 15px',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginTop: '10px'
  }
};

export default ArtifactForm;
