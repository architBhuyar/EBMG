import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Moodtunes</span>
        <div>
          {user ? (
            <>
              <span className="navbar-text me-3">
                Welcome, {user.email}!
              </span>
              <button className="btn btn-outline-secondary" onClick={logout}>Logout</button>
            </>
          ) : (
            <span className="navbar-text">
              Login or Register to save playlists.
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}