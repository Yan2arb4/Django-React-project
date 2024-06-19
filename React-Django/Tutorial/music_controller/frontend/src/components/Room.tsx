import React, { ChangeEvent, useState, Component } from 'react';
import { useParams } from 'react-router-dom';

interface RoomProps {
    roomCode: string;
}

const Room: React.FC<RoomProps> = ({roomCode}: RoomProps) => {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [defaultVotes, setDefaultVotes] = useState<number>(2);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
    const [isHost, setIsHost] = useState(false);


    return (
        <div>
            <h1>This is the Room view</h1>
            <p>guestCanPause: {guestCanPause.toString()}</p>
            <p>defaultVotes: {defaultVotes.toString()}</p>
            <p>votesToSkip: {votesToSkip.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
}

export default Room;
