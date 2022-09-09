import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Chat/>}/>
        <Route  path='/register' element={<Register/>}/>
        <Route  path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
