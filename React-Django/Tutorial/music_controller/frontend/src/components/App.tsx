import React, { Component } from "react";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

interface AppProps {
  // Add prop types here if any
}

interface AppState {
  // Add state types here if any
}

function App() {
  return (
    <div className="App">
      <HomePage></HomePage>
    </div>
  )
}

export default App;