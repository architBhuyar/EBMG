import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EmotionSelector from "./components/EmotionSelector";
import Playlist from "./components/Playlist";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import axios from "./api/axiosConfig";
import MyPlaylists from "./components/MyPlaylists"; // 1. Import the new component

export default function App() {
  const [songs, setSongs] = useState([]);
  const { user } = useAuth();
  
  // 2. Add state to manage the current view ('generator' or 'myPlaylists')
  const [view, setView] = useState('generator');

  const fetchPlaylist = async (emotion) => {
    try {
      const res = await axios.get(`/playlist/${emotion}`);
      setSongs(res.data);
    } catch (err) {
      console.error("Error fetching playlist", err);
    }
  };

  const handleSavePlaylist = async (playlistName) => {
    // ... (this function remains the same)
    if (!songs || songs.length === 0) return;
    const songIds = songs.map(song => song.songId);
    try {
      const response = await axios.post("/playlist/save", {
        playlistName: playlistName,
        songIds: songIds,
      });
      console.log("Playlist saved response:", response.data);
    } catch (error) {
      console.error("Failed to save playlist", error);
    }
  };

  return (
    <div>
      {/* 3. Pass the 'setView' function to the Navbar as the 'onNavigate' prop */}
      <Navbar onNavigate={setView} />
      <div className="container">
        <h1 className="text-center mt-4">🎵 Emotion-Based Playlist Generator</h1>
        
        {!user && (
          <div className="d-flex justify-content-center">
            <Login />
            <Register />
          </div>
        )}

        {/* 4. Use the 'view' state to conditionally render the correct component */}
        {user && view === 'generator' && (
          <>
            <EmotionSelector onSelectEmotion={fetchPlaylist} />
            <Playlist songs={songs} onSavePlaylist={handleSavePlaylist}  />
          </>
        )}
        
        {user && view === 'myPlaylists' && (
          <MyPlaylists />
        )}
      </div>
    </div>
  );
}