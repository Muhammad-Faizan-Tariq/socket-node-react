import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const socket = useMemo(() => io("http://localhost:4000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      // console.log("User>>>", socket.id);
    });

    socket.on("receive-msg", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });
    // socket.on("welcome", (s) => {
    //   console.log(s);
    // });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  // console.log("Messages:", messages);

  return (
    <div className="app-container">
      <h1>Chat Application</h1>
      <h3>(by using Socket, Node & React)</h3> {/* Tagline added */}
      <h6>Socket ID: {socketId}</h6>
      <form onSubmit={joinRoomHandler}>
        <input
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
          type="text"
          placeholder="room name"
        />
        <button type="submit">Join Room</button>
      </form>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          type="text"
          placeholder="message"
        />
        <input
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          type="text"
          placeholder="room id"
        />
        <button type="submit">submit</button>
      </form>
      <div className="messages-container">
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
