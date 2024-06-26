import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

interface RoomJoinPageProps {}

const RoomJoinPage: React.FC<RoomJoinPageProps> = () => {
    const [roomCode, setRoomCode] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomCode(event.target.value);
    };

    const roomButtonPressed = () => {
        console.log(roomCode);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: roomCode,
            }),
        };
        fetch("/api/join-room", requestOptions).then((response) => {
            if(response.ok){
                navigate(`/room/${roomCode}`);
            }else{
                setError("Room not found");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={12} textAlign="center">
                <Typography variant='h4' component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} textAlign="center">
                <TextField
                    error={false}
                    label="Code"
                    placeholder='Enter a Room Code'
                    value={roomCode}
                    helperText={error}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} textAlign="center">
                <Button variant='contained' color='primary' onClick={roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} textAlign="center">
                <Button color='secondary' variant='contained' to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}

export default RoomJoinPage;
