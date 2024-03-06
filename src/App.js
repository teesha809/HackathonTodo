// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import MyTaskPage from './Components/Dashboard/MyTaskPage';
import Sidebar from './Components/Dashboard/Sidebar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin}/>}  />
        <Route path="/signup" element={<Signup handleLogin={handleLogin}/>}  />
        <Route
          path="/"
          element={loggedIn ? <Dashboard user={user} handleLogout={handleLogout} /> : <Login handleLogin={handleLogin} />}
        />
        <Route path="/mytasks" element={<MyTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

