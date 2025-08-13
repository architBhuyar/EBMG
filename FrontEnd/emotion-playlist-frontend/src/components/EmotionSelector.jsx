import React, { useState, useEffect } from "react";
//import axios from "axios";
import axios from "../api/axiosConfig";

export default function EmotionSelector({ onSelectEmotion }) {
  const [emotions, setEmotions] = useState([]);

  useEffect(() => {
    const getEmotions = async () => {
      try {
        console.log("Attempting to fetch emotions...");
        const res = await axios.get("/playlist/emotions");
        console.log("API Response Received:", res.data);
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
      {emotions.map((emotionName) => (
        <button
          key={emotionName}
          className="btn btn-primary m-2"
          onClick={() => onSelectEmotion(emotionName)}
        >
          {emotionName}
        </button>
      ))}
    </div>
  );
}