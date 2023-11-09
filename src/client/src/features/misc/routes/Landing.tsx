import React from 'react';
import { useNavigate } from 'react-router';

import { Head } from '../../../components/Head';
import { useAuth } from '../../../libs/auth';

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <Head description="GCR-App-Boilerplate" />
      <div className="bg-background h-[100vh] flex justify-center">
        <p>Abc 123</p>
      </div>
    </>
  );
};
