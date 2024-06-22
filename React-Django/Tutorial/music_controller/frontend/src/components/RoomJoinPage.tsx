import React from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface RoomJoinPageProps {}

const RoomJoinPage: React.FC<RoomJoinPageProps> = () => {
    const roomCode = "";
    const error = "";

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
                />
            </Grid>
            <Grid item xs={12} textAlign="center">
                <Button variant='contained' color='primary' to '/'>
            </Grid>
        </Grid>
    );
}

export default RoomJoinPage;
