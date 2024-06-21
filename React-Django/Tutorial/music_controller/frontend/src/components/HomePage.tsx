import React from 'react'
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from './Room';
import { BrowserRouter as Router, Routes, Route, Link, redirect } from 'react-router-dom';

interface HomePageProps{

}

const HomePage: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>THIS IS THE HOME PAGE</h1>}/>
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </Router>
    );
}

export default HomePage