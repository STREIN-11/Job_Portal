import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateJob from './pages/CreateJob';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/create" element={<CreateJob />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
