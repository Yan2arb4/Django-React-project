import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, ButtonGroup } from '@mui/material';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';

const HomePage: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/user-in-room');
      const data = await response.json();
      setRoomCode(data.code);
    };
    fetchData();
  }, []);

  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} alignContent="center">
          <Typography variant="h3" component="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} alignContent="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };

  const clearRoomCode = () => {
    setRoomCode("");
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()}
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route
          path="/room/:roomCode"
          element={<Room leaveRoomCallback={clearRoomCode} />}
        />
      </Routes>
    </Router>
  );
};

export default HomePage;
