// src/components/Artifacts/ArtifactList.js
import React, { useEffect, useState } from 'react';
import API from '../../utils/api';

const ArtifactList = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [error, setError] = useState('');

  const fetchArtifacts = async () => {
    try {
      const res = await API.get('/artifacts');
      // Only show non-deleted artifacts
      setArtifacts(res.data.filter(a => !a.isDeleted));
      setError('');
    } catch (err) {
      console.error(err);
      setError('❌ Unauthorized or server error');
    }
  };

  const deleteArtifact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this artifact?')) return;
    try {
      await API.delete(`/artifacts/${id}`);
      fetchArtifacts();
    } catch (err) {
      alert('Failed to delete. You may not have permission.');
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  return (
    <div style={styles.container}>
      <h3 style={{ color: 'white' }}>🧾 MY ARTIFACTS</h3>

      {error && <p style={styles.error}>{error}</p>}

      <ul style={styles.list}>
        {artifacts.length === 0 ? (
         <p style={{ color: 'white' }}>No artifacts found.</p>

        ) : (
          artifacts.map((a) => (
            <li key={a._id} style={styles.item}>
              <div>
                <strong>{a.title}</strong>
                <p>{a.description}</p>
                <img src={a.imageUrl} alt={a.title} style={styles.image} />
                <small>Created: {new Date(a.createdAt).toLocaleString()}</small>
              </div>
              <button onClick={() => deleteArtifact(a._id)} style={styles.deleteBtn}>🗑️ Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '2rem'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  item: {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between'
  },
  deleteBtn: {
    background: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer'
  },
  image: {
    maxWidth: '150px',
    display: 'block',
    marginTop: '5px'
  },
  error: {
    color: 'red'
  }
};

export default ArtifactList;
