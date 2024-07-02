import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../static/css/index.css'; 
import { Grid, Button, Typography } from '@mui/material';
import CreateRoomPage from './CreateRoomPage';

interface RoomProps {
    leaveRoomCallback: () => void;
}

const Room: React.FC<RoomProps> = ({leaveRoomCallback}) => {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [defaultVotes, setDefaultVotes] = useState<number>(2);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
    const [showSettings, setShowSettings] = useState(false);
    const [isHost, setIsHost] = useState(false);
    let { roomCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getRoomDetails = () => {
            fetch('/api/get-room?code=' + roomCode)
                .then((response) => {
                    if(!response.ok) {
                        leaveRoomCallback();
                        navigate('/');
                    }
                    return response.json()
                })
                .then((data) => {
                    setVotesToSkip(data.votes_to_skip);
                    setGuestCanPause(data.guest_can_pause);
                    setIsHost(data.is_host);
                });
        };

        getRoomDetails();
    }, [roomCode]);

    const updateShowSettings = (value: boolean) => {
        setShowSettings(value);
    }

    const renderSettings = () => {
      <Grid container spacing={1} className='center'>
        <Grid item xs={12}>

        </Grid>
      </Grid>
    }

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => updateShowSettings(true)}
                >
                    Settings
                </Button>
            </Grid>
        );
    }

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('/api/leave-room', requestOptions).then((_response) => {
            leaveRoomCallback();
            navigate('/');
        });
    };

    return (
        <Grid
          container
          spacing={1}
          className="center"
        >
          <Grid item xs={12}>
            <Typography variant="h4" component="h4">
              Code: {roomCode?.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h6">
              Guest can pause: {guestCanPause.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h6">
              Votes to skip: {votesToSkip.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h6">
              Host: {isHost.toString()}
            </Typography>
          </Grid>
          { isHost ? renderSettingsButton() : null }
          <Grid item xs={12}>
            <Button color="secondary" variant="contained" onClick={leaveButtonPressed}>
              Leave Room
            </Button>
          </Grid>
        </Grid>
      );      
};

export default Room;
