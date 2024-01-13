import React from 'react';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from '../components/Layout';

import { lazyImport } from '../libs/lazyImport';
import { Spinner } from '../components/Elements';

const { Dashboard } = lazyImport(() => import('../features/dash'), 'Dashboard');
const { Profile } = lazyImport(() => import('../features/dash'), 'Profile');
const { Testing } = lazyImport(() => import('../features/dash'), 'Testing');

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'testing', element: <Testing /> },
      { path: 'profile', element: <Profile /> },
      { index: true, element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
