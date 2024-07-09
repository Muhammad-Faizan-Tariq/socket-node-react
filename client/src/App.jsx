import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState();
  const socket = useMemo(() => io("http://localhost:4000"), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("User>>>", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          type="text"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default App;
