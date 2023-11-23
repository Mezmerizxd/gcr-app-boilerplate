import React from 'react';
import { useRoutes } from 'react-router-dom';

const { Landing } = lazyImport(() => import('../features/home'), 'Landing');
import { useAuth } from '../libs/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { lazyImport } from '../libs/lazyImport';

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = auth?.user?.profile ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <div className="bg-background text-white-light">{element}</div>;
};
