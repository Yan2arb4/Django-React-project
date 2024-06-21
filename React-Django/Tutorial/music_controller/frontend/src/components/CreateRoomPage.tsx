import React, { ChangeEvent, useState } from 'react';
import { Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

interface CreateRoomProps {
}

const CreateRoomPage: React.FC<CreateRoomProps> = () => {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [defaultVotes, setDefaultVotes] = useState<number>(2);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
    const navigate = useNavigate();

    const handleVotesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setVotesToSkip(value);
    };

    const handleGuestCanPauseChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGuestCanPause(guestCanPause == true ? false : true);
    }

    const handleRoomButtonPressed = () => {
        //console.log("Current State - guestCanPause:", guestCanPause, "votesToSkip:", votesToSkip);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause
            }),
        };
        fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          navigate("/room/" + data.code);
        });
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} textAlign="center">
                <Typography variant="h4">
                    Create a room
                </Typography>
            </Grid>
            <Grid item xs={12} textAlign="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div>
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                        <RadioGroup
                            row
                            defaultValue="true"
                            onChange={handleGuestCanPauseChange}
                            >
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                        </Grid>
                    </Grid>
                </FormControl>
            </Grid>
            <Grid item xs={12} textAlign="center">
                <FormControl> 
                    <TextField
                        required 
                        type="number"
                        defaultValue={defaultVotes}
                        onChange={handleVotesChange}
                        inputProps={{
                            min: 1,
                            style: {textAlign: "center"},
                        }}
                    />
                    <FormHelperText>
                        <div>Votes required to skip song</div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} textAlign="center">
                <Button color='primary' variant='contained' onClick={handleRoomButtonPressed}>
                    Create A Room
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

export default CreateRoomPage;
