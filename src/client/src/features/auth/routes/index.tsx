import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';
import { useAuth } from '../../../libs/auth';

export const AuthRoutes = () => {
  const auth = useAuth();

  if (auth?.user?.profile) {
    return (window.location.href = '/app');
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};
