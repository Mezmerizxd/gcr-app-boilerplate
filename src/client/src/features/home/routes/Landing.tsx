import React from 'react';

const HomeLayout = React.lazy(() => import('../../../components/Layout/HomeLayout'));

export const Landing = () => {
  return (
    <HomeLayout title="Home">
      <h1>Home</h1>
    </HomeLayout>
  );
};
