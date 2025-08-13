import React from "react";
import { useAuth } from '../context/AuthContext';

export default function Playlist({ songs , onSavePlaylist }) {

  const { user } = useAuth(); // Get user state
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [saveMessage, setSaveMessage] = useState("");

  if (!songs || songs.length === 0) {
    return <p className="text-center">No songs found for this mood.</p>;
  }

  const handleSave = (e) => {
    e.preventDefault();
    onSavePlaylist(playlistName);
    setSaveMessage("Playlist saved!");
    // Clear message after a few seconds
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">Playlist</h3>
      <ul className="list-group">
        {songs.map((song) => (
          <li key={song.songId} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{song.title}</strong> — {song.artist}
            </div>
            <a
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-secondary"
            >
              Preview
            </a>
          </li>
        ))}
      </ul>
      {user && songs.length > 0 && (
        <div className="card p-3 mt-4">
          <form onSubmit={handleSave}>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Enter playlist name"
              />
              <button className="btn btn-info" type="submit">Save Playlist</button>
            </div>
          </form>
          {saveMessage && <p className="text-success mt-2">{saveMessage}</p>}
        </div>
      )}
    </div>
  );
}
 
