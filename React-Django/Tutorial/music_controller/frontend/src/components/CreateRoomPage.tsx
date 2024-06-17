import React, { useState } from 'react';
import { Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import { Link } from 'react-router-dom';



const CreateRoomPage: React.FC = () => {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [defaultVotes, setDefaultVotes] = useState<number>(2);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

    const handleVotesChange = () => {
        
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
                            <RadioGroup row defaultValue="true">
                                <FormControlLabel 
                                    value="true" 
                                    control={<Radio color='primary'/>}
                                    label="Play/Pause"
                                    labelPlacement='bottom'
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item>
                            <RadioGroup row defaultValue="true">
                                <FormControlLabel 
                                    value="false" 
                                    control={<Radio color='secondary'/>}
                                    label="No Control"
                                    labelPlacement='bottom'
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
                <Button color='primary' variant='contained'>
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
