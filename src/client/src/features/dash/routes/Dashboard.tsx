import React, { useEffect, useState } from 'react';
import { ContentLayout } from '../../../components/Layout';
import { useAuth } from '../../../libs/auth';
import * as socketIo from 'socket.io-client';
import { server } from '../../../server';
import storage from '../../../libs/storage';
import { Button } from '../../../components/Elements';

export const Dashboard = () => {
  const { user } = useAuth();
  const [socket, setSocket] =
    useState<socketIo.Socket<Server.Socket.ServerToClient & Server.Socket.ClientToServer>>(null);

  const [metrics, setMetrics] = useState<Server.MetricsData>(null);

  useEffect(() => {
    const s: socketIo.Socket<Server.Socket.ServerToClient & Server.Socket.ClientToServer> = socketIo.io(
      server.socketUrl,
      {
        secure: false,
        rejectUnauthorized: false,
        reconnectionAttempts: 0,
        autoConnect: false,
        auth: {
          token: storage.getToken(),
        },
      },
    );

    s.connect();

    s.on('connect', () => {
      console.log('connected');
    });

    s.on('sendMetrics', (data) => {
      setMetrics({
        ...metrics,
        ...data.metrics,
      });
      return;
    });

    s.on('disconnect', () => {
      console.log('disconnected');
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-xl mt-2">
        Welcome <b>{`${user.profile.username}`}</b>
      </h1>
      <div className="my-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            socket.emit('getMetrics');
          }}
        >
          Fetch Metrics
        </Button>

        <div className="my-2 space-y-1">
          <p>Platform: {metrics?.platform || 'N/A'}</p>
          <p>CPU Count: {metrics?.cpu_count || 'N/A'}</p>
          <p>CPU Free: {metrics?.cpu_free || 'N/A'}</p>
          <p>CPU Usage: {metrics?.cpu_usage || 'N/A'}</p>
          <p>Memory Free: {metrics?.mem_free || 'N/A'}</p>
          <p>Memory Total: {metrics?.mem_total || 'N/A'}</p>
          <p>Memory Usage: {metrics?.mem_usage || 'N/A'}</p>
          <p>Process Uptime: {metrics?.process_uptime || 'N/A'}</p>
          <p>Uptime: {metrics?.uptime || 'N/A'}</p>
        </div>
      </div>
    </ContentLayout>
  );
};
