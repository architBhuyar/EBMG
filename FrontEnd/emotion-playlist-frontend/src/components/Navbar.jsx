import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">

        {/* The brand/logo is also a button to navigate "home" to the generator view. */}
        <span 
          className="navbar-brand mb-0 h1" 
          style={{ cursor: 'pointer' }} 
          // This onClick ensures clicking the brand takes you to the generator
          onClick={() => onNavigate('generator')}
        >
          EBMG {/* Your app name */}
        </span>
        
        {/* This div uses "margin-start: auto" to push its content to the far right. */}
        <div className="ms-auto d-flex align-items-center"> 
          {user ? (
            // If a user is logged in, show this block.
            <>
            
              <button 
                className="btn btn-link nav-link" 
                onClick={() => onNavigate('generator')}
              >
                Generator
              </button>
              
              {/* This button switches the view to the user's saved playlists. */}
              <button 
                className="btn btn-link nav-link" 
                onClick={() => onNavigate('myPlaylists')}
              >
                My Playlists
              </button>

              {/* A separator and welcome message for the user. */}
              <span className="navbar-text me-3 ms-3 border-start ps-3">
                Welcome, {user.email}!
              </span>

              {/* The logout button. */}
              <button className="btn btn-outline-secondary" onClick={logout}>Logout</button>
            </>
          ) : (
            // If no user is logged in, show this simple message.
            <span className="navbar-text">
              Login or Register to save playlists.
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}