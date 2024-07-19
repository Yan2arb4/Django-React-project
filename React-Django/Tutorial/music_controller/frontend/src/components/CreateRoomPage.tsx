import React, { ChangeEvent, useState } from 'react';
import { Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Button, Collapse } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../../static/css/index.css'; 
import { Alert } from '@mui/material';

interface CreateRoomProps {
    update?: boolean;
    votesToSkip?: number;
    guestCanPause: boolean;
    roomCode?: string | null;
    updateCallback?: () => void; // Define updateCallback as optional function prop
}

const CreateRoomPage: React.FC<CreateRoomProps> = (props) => {
    const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause);
    const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip || 2); // Use default value if props.votesToSkip is undefined
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleVotesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setVotesToSkip(value);
    };

    const handleGuestCanPauseChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGuestCanPause(!guestCanPause); // Toggle guestCanPause state
    }

    const handleRoomButtonPressed = () => {
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

    const handleUpdateButtonPressed = () => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: props.roomCode
            }),
        };
        fetch("/api/update-room", requestOptions)
        .then((response) => {
            if(response.ok) {
                setSuccessMsg("Room updated successfully!");
                setErrorMsg("");
            } else {
                setErrorMsg("Error updating room...");
                setSuccessMsg("");
            }
            if (props.updateCallback) {
                props.updateCallback(); // Call updateCallback if defined (this triggers getRoomDetails in Room component)
            }
        });
    }

    const renderName = () => {
        return props.update ? "Update Room" : "Create a Room";
    };

    const renderCreateButtons = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Button color='primary' variant='contained' onClick={handleRoomButtonPressed}>
                        Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button color='secondary' variant='contained' to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }

    const renderUpdateButtons = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Button color='primary' variant='contained' onClick={handleUpdateButtonPressed}>
                        Update the Room
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Collapse in={errorMsg != "" || successMsg != ""}>
                    {successMsg != "" ? (
                        <Alert severity="success" onClose={() => setSuccessMsg("")}>
                            {successMsg}
                        </Alert>
                    ) : (
                        <Alert severity="error" onClose={() => setErrorMsg("")}>
                            {errorMsg}
                        </Alert>
                    )}
                </Collapse>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">
                    {renderName()}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div>
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <Grid container spacing={2}>
                        <Grid item>
                            <RadioGroup
                                row
                                defaultValue={props.guestCanPause.toString()}
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
            <Grid item xs={12}>
                <FormControl> 
                    <TextField
                        required 
                        type="number"
                        defaultValue={votesToSkip}
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
            {props.update ? renderUpdateButtons() : renderCreateButtons()}
        </Grid>
    );
}

CreateRoomPage.defaultProps = {
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {} // Default empty function for updateCallback
}

export default CreateRoomPage;
