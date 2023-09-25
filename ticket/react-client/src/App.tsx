import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './features/auth/signup';
import SignIn from './features/auth/signin';
import SignOut from './features/auth/signout';
import LandingPage from './features/main/main';

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />

      <Route path='login/*' element={<SignIn />} />
      <Route path='signup/*' element={<Signup />} />
      <Route path='signout/*' element={<SignOut />} />
    </Routes>
  );
}

export default App;
