import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Signup from './features/auth/signup';
import SignIn from './features/auth/signin';
import SignOut from './features/auth/signout';
import LandingPage from './features/main/main';

function AppRouting() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />

      <Route path='auth/signin/*' element={<SignIn />} />
      <Route path='auth/signup/*' element={<Signup />} />
      <Route path='auth/signout/*' element={<SignOut />} />
    </Routes>
  );
}

export default AppRouting;