import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EmotionSelector from "./components/EmotionSelector";
import Playlist from "./components/Playlist";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
//import axios from "axios";
import axios from "./api/axiosConfig";

export default function App() {
  const [songs, setSongs] = useState([]);
  const { user } = useAuth(); // Get user state from context

  const fetchPlaylist = async (emotion) => {
    try {
      const res = await axios.get(`/playlist/${emotion}`);
      setSongs(res.data);
    } catch (err) {
      console.error("Error fetching playlist", err);
    }
  };

  const handleSavePlaylist = async (playlistName) => {
    if (!songs || songs.length === 0) {
      console.log("No songs to save.");
      return;
    }
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
      <Navbar /> {/* Add the Navbar */}
      <div className="container">
        <h1 className="text-center mt-4">🎵 Emotion-Based Playlist Generator</h1>
        
        {/* If user is not logged in, show Login/Register forms */}
        {!user && (
          <div className="d-flex justify-content-center">
            <Login />
            <Register />
          </div>
        )}

        {/* If user is logged in, show the main app */}
        {user && (
          <>
            <EmotionSelector onSelectEmotion={fetchPlaylist} />
            <Playlist songs={songs} onSavePlaylist={handleSavePlaylist}  />
          </>
        )}
      </div>
    </div>
  );
}