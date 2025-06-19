// src/components/Dashboard.js
import React from 'react';
import ArtifactForm from './Artifacts/ArtifactForm';
import ArtifactList from './Artifacts/ArtifactList';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h2>📦 Welcome, {user?.email || 'User'}</h2>
      <button onClick={handleLogout} style={styles.logout}>Logout</button>

      <ArtifactForm onAdded={() => window.location.reload()} />
      <hr />
      <ArtifactList />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '2rem'
  },
  logout: {
    float: 'right',
    background: '#d32f2f',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer'
  }
};
