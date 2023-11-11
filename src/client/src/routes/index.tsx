import React from 'react';
import { useRoutes } from 'react-router-dom';

import { Landing, Max1382 } from '../features/home';
import { useAuth } from '../libs/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '/max1382', element: <Max1382 /> },
  ];

  const routes = auth?.user?.profile ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <div className="bg-background text-white-light">{element}</div>;
};
