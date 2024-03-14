import React, { useCallback, useEffect, useState } from "react";
import "./css/HomePage.css";
import { useSocket } from "../providers/SockerProvider";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const topics = [
    "Technology",
    "Science",
    "Programming",
    "Art",
    "Music",
    "Sports",
    "Movies",
    // Add more topics as needed
  ];
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("user-joins-chat", handleNewUserJoined);
    return () => {
      socket.off("user-joins-chat", handleNewUserJoined);
    };
  });

  const handleNewUserJoined = useCallback(({ userName }) => {
    console.log("Some new user has joined", userName);
  }, []);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleTopicSelection = (topic) => {
    setTopic(topic);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { name, topic });
    socket.emit("new-user", { userName: name, prompt: topic });
    navigate(`/chat/${prompt}`, prompt);
  };

  return (
    <div className="form-container">
      <h2>Get Started</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="topic">Topic of Interest</label>
          <div className="dropdown">
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onFocus={handleToggleDropdown}
              placeholder="Select topic"
              required
            />
            {showDropdown && (
              <div className="dropdown-list">
                {topics.map((topic, index) => (
                  <div key={index} onClick={() => handleTopicSelection(topic)}>
                    {topic}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HomePage;
