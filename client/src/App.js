import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RoomChat from './pages/RoomChat';
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<RoomChat/>}/>
        <Route exact path='/setAvatar' element={<SetAvatar/>}/>
        <Route  path='/register' element={<Register/>}/>
        <Route  path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
