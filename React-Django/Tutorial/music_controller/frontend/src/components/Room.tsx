import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface RoomProps {}

const Room: React.FC<RoomProps> = () => {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [defaultVotes, setDefaultVotes] = useState<number>(2);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
    const [isHost, setIsHost] = useState(false);
    let { roomCode } = useParams();

    useEffect(() => {
        const getRoomDetails = () => {
            fetch('/api/get-room?code=' + roomCode)
                .then((response) => response.json())
                .then((data) => {
                    setVotesToSkip(data.votes_to_skip);
                    setGuestCanPause(data.guest_can_pause);
                    setIsHost(data.is_host);
                });
        };

        getRoomDetails();
    }, [roomCode]);

    return (
        <div>
            <h1>This is the Room view {roomCode?.toString()}</h1>
            <p>guestCanPause: {guestCanPause.toString()}</p>
            <p>defaultVotes: {defaultVotes.toString()}</p>
            <p>votesToSkip: {votesToSkip.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
};

export default Room;
