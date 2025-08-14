import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig"; // Using the configured instance is correct

export default function EmotionSelector({ onSelectEmotion }) {
  // The state will hold an array of objects, e.g., [{emotionId: 1, name: "Happy"}]
  const [emotions, setEmotions] = useState([]);

  useEffect(() => {
    const getEmotions = async () => {
      try {
        const res = await axios.get("/playlist/emotions");
        console.log("API Response Received:", res.data); // This log confirms you get objects
        setEmotions(res.data);
      } catch (err) {
        console.error("Error fetching emotions:", err);
      }
    };
    getEmotions();
  }, []);

  return (
    <div className="text-center my-4">
      <h2>Select Your Mood</h2>
      
      {/* 
        HERE IS THE FIX:
        The 'emotion' variable is now correctly treated as an object.
      */}
      {emotions.map((emotion) => (
        <button
          // FIX 1: Use the 'emotionId' property for the key. It's a unique number.
          key={emotion.emotionId}
          className="btn btn-primary m-2"
          // FIX 3: Pass only the 'name' string to the parent onClick handler.
          onClick={() => onSelectEmotion(emotion.name)}
        >
          {/* FIX 2: Display the 'name' property as the button's text. */}
          {emotion.name}
        </button>
      ))}
    </div>
  );
}