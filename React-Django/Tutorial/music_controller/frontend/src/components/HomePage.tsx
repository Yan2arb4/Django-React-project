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
                <Route path="/join" Component={RoomJoinPage}></Route>
                <Route path="/create" Component={CreateRoomPage}></Route>
                <Route path="/room/:roomCode" Component={Room}></Route>
            </Routes>
        </Router>
    );
}

export default HomePage