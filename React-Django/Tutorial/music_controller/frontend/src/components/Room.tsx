import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import CreateRoomPage from './CreateRoomPage';

interface RoomProps {
    leaveRoomCallback: () => void;
}

const Room: React.FC<RoomProps> = ({ leaveRoomCallback }) => {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState<number>(2);
    const [showSettings, setShowSettings] = useState(false);
    const [isHost, setIsHost] = useState(false);
    let { roomCode } = useParams();
    const navigate = useNavigate();
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);

    const getRoomDetails = () => {
        fetch('/api/get-room?code=' + roomCode)
            .then((response) => {
                if (!response.ok) {
                    leaveRoomCallback();
                    navigate('/');
                }
                return response.json();
            })
            .then((data) => {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
                if (isHost) {
                    console.log(data.is_host);
                    authenticateSpotify();
                }
            });
    };

    const authenticateSpotify = () => {
        fetch("/spotify/is-authenticated")
          .then((response) => response.json())
          .then((data) => {
            setSpotifyAuthenticated(data.status);
            console.log(data.status);
            console.log(`balls`);
            if (!data.status) {
              fetch("/spotify/get-auth-url")
                .then((response) => response.json())
                .then((data) => {
                  window.location.replace(data.url);
                });
            }
          });
      }

    useEffect(() => {
        getRoomDetails();
    }, [roomCode, leaveRoomCallback, navigate]);

    const updateShowSettings = (value: boolean) => {
        setShowSettings(value);
    };

    const updateRoomDetails = () => {
        getRoomDetails(); // Call getRoomDetails to fetch updated room details
    };

    const renderSettings = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip={votesToSkip} 
                        guestCanPause={guestCanPause} 
                        roomCode={roomCode}
                        updateCallback={updateRoomDetails} // Pass updateRoomDetails as updateCallback
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button color='secondary' variant='contained' onClick={() => updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    };

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12}>
                <Button color='primary' variant='contained' onClick={() => updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                    Room Code: {roomCode}
                </Typography>
            </Grid>
            {isHost ? renderSettingsButton() : null}
            {showSettings ? renderSettings() : null}
        </Grid>
    );
};

export default Room;
