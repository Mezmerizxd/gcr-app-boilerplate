import React from 'react';
import { useNavigate } from 'react-router';
import { ContentLayout } from '../../../components/Layout';
import { useAuth } from '../../../libs/auth';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-xl mt-2">
        Welcome <b>{`${user.profile.username}`}</b>
      </h1>
    </ContentLayout>
  );
};
