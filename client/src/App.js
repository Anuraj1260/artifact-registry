// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ArtifactList from './components/Artifacts/ArtifactList';
import ArtifactForm from './components/Artifacts/ArtifactForm';

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                  <h2 style={{ color: 'white' }}>📦 Artifact Registry</h2>

                  <button onClick={logout}>🚪 Logout</button>
                </div>
                <ArtifactForm onAdded={() => window.location.reload()} />
                <ArtifactList />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
