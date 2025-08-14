import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

export default function MyPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ... (useEffect for fetching playlists remains the same) ...
  useEffect(() => {
    const fetchMyPlaylists = async () => {
      try {
        const response = await axios.get('/playlist/my-playlists');
        setPlaylists(response.data);
      } catch (err) {
        console.error("Failed to fetch playlists", err);
        setError('Could not load your playlists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyPlaylists();
  }, []);


  // --- 1. ADD THIS NEW HANDLER FUNCTION ---
  const handleDelete = async (playlistIdToDelete) => {
    // Show a confirmation dialog before deleting.
    if (window.confirm("Are you sure you want to delete this playlist? This cannot be undone.")) {
      try {
        await axios.delete(`/playlist/${playlistIdToDelete}`);
        
        // On success, update the UI by removing the deleted playlist from the state.
        // This is much faster than re-fetching the whole list from the server.
        setPlaylists(currentPlaylists => 
          currentPlaylists.filter(p => p.playlistId !== playlistIdToDelete)
        );
      } catch (err) {
        console.error("Failed to delete playlist", err);
        alert("Could not delete the playlist. Please try again.");
      }
    }
  };

  // ... (loading, error, and no playlists checks remain the same) ...

  return (
    <div className="mt-5">
      <h2 className="text-center mb-4">My Saved Playlists</h2>
      <div className="accordion" id="playlistsAccordion">
        {playlists.map((playlist, index) => (
          <div className="accordion-item" key={playlist.playlistId}>
            <h2 className="accordion-header d-flex align-items-center" id={`heading${index}`}>
              {/* Main accordion button */}
              <button 
                className="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target={`#collapse${index}`} 
                aria-expanded="false" 
                aria-controls={`collapse${index}`}
              >
                <strong>{playlist.name}</strong>&nbsp;- Saved on {new Date(playlist.createdAt).toLocaleDateString()}
              </button>

              {/* --- 2. ADD THE DELETE BUTTON HERE --- */}
              <button 
                className="btn btn-sm btn-danger me-2" 
                // Call the new handleDelete function when clicked
                onClick={() => handleDelete(playlist.playlistId)}
              >
                Delete
              </button>
            </h2>
            <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#playlistsAccordion">
              <div className="accordion-body">
                {/* ... (the list of songs inside is the same) ... */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}