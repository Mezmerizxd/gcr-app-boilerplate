import React from 'react';
import { useRoutes } from 'react-router-dom';
import { lazyImport } from '../libs/lazyImport';
import { useAuth } from '../libs/auth';
import { protectedRoutes } from './protected';

const { Landing } = lazyImport(() => import('../features/home'), 'Landing');
const { AuthRoutes } = lazyImport(() => import('../features/auth'), 'AuthRoutes');
const { Components } = lazyImport(() => import('../features/home'), 'Components');

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [
    { path: '/', element: <Landing /> },
    {
      path: '/auth/*',
      element: <AuthRoutes />,
    },
    {
      path: '/components',
      element: <Components />,
    },
  ];

  const routes = auth?.user?.profile ? protectedRoutes : null;

  const element = routes ? useRoutes([...routes, ...commonRoutes]) : useRoutes([...commonRoutes]);

  return <div className="text-white-light bg-background">{element}</div>;
};
